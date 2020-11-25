import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';

import palette from 'shared/style/palette.json';
import { FormControl, InputLabel, MenuItem } from "@material-ui/core";
import styles from './Select.scss';

const useStyles = makeStyles({
  root: {
    // border: 0,
    color: 'white',
    fontSize: '12px',
    padding: '12px 0 8px 16px',

    'fieldset': {
      borderColor: 'white',
    },
  },
  icon: {
    color: 'white',
    right: 0,
  }
});

const CustomSelect = ({ children, options, onChange, defaultValue, selectedValue, ...props }) => {
  const classes = useStyles();

  return (
    <FormControl variant="outlined">
      <InputLabel id="demo-simple-select-outlined-label">Currency</InputLabel>
      <Select
        classes={{
          root: classes.root,
          icon: classes.icon,
        }}
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={selectedValue}
        defaultValue={defaultValue}
        onChange={onChange}
        label="Currency"
      >
        <MenuItem className={styles.menuItem} value='USD'>USD</MenuItem>
        <MenuItem value='LKR'>LKR</MenuItem>
        <MenuItem value='EUR'>EUR</MenuItem>
        <MenuItem value='GBP'>GBP</MenuItem>
        <MenuItem value='AUD'>AUD</MenuItem>
      </Select>
    </FormControl>
  );
}

export default CustomSelect;