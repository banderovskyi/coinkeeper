import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import Header from './components/Header/Header';
import MainTable from './components/MainTable/MainTable';
import WalletList from './components/WalletList/WalletList';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <MainTable />
        <WalletList />
      </div>
    </Provider>
  );
}

export default App;
