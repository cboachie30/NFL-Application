import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import About from './About'
import Teams from './Teams'
import team from './team'
import Home from './Home'

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/teams" component={Teams}>
    </Route>
    <Route path="/team/:teamId" component={team}/>
    <Route path="/about" component={About}/>
  </Route>
)
