import { IconButton, makeStyles, Typography } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrencyToSymbol } from '../../helpers/helpers';

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
  amountBox: {
    color: 'green',
    padding: '10px',
    background: '#f5f5f5',
    borderRadius: '10px',
    display: 'flex',
  },
  amount: {
    fontSize: '30px',
    padding: '10px',
    border: '1px solid transparent ',
    maxWidth: '200px',
  },
  walletName: {
    marginLeft: '40px',
    padding: '10px',
    border: '1px solid transparent ',
  },
  currency: {
    alignSelf: 'flex-start',
    marginLeft: '0px',
  },
  buttonsWrapper: {
    marginLeft: 'auto',
  },
  divEditable: {
    whiteSpace: 'nowrap',
    border: '1px solid #dcdcdc',
    borderRadius: '3px',
  },
  input: {
    border: 'none',
    fontSize: 'inherit',
    background: 'inherit',
    fontFamily: 'inherit',
    color: 'inherit',
    outline: 'none',
  },
}));

function WalletItem(props) {
  const dispatch = useDispatch();
  const { name, amount, currency, walletKey } = props;
  const classes = useStyles();
  const [isEditable, setIsEditable] = useState(false);
  const [walletAmount, setWalletAmount] = useState(amount);
  const [walletName, setWalletName] = useState(name);

  const removeWallet = (walletKey, amount) => {
    dispatch({
      type: 'REMOVE_WALLET',
      payload: walletKey,
    });
    dispatch({
      type: 'CALC_TOTAL',
      payload: { action: '-', total: amount },
    });
  };

  const editWallet = () => {
    setIsEditable(!isEditable);
    const saveData = isEditable;
    if (saveData) {
      dispatch({
        type: 'CHANGE_TOTAL',
        payload: { wallet: walletKey, changedWalletAmount: walletAmount },
      });
    }
  };

  return (
    <div className={classes.flexBox}>
      <div className={classes.amountBox}>
        <Typography
          className={`${isEditable && classes.divEditable} ${classes.amount} `}
        >
          <input
            type="number"
            value={walletAmount}
            onChange={(e) => setWalletAmount(e.target.value)}
            disabled={!isEditable}
            className={classes.input}
          />
        </Typography>
        <Typography variant="h6" className={classes.currency}>
          {changeCurrencyToSymbol(currency)}
        </Typography>
      </div>
      <Typography
        variant="h2"
        className={`${isEditable && classes.divEditable} ${classes.walletName}`}
        // contentEditable={`${isEditable}`}
      >
        <input
          type="text"
          value={walletName}
          onChange={(e) => setWalletName(e.target.value)}
          disabled={!isEditable}
          className={classes.input}
        />
      </Typography>
      <div className={classes.buttonsWrapper}>
        <IconButton onClick={() => editWallet()}>
          {isEditable ? <CheckIcon /> : <EditIcon />}
        </IconButton>
        <IconButton onClick={() => removeWallet(walletKey, amount)}>
          <DeleteOutlineIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default WalletItem;
