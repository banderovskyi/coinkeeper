import { createStore } from 'redux';

export const initialState = {
  total: 0,
  currencies: {},
  wallets: [],
};

const calcNumbers = {
  '+': function (a, b) {
    return a + b;
  },
  '-': function (a, b) {
    return a - b;
  },
  '*': function (a, b) {
    return a * b;
  },
  '/': function (a, b) {
    return a / b;
  },
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'CALC_TOTAL':
      const newTotal = calcNumbers[payload.action](state.total, payload.total);
      return { ...state, total: newTotal };
    case 'CHANGE_TOTAL':
      console.log(payload, 'STATE');
      let changedTotal = 0;
      const changedWallets = state.wallets.map((wallet) => {
        if (wallet.key === payload.wallet) {
          wallet.amount = Number(payload.changedWalletAmount);
          return wallet;
        } else {
          return wallet;
        }
      });
      changedWallets.forEach((wallet) => (changedTotal = +wallet.amount));
      return { ...state, total: changedTotal, wallets: changedWallets };
    case 'SET_CURRENIECS':
      return { ...state, currencies: { ...payload } };
    case 'ADD_WALLET':
      const newWallet = {
        ...payload,
        amount: Number(payload.amount),
        key: `${payload.name}_${payload.currency}`.toUpperCase(),
      };
      return { ...state, wallets: [...state.wallets, newWallet] };
    case 'REMOVE_WALLET':
      const newWallets = state.wallets.filter((wallet) =>
        wallet.key === payload ? false : true
      );
      return { ...state, wallets: newWallets };
    default:
      return state;
  }
};

export const store = createStore(reducer);
