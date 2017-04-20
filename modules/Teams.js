import React from 'react';
import NavLink from './NavLink';
import request from 'superagent';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object,
    teamList: React.PropTypes.array,
  },
  getInitialState: function(){
     return {
       teamList: null
     }
  },
  componentDidMount() {
  //  mongodb.connect('mongodb://localhost/nflSchedule');
    this.getTeams()

  },

  getTeams() {
    const that = this;

    request
    .get('/getTeams')
    .end(function(err, res){
      if (res.body) {
        console.log(res.body, that);
        that.setState({
          teamList: res.body
        })
      }
    });
  },
  render() {
    console.log('rendering', teamList);
    const {teamList} = this.state;
    return (
      <div>
        <h2>Teams</h2>
        {teamList ?
          <ul>
            {teamList.map((team, index) => {
              return (
                  <li key={index}><a href={'/team/'+team.id}>{team.name}</a></li>
              );
            })}

          </ul>

        : null}
      </div>
    )
  }
})
