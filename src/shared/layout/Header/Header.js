import React, { useState } from 'react';
import { IconButton, FormControl, InputLabel, } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Select } from 'shared/components/common';

import styles from './Header.scss';

const Header = () => {
  const [currency, setCurrency] = useState('USD');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };


  return (
    <div className={styles.headerWrapper}>
      <Select defaultValue={currency} value={currency} onChange={handleChange}/>
      <IconButton
        edge="end"
        onClick={() => {}}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
  </div>
      )
}

export default Header;