import React from 'react';
import request from 'superagent';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object,
    playerList: React.PropTypes.array,
  },
  getInitialState: function(){
     return {
       playerList: null
     }
  },
  componentDidMount() {
  //  mongodb.connect('mongodb://localhost/nflSchedule');
    this.getTeams()

  },

  getTeams() {
    const that = this;

    request
    .get('/getPlayers?teamId='+this.props.params.teamId)
    .end(function(err, res){
      if (res.body) {
        console.log(res.body, that);
        that.setState({
          playerList: res.body
        })
      }
    });
  },



  render() {
    console.log(this.props.params);
    const { teamId } = this.props.params
    const {playerList} = this.state;
    return (
      <div>
      <h2>Players</h2>
      {playerList ?
        <ul>
          {playerList.map((player, index) => {
            return (
                <li key={index}><a href={'/team/'+player.id}>{player.name}</a></li>
            );
          })}

        </ul>

      : null}
      </div>
    )
  }
})
