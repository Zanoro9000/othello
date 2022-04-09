import React from "react"
import { Provider } from "react-redux"
import './App.css'
import { Header } from "./common/Header"
import { Board } from "./game/Board"
import { appStore } from "./redux/store"

export const App = () => <Provider store={appStore}>
  <div className='appRoot'>
    <Header />
    <Board />
  </div>
</Provider>