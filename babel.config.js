const presets = [['@babel/preset-env'], ['@babel/preset-react']];

const plugins = [
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-nullish-coalescing-operator',
  '@babel/plugin-proposal-optional-chaining',
  '@babel/plugin-proposal-throw-expressions',
  '@babel/plugin-proposal-export-default-from',
  '@babel/plugin-proposal-export-namespace-from',
  'babel-plugin-transform-imports',
];

const env = {
  test: {
    plugins: ['require-context-hook'],
  },
};

module.exports = { presets, plugins, env };
