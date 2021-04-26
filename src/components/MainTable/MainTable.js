import { Container, Fab, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '50px',
  },
  title: {
    marginBottom: '0px',
  },
  box: {
    padding: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabes: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    fontSize: '25px',
  },
}));

function MainTable() {
  const classes = useStyles();
  const [total] = useState(2433);
  const currencyesButtonsInit = [
    { type: 'hrn', rate: 1, isActive: true, symbol: '₴' },
    { type: 'dol', rate: 27, isActive: false, symbol: '$' },
    { type: 'eur', rate: 33, isActive: false, symbol: '€' },
  ];
  const [currencyesButtons, setcurrencyesButtons] = useState(
    currencyesButtonsInit
  );
  const [activeCurrencyRate, setActiveCurrencyRate] = useState(1);

  const changeCurrency = (btn) => {
    console.log(btn.type);
    setActiveCurrencyRate(btn.rate);
    const currencyesButtonsNew = [...currencyesButtons];
    currencyesButtonsNew.map((item) =>
      item.type === btn.type ? (item.isActive = true) : (item.isActive = false)
    );
    setcurrencyesButtons(currencyesButtonsNew);
  };

  return (
    <Container className={classes.container}>
      <Paper className={classes.box} elevation={3}>
        <Typography variant="h2" className={classes.title} gutterBottom>
          {total * activeCurrencyRate}
        </Typography>
        <div className={classes.tabes}>
          {currencyesButtons.map((btn) => (
            <Fab
              key={btn.type}
              color={btn.isActive ? 'primary' : 'default'}
              className={classes.extendedIcon}
              onClick={() => {
                changeCurrency(btn);
              }}
            >
              {btn.symbol}
            </Fab>
          ))}
        </div>
      </Paper>
    </Container>
  );
}

export default MainTable;
