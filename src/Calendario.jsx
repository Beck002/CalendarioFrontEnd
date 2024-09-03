import React from 'react'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { AppRouter } from './routes'
import { Provider } from 'react-redux'
import { store } from './store'


export const Calendario = () => {
  return (
    <Provider store={ store }>
      {/* <BrowserRouter> */}
      <HashRouter>
        <AppRouter />
      </HashRouter>
      {/* </BrowserRouter> */}
    </Provider>
  )
}
