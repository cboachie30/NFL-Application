import React from 'react'
import NavLink from './NavLink'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>NFL Application</h1>
        <ul role="nav">
          <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
          <li><NavLink to="/About">About</NavLink></li>
          <li><NavLink to="/Teams">Teams</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})
