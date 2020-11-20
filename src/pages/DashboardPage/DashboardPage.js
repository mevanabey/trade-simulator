import React, { useEffect, useLayoutEffect } from 'react';
import { Box } from '@material-ui/core';

import { COINS } from 'shared/helpers/constants';
import { DashboardCoinCharts, SymbolPriceCard } from 'shared/components';

import styles from './DashboardPage.scss';

const DashboardPage = () => {
  return (
      <div className={styles.content}>
        <Box className={styles.coinCardsWrapper} display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-between">
          {COINS.map(coin => <SymbolPriceCard symbol={coin.name} />)}
        </Box>
        <DashboardCoinCharts />
      </div>
  );
}

export default DashboardPage;
