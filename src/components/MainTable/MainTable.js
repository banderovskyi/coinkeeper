import { Container, Fab, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

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
  const currencies = useSelector((state) => state.currencies);
  const stateTotal = useSelector((state) => state.total);
  const [total, setTotal] = useState(stateTotal);
  const currencyesButtonsInit = [
    { type: 'hrn', rate: 1, isActive: true, symbol: '₴', disabled: false },
    {
      type: 'dol',
      rate: 1,
      isActive: false,
      symbol: '$',
      disabled: true,
    },
    {
      type: 'eur',
      rate: 1,
      isActive: false,
      symbol: '€',
      disabled: true,
    },
  ];
  const [currencyesButtons, setCurrencyesButtons] = useState(
    currencyesButtonsInit
  );
  const [activeCurrencyRate, setActiveCurrencyRate] = useState(1);

  useEffect(() => {
    const currencyesButtonsNew = [...currencyesButtons];
    currencyesButtonsNew.map((item) => {
      switch (item.type) {
        case 'dol':
          item.rate = currencies.usdToUah;
          item.disabled = false;
          return item;
        case 'eur':
          item.rate = currencies.eurToUah;
          item.disabled = false;
          return item;
        default:
          return item;
      }
    });
    setCurrencyesButtons(currencyesButtonsNew);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencies]);

  useEffect(() => {
    setTotal(stateTotal);
  }, [stateTotal]);

  const changeCurrency = (btn) => {
    setActiveCurrencyRate(Number(btn.rate));
    const currencyesButtonsNew = [...currencyesButtons];
    currencyesButtonsNew.map((item) =>
      item.type === btn.type ? (item.isActive = true) : (item.isActive = false)
    );
    setCurrencyesButtons(currencyesButtonsNew);
  };

  const roundTotal = (total) => {
    function isInteger(num) {
      return (num ^ 0) === num;
    }
    return isInteger(total) ? total : total.toFixed(2);
  };

  return (
    <Container className={classes.container}>
      <Typography variant="overline" display="block" gutterBottom>
        Whole amount
      </Typography>
      <Paper className={classes.box} elevation={3}>
        <Typography variant="h2" className={classes.title} gutterBottom>
          {roundTotal(total * activeCurrencyRate) === 0
            ? 'Please add new wallet'
            : roundTotal(total * activeCurrencyRate)}
        </Typography>
        <div className={classes.tabes}>
          {currencyesButtons.map((btn) => (
            <Fab
              key={btn.type}
              color={btn.isActive ? 'primary' : 'default'}
              className={classes.extendedIcon}
              disabled={btn.disabled}
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
