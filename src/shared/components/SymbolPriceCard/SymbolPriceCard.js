import React from 'react';
import Box from '@material-ui/core/Box';

import { CustomPaper } from 'shared/components/common';
import styles from "./SymbolPriceCard.scss";

const SymbolPriceCard = ({ symbol }) => {
  return (
        <CustomPaper className={styles.wrapper}>
          <Box alignItems="center" display="flex" flexDirection="row" justifyContent="space-between">
            <Box alignSelf="flex-start" className={styles.symbol}>
              {symbol}
            </Box>
            <Box className={styles.infoColumn}>
              <div className={styles.infoWrapper}>
                <div className={styles.title}>Price</div>
                <div className={styles.price}>25,000 USD</div>
              </div>
              <div className={styles.infoWrapper}>
                <div className={styles.title}>Market Cap</div>
                <div className={styles.price}>1,000,000,000</div>
              </div>
            </Box>
            <Box className={styles.infoColumn}>
              <div className={styles.infoWrapper}>
                <div className={styles.title}>24h High</div>
                <div className={styles.price}>24,500 USD</div>
              </div>
              <div className={styles.infoWrapper}>
                <div className={styles.title}>7d High</div>
                <div className={styles.price}>28,000 USD</div>
              </div>
            </Box>
            <Box className={styles.infoColumn}>
              <div className={styles.infoWrapper}>
                <div className={styles.title}>ATH</div>
                <div className={styles.price}>30,500 USD</div>
              </div>
              <div className={styles.infoWrapper}>
                <div className={styles.title}>7d low</div>
                <div className={styles.price}>22,000 USD</div>
              </div>
            </Box>
          </Box>
        </CustomPaper>
  );
}

export default SymbolPriceCard;