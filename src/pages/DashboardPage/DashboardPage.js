import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { Box } from '@material-ui/core';

import { COINS } from 'shared/helpers/constants';
import { DashboardCoinCharts, SymbolPriceCard } from 'shared/components';

import styles from './DashboardPage.scss';

const coinsStreamObject = COINS.reduce((obj, coin) => {
  obj[`${coin.binanceSymbol}@ticker`] = coin;

  return obj;
}, {});

const coinStreamTickers = COINS.reduce((str, coin, index) => str + `${index !== 0 ? '/' : ''}${coin.binanceSymbol}@ticker`, '');

const DashboardPage = () => {
  const [isPaused, setPause] = useState(false);
  const [coins, setCoins] = useState(coinsStreamObject);
  const ws = useRef(null);
console.log(coinStreamTickers);
  useEffect(() => {
    ws.current = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${coinStreamTickers}`);
    ws.current.onopen = () => console.log('ws opened');
    ws.current.onclose = () => console.log('ws closed');

    return () => {
      ws.current.close();
    }
  }, []);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = e => {
      if (isPaused) return;
      const message = JSON.parse(e.data);

      setCoins({
        ...coins,
        [message.stream]: {
          ...coins[message.stream],
          price: message.data.a,
        }
      });
    };
  }, [coins, isPaused]);

  return (
      <div className={styles.content}>
        <Box className={styles.coinCardsWrapper} display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-between">
          {COINS.map(coin => <SymbolPriceCard price={coins[coin.streamName].price} symbol={coin.name} currency={coin.currency} />)}
        </Box>
        <DashboardCoinCharts />
      </div>
  );
}

export default DashboardPage;
