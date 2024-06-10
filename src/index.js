import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { getPersistor } from '@rematch/persist'
import { store } from './store/rematch'
import * as serviceWorkerRegistration from './serviceWorkerRegistration.js'
import App from './App'
import './locales'

const persistor = getPersistor()

ReactDOM.createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>
)

serviceWorkerRegistration.register()
