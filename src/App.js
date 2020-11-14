import React from 'react';
import Box from '@material-ui/core/Box';

import { Sidebar } from 'shared/layout';
import { SymbolPriceCard } from 'shared/components';

import logo from './logo.svg';
import styles from './App.scss';

function App() {
  return (
    <main className={styles.main}>
      <Sidebar />
      <div className={styles.content}>
        <header className="App-header">
        </header>
        <Box display="flex" flexDirection="row">
          <SymbolPriceCard symbol="BTC" />
          <SymbolPriceCard symbol="ADA" />
          <SymbolPriceCard symbol="UNI" />
          <SymbolPriceCard symbol="ETH" />
        </Box>
        <Box display="flex" flexDirection="row">
          <SymbolPriceCard symbol="BTC" />
          <SymbolPriceCard symbol="ADA" />
          <SymbolPriceCard symbol="UNI" />
          <SymbolPriceCard symbol="ETH" />
        </Box>
      </div>
    </main>
  );
}

export default App;
