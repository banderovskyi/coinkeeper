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
    case 'CHANGE_TOTAL':
      const newTotal = calcNumbers[payload.action](state.total, payload.total);
      return { ...state, total: newTotal };
    case 'SET_CURRENIECS':
      return { ...state, currencies: { ...payload } };
    case 'ADD_WALLET':
      const newWallet = {
        ...payload,
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
