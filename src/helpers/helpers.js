export const changeCurrencyToSymbol = (name) => {
  switch (name) {
    case 'hrn':
      return '₴';
    case 'usd':
      return '$';
    case 'eur':
      return '€';
    default:
      return 'name';
  }
};

export const getCurrencyRate = (stateCurrencies, name) => {
  switch (name) {
    case 'usd':
      return stateCurrencies?.uahToUsd;
    case 'eur':
      return stateCurrencies?.uahToEur;
    default:
      return 1;
  }
};
