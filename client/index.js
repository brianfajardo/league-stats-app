import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './src/store'

// Styles
import 'semantic-ui-css/semantic.min.css'
import './styles/index.css'

// Components
import App from './src/components/App'

const Main = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(<Main />, document.getElementById('root'))
