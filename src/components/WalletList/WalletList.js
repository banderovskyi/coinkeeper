import { Container, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import WalletCreator from '../WaleltCreator/WalletCreator';
import WalletItem from '../WalletItem/WalletItem';

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
  walletsWrap: {
    marginTop: '50px',
  },
  walletsBox: {
    padding: '30px',
    '& > div': {
      marginBottom: '20px',
      '&:last-child': {
        marginBottom: '0px',
      },
    },
  },
}));

function WalletList() {
  const classes = useStyles();
  const wallets = useSelector((state) => state.wallets);

  return (
    <Container className={classes.container}>
      <WalletCreator />
      <div className={classes.walletsWrap}>
        <Typography variant="overline" display="block" gutterBottom>
          My wallets
        </Typography>
        <Paper className={classes.walletsBox}>
          {wallets.map((walletArrItem) => (
            <WalletItem
              key={walletArrItem.key + walletArrItem.amount}
              walletKey={walletArrItem.key}
              name={walletArrItem.name}
              amount={walletArrItem.amount}
              currency={walletArrItem.currency}
            />
          ))}
        </Paper>
      </div>
    </Container>
  );
}

export default WalletList;
