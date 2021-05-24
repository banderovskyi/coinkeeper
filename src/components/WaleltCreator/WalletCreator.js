import {
  Button,
  FormControl,
  makeStyles,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrencyRate } from '../../helpers/helpers';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
  box: {
    padding: '30px',
  },
  flexBox: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  btn: {
    minWidth: '100px',
  },
}));

const currencies = [
  {
    value: 'hrn',
    label: '₴',
  },
  {
    value: 'usd',
    label: '$',
  },
  {
    value: 'eur',
    label: '€',
  },
];

function WalletCreator() {
  const classes = useStyles();
  const stateCurrencies = useSelector((state) => state.currencies);
  const dispatch = useDispatch();
  const [currency, setCurrency] = useState('hrn');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const createNewWallet = (e) => {
    e.preventDefault();
    let formData = {};
    const formInputs = e.target.querySelectorAll('input');
    formInputs.forEach((input) => {
      formData[input.name] = input.value;
      input.value = '';
    });

    const totalRate = getCurrencyRate(stateCurrencies, formData.currency);
    const totalInUah = totalRate * Number(formData.amount);

    dispatch({
      type: 'CHANGE_TOTAL',
      payload: { action: '+', total: totalInUah },
    });
    dispatch({ type: 'ADD_WALLET', payload: formData });
    formData = {};
  };

  return (
    <>
      <Typography variant="overline" display="block" gutterBottom>
        Create new wallet
      </Typography>
      <Paper className={classes.box}>
        <form
          className={classes.flexBox}
          onSubmit={(e) => {
            createNewWallet(e);
          }}
        >
          <FormControl fullWidth className={classes.margin}>
            <TextField name="name" required helperText="Name" />
          </FormControl>
          <FormControl fullWidth className={classes.margin}>
            <TextField
              name="amount"
              required
              type="number"
              helperText="Amount"
            />
          </FormControl>
          <FormControl required fullWidth className={classes.margin}>
            <TextField
              name="currency"
              id="standard-select-currency"
              select
              value={currency}
              onChange={handleChange}
              helperText="Currency"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.btn}
          >
            Create
          </Button>
        </form>
      </Paper>
    </>
  );
}

export default WalletCreator;
