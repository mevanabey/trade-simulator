import React from 'react';
import { Apps, SwapHoriz } from '@material-ui/icons';

import palette from 'shared/style/palette.json';
import styles from './Sidebar.scss';

const Sidebar = () => {
  return (
    <div className={styles.wrapper}>
      <Apps style={{ color: palette["white"] }} />
      <SwapHoriz style={{ }} />
    </div>
  )
}

export default Sidebar;