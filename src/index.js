import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import "bootstrap/dist/css/bootstrap.min.css"

import "@fortawesome/fontawesome-free/css/all.min.css"

import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import reducers from "./reducers/RootReducer"

import {
  transitions,
  positions,
  types,
  Provider as AlertProvider,
} from "react-alert"
// import AlertTemplate from 'react-alert-template-basic'

const options = {
  // you can also just use 'bottom center'
  position: "top right",
  timeout: 3000,
  // offset: '70px',
  // you can also just use 'scale'

  transition: transitions.SCALE,
  containerStyle: {
    zIndex: 80000,
  },
}

const AlertTemplate = ({ style, options, message, close }) => (
  <div style={style}>
    {message}
    {/* <button onClick={close}>X</button> */}
  </div>
)

const store = createStore(reducers, compose(applyMiddleware(thunk)))

// store.subscribe(() => {
//   // const cachedCreds = JSON.parse(window.localStorage.getItem("credentials"))
//   // console.log(cachedCreds.token)
//   console.log(store.getState())
// })

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
