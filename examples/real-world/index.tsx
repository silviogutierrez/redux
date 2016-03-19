import 'babel-polyfill'
import * as React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root.dev'
import configureStore from './store/configureStore.dev'

const store = (configureStore as any)()
const history = syncHistoryWithStore(browserHistory, store)

const Casted = Root as any;

render(
  <Casted store={store} history={history} />,
  document.getElementById('root')
)
