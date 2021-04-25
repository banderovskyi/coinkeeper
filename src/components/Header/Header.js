import React from 'react';
import { Container, Grid } from '@material-ui/core';
import Logo from '../Logo/Logo';
import CurrencyTab from '../CurrencyTab/CurrencyTab';

function Header() {
  return (
    <Container>
      <Grid container direction="row" alignItems="center" spacing={2}>
        <Grid item xs={12} md={9}>
          <Logo />
        </Grid>
        <Grid item xs={12} md={3}>
          <CurrencyTab />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Header;
