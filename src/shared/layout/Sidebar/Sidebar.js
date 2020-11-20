import React from 'react';
import { Link } from "react-router-dom";
import { Apps, SwapHoriz } from '@material-ui/icons';

import palette from 'shared/style/palette.json';
import styles from './Sidebar.scss';

const Sidebar = () => {
  return (
    <div className={styles.wrapper}>
      <Link to="/"><Apps style={{ color: palette["white"] }} /></Link>
      <Link to="/trades"><SwapHoriz style={{ color: palette["white"] }} /></Link>
    </div>
  )
}

export default Sidebar;