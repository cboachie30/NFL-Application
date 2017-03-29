import React from 'react';
import NavLink from './NavLink';
import request from 'superagent';
export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  componentDidMount() {
  //  mongodb.connect('mongodb://localhost/nflSchedule');
    console.log('mounted');
    request
    .post('/getTeams')
    .end(function(err, res){
      console.log(res);
    });
  },


  render() {
    return (
      <div>
        <h2>Teams</h2>
        <ul>
          <li><a href="/team/123">Team 1</a></li>
        </ul>
      </div>
    )
  }
})
