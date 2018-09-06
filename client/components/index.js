import React, {Fragment} from 'react'
import store from '../store'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'

const App = () => {
  return (
    <Provider store = {store}>
      <Router>
        <Fragment>
          <h1>Hello World</h1>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
