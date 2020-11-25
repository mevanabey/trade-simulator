import React from 'react';
import { Link } from "react-router-dom";
import { Tooltip } from '@material-ui/core';
import { Apps, SwapHoriz } from '@material-ui/icons';

import palette from 'shared/style/palette.json';
import styles from './Sidebar.scss';

const Sidebar = () => {
  return (
    <div className={styles.wrapper}>
      <Tooltip title="Dashboard">
        <Link to="/"><Apps style={{ color: palette["white"] }} /></Link>
      </Tooltip>
      <Tooltip title="Trades">
        <Link to="/trades"><SwapHoriz style={{ color: palette["white"] }} /></Link>
      </Tooltip>
    </div>
  )
}

export default Sidebar;