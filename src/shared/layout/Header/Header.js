import React, { useState } from 'react';
import { IconButton, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

import styles from './Header.scss';

const Header = () => {
  const [currency, setCurrency] = useState('USD');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };


  return (
    <div className={styles.headerWrapper}>
      <FormControl variant="outlined" className={styles.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Currency</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          defaultValue={currency}
          onChange={handleChange}
          label="Currency"
        >
          <MenuItem value='USD'>USD</MenuItem>
          <MenuItem value='LKR'>LKR</MenuItem>
          <MenuItem value='EUR'>EUR</MenuItem>
          <MenuItem value='GBP'>GBP</MenuItem>
          <MenuItem value='AUD'>AUD</MenuItem>
        </Select>
      </FormControl>
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