import React from 'react'
import ReactDOM from 'react-dom/client'
import './style/index.less'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider as BusProvider } from './hooks/useBus'
import { Provider } from 'react-redux'
import store from './redux'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  // <React.StrictMode>
  <BusProvider>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </BusProvider>
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
