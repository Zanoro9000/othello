import React from 'react';
import { Provider } from 'react-redux';
import './App.scss';
import { Header } from './common/Header';
import { SubHeader } from './common/SubHeader';
import { Board } from './game/Board';
import { appStore } from './redux/store';

export function App() {
  return (
    <Provider store={appStore}>
      <div className="appRoot">
        <Header />
        <SubHeader />
        <Board />
      </div>
    </Provider>
  );
}
