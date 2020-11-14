import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import palette from 'shared/style/palette.json';

const useStyles = makeStyles({
  root: {
    background: palette["dark-100"],
    border: 0,
    color: 'white',
  },
});

const CustomPaper = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <Paper
      elevation={2}
      classes={{
        root: classes.root,
      }}
      { ...props }
    >
      {children}
    </Paper>
  );
}

export default CustomPaper;