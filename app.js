alert("Chris Boachie");

import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);


var nflTeams = React.createClass({
  render: function() {
      return (
        <div className="teams">
          <div className="header">
            <form onSubmit={this.addTeam}>
              <input placeholder="enter team">
              </input>
              <button type="submit">add</button>
            </form>
          </div>
        </div>
      );
    }
});

ReactDOM.render(
  <div>
  <nflTeams>
  </div>,
  Destination
);

var nflTeams = React.createClass({
  getInitialState: function() {
    return {
      items: ["Buffalo Bills","Miami Dolphins","New England Patriots",
    "New York Jets","Baltimore Ravens","Cincinnati Bengals","Cleveland Browns",
  "Pitsburgh Steelers","Houston Texans","Indianapolis Colts","Jacksonville Jaguars",
"Tennessee Titans","Denver Broncos","Kansas City Chiefs","Los Angeles Chargers",
"Oakland Raiders","Dallas Cowboys","New York Giants","Philadelphia Eagels",
"Washington Redskins","Chicago Bears","Detriot Lions","Green Bay Packers",
"Minnesota Vikings","Atlanta Falcons","Carolina Panthers","New Orleans Saints",
"Tampa Bay Buccaneers","Arizona Cardninals","Los Angeles Rams","San Fransisco 49ers",
"Seattle Seahawks"]
    };
  },
  addItem: function(e) {

  },
  render: function() {
    return (
      <div className="teams">
        <div className="header">
          <form onSubmit={this.addTeam}>
            <input placeholder="enter team">
            </input>
            <button type="submit">add</button>
          </form>
        </div>
      </div>
    );
  }
});
