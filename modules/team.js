import React from 'react'

export default React.createClass({
  render() {
    console.log(this.props.params);
    const { teamId } = this.props.params
    return (
      <div>
        <h2>This team is {teamId}</h2>
      </div>
    )
  }
})
