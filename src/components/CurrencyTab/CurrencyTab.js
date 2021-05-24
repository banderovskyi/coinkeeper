import { AppBar, Toolbar } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Loader from '../Loader/Loader';

const styles = {
  justifyContent: 'center',
};

function CurrencyTab() {
  const dispatch = useDispatch();
  const [currencyObj, setCurrencyObj] = useState({ usd: 0, eur: 0 });
  const [currencyIsLoading, setCurrencyIsLoading] = useState(true);

  useEffect(() => {
    const getCurrency = async () => {
      await axios
        .get('http://www.floatrates.com/daily/uah.json')
        .then((res) => {
          const uahToUsd = res.data.usd.inverseRate.toFixed(2);
          const uahToEur = res.data.eur.inverseRate.toFixed(2);
          const usdToUah = res.data.usd.rate.toFixed(6);
          const eurToUah = res.data.eur.rate.toFixed(6);
          setCurrencyObj({
            ...currencyObj,
            uahToUsd,
            uahToEur,
            usdToUah,
            eurToUah,
          });
          setCurrencyIsLoading(false);
          dispatch({
            type: 'SET_CURRENIECS',
            payload: {
              uahToUsd,
              uahToEur,
              usdToUah,
              eurToUah,
            },
          });
        });
    };
    getCurrency();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppBar position="static">
      <Toolbar style={styles}>
        USD: {currencyIsLoading ? <Loader /> : currencyObj.uahToUsd} | EUR:{' '}
        {currencyIsLoading ? <Loader /> : currencyObj.uahToEur}
      </Toolbar>
    </AppBar>
  );
}

export default CurrencyTab;
