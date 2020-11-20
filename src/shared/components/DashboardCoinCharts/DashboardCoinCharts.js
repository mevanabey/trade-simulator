import React from 'react';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { Tabs, Tab } from '@material-ui/core';
import { COINS } from 'shared/helpers/constants';
import styles from './DashboardCoinCharts.scss';

const DashboardCoinCharts = () => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [chartSymbol, setChartSymbol] = React.useState('BINANCE:BTCUSDT');

  const handleChange = (event, index) => {
    setChartSymbol(COINS[index].tvSymbol);
    setTabIndex(index);
  };


  return (
      <div>
        <Tabs indicatorColor="primary" textColor="inherit" value={tabIndex} onChange={handleChange}>
          {COINS.map(coin => <Tab label={coin.name} />)}
        </Tabs>
        <div className={styles.tvChartWrapper}>
        <TradingViewWidget
          symbol={chartSymbol}
          theme={Themes.DARK}
          autosize
        />
        </div>
      </div>
  );
}

export default DashboardCoinCharts;
