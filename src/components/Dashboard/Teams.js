import React from 'react';
import Team from './Team';
import { Query } from 'react-apollo';
import { allTeams } from "../../graphql/query";

class Teams extends React.Component {
  state = {
    teamName: "Teams"
  };

  previewTeamName = (teamName) => {
    this.setState({teamName})
  };

  render() {
    return (
      <Query query={ allTeams }>
        {({ loading, error, data }) => {

          if (loading) return null;
          if (error) return <p>Error!: {error}</p>;

          if(data) {

            const { allTeams } = data;

            return (
              <div className="teams"
                   onMouseLeave={() => this.previewTeamName("Teams")} >
                <h1 className="teams__title">{this.state.teamName}</h1>

                { allTeams.map( team => (
                  <Team key={`team-${team.id}`}
                        letter={team.name[0].toUpperCase()}
                        id={team.id}
                        name={team.name}
                        previewTeamName={this.previewTeamName}/> ))}
              </div>
            )
          }
        }}
      </Query>
    );
  }
}

export default Teams;









