import store from 'store';
import * as utils from 'shared/helpers/utils';
import { deserializeSuccess } from 'shared/helpers/jsonApiDeserializer';
import createHttp from 'shared/helpers/http';
import * as lh from 'shared/helpers/login.helper';
import { RESTAURANT_API_URL } from './api.constants';

const NO_CONTENT = 204;
const REQUEST_TIMEOUT = Number(process.env.REQUEST_TIMEOUT);

export function buildEndpoint({
  baseUrl = '',
  filters = {},
  validFilters = Object.keys(filters),
}) {
  return Object.keys(filters)
    .filter(f => validFilters.includes(f))
    .filter(f => filters[f])
    .reduce((memo, query, index) => {
      const prefix = index ? '&' : '?';
      return `${memo}${prefix}${query}=${filters[query]}`;
    }, baseUrl);
}

function calcRequestHash(method, url, payload) {
  return `${method}${url}${JSON.stringify(payload ?? {})}`;
}

const createHttpGateway = (options = {}) => {
  const pendingRequests = new Map();
  const withDeserializer = options.withDeserializer ?? true;

  const getHeaders = () => {
    const authToken = options.authToken || lh.getToken();
    const activeRestaurant = selectors.getActiveRestaurant(store.getState());
    return {
      'X-Restaurant-ID': options.restaurantId || activeRestaurant?.id,
      Authorization: authToken ? `Bearer  ${authToken}` : undefined,
      'X-User-Agent': `cactus ${utils.appInfo.version}`,
      ...options.headers,
    };
  };

  const handleError = (error, method, url, payload) => {
    const requestKey = calcRequestHash(method, url, payload);
    pendingRequests.delete(requestKey);

    // Aborted
    if (error instanceof DOMException) {
      const networkTimeoutError = new Error(t('network_timeout'));
      networkTimeoutError.errorCode = 'network_timeout';
      logError(new Error(`Request timeout "${url}"`));
      throw networkTimeoutError;
    } else {
      // Offline
      if (!selectors.isOffline(store.getState())) {
        store.dispatch(loginActions.setOfflineSuccess(true));
      }
      const networkError = new Error(t('no_internet_connection'));
      networkError.errorCode = 'network_error';
      throw networkError;
    }
  };

  const http = createHttp(options.baseUrl || RESTAURANT_API_URL, handleError);

  /**
   * Higher order function to show loader
   * @param obj
   * @returns {{}}
   */
  const withLoader = obj => {
    const wrappedObj = {};
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'function') {
        wrappedObj[key] = async (...args) => {
          try {
            if (options.withLoader) utils.toggleLoader();
            const result = await obj[key](...args);
            if (options.withLoader) utils.toggleLoader();
            return result;
          } catch (err) {
            if (options.withLoader) utils.toggleLoader();
            throw err;
          }
        };
      } else wrappedObj[key] = obj[key];
    });
    return wrappedObj;
  };

  const handleSuccess = (response, reqOptions, url) => {
    if (selectors.isOffline(store.getState())) {
      store.dispatch(loginActions.setOfflineSuccess(false));
    }

    if (response.status === NO_CONTENT) {
      return Promise.resolve();
    }

    return deserializeResp(
      response.status >= 200 && response.status < 300
        ? response.json().then(json => json)
        : response.json().then(error => {
            const newError = new Error(
              t('something_went_wrong_please_contact_support')
            );
            newError.errorCode = 'default_error';
            newError.responseStatus = response.status;
            newError.meta = {
              url,
              dontLogoutOn401: options.dontLogoutOn401,
            };
            newError.sourceError = error;
            switch (response.status) {
              case 401:
              case 403:
              case 404:
                newError.errorCode =
                  error.errors?.[0]?.code || newError.errorCode;
                newError.message =
                  error.errors?.[0]?.detail || newError.message;
                break;
              case 422:
                newError.errorCode = 'validation_error';
                newError.message = t('some_fields_invalid_input');
                newError.validations = error.errors || [];
                break;
              case 429:
                newError.message = error.error_message;
                newError.errorCode = error.error_code;
                break;
              default:
            }
            throw newError;
          }),
      reqOptions
    );
  };

  const createRequest = (method, url, reqOptions, payload) => {
    const requestKey = calcRequestHash(method, url, payload);
    // Return existing request if we have it pending
    if (pendingRequests.has(requestKey)) {
      return pendingRequests.get(requestKey);
    }

    const [request, abortController] = http[method](url, getHeaders(), payload);

    // Create request timeout
    const requestTimeout = setTimeout(() => {
      abortController.abort();
    }, REQUEST_TIMEOUT);

    const requestWithHandler = request.then(resp => {
      // Clear request timeout and pending request once request completed
      clearTimeout(requestTimeout);
      pendingRequests.delete(requestKey);
      return handleSuccess(resp, reqOptions, url);
    });

    // Add request to pending requests
    pendingRequests.set(requestKey, requestWithHandler);
    return requestWithHandler;
  };

  const get = (url, reqOptions = {}) => {
    return createRequest('get', url, reqOptions);
  };

  const post = (url, payload, reqOptions = {}) => {
    return createRequest('post', url, reqOptions, payload);
  };

  const put = (url, payload, reqOptions = {}) => {
    return createRequest('put', url, reqOptions, payload);
  };

  const del = (url, reqOptions = {}) => {
    return createRequest('del', url, reqOptions);
  };

  const patch = (url, payload, reqOptions = {}) => {
    return createRequest('patch', url, reqOptions, payload);
  };

  const deserializeResp = (req, reqOptions) => {
    const withoutDeserializer =
      reqOptions.withoutDeserializer ?? !withDeserializer;
    return withoutDeserializer
      ? req
      : req.then(resp =>
          deserializeSuccess(resp, { ...options, ...reqOptions })
        );
  };

  return withLoader({
    get,
    post,
    put,
    del,
    patch,
  });
};

export default createHttpGateway;
