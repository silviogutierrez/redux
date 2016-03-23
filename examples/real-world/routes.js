import React from 'react'
import { IndexRoute, Route } from 'react-router'
import App from './containers/App'
import UserPage from './containers/UserPage'
import RepoPage from './containers/RepoPage'
import WidgetList from './containers/WidgetList'
import WidgetDetail from './containers/WidgetDetail'
import WidgetForm from './containers/WidgetForm'

export default (
  <Route path="/" component={App}>
      <Route path="/widgets/">
          <IndexRoute component={WidgetList} />
          <Route path=":id/edit/" component={WidgetForm} />
          <Route path=":id/" component={WidgetDetail} />
      </Route>
    <Route path="/:login/:name"
           component={RepoPage} />
    <Route path="/:login"
           component={UserPage} />
  </Route>
)
