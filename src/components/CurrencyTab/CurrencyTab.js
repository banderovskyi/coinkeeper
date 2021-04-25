import { AppBar, Toolbar } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';

const styles = {
  justifyContent: 'center',
};

function CurrencyTab() {
  const [currencyObj, setCurrencyObj] = useState({ usd: 0, eur: 0 });
  const [currencyIsLoading, setCurrencyIsLoading] = useState(true);

  useEffect(() => {
    const getCurrency = async () => {
      await axios
        .get('http://www.floatrates.com/daily/uah.json')
        .then((res) => {
          // OPT* Here I can make array with needs currencyes
          setCurrencyObj({
            ...currencyObj,
            usd: res.data.usd.inverseRate.toFixed(2),
            eur: res.data.eur.inverseRate.toFixed(2),
          });
          setCurrencyIsLoading(false);
        });
    };
    getCurrency();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppBar position="static">
      <Toolbar style={styles}>
        USD: {currencyIsLoading ? <Loader /> : currencyObj.usd} | EUR:{' '}
        {currencyIsLoading ? <Loader /> : currencyObj.eur}
      </Toolbar>
    </AppBar>
  );
}

export default CurrencyTab;
