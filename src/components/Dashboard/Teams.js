import React from 'react';
import Team from './Team';

class Teams extends React.Component {
  state = {
    teamName: "Teams"
  };

  previewTeamName = (teamName) => {
    this.setState({teamName})
  };

  render() {
    return (
      <div className="teams"
           onMouseLeave={() => this.previewTeamName("Teams")} >
        <h1 className="teams__title">{this.state.teamName}</h1>

        { this.props.teams.map( team => (
          <Team key={`team-${team.id}`}
                letter={team.name[0].toUpperCase()}
                id={team.id}
                name={team.name}
                previewTeamName={this.previewTeamName}/> ))}
      </div>
    )
  }
}

export default Teams;