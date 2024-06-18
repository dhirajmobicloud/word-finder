import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { getPersistor } from '@rematch/persist'
import { store } from './store/rematch'
import * as serviceWorkerRegistration from './serviceWorkerRegistration.js'
import App from './App'
import './locales'
import { BrowserRouter } from 'react-router-dom'

const persistor = getPersistor()

ReactDOM.createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </Provider>
  </PersistGate>
)

serviceWorkerRegistration.register()
