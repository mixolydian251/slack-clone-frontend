import React from 'react';
import { Query } from 'react-apollo';
import gql from "graphql-tag";

import Channels from './Channels';
import Header from './Header'
import Messages from './Messages'
import SendMessage from './SendMessage'
import Teams from './Teams'

const dashboardQuery = gql`
  query {
    getUser{
      username
    }
    allUsers {
      username
      email
    }
    allTeams{
      name
    }
  }
`;

class Dashboard extends React.Component {

  state = {
    team: undefined
  };

  changeTeam = team => {
    console.log("Changing Team");
    this.setState({team})
  };

  render() {
    const {team} = this.state;
    return (
      <Query query={dashboardQuery}>
        {({ loading, error, data }) => {

          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error!: {error}</p>;

          if(data) {
            const { getUser, allUsers, allTeams } = data;
            return (
              <div className="dashboard">
                <Teams teams={allTeams} changeTeam={this.changeTeam}/>
                <Channels
                  teamName={team}
                  username={getUser.username}
                  channels={[{id: 1, name: "general"}, {id: 2, name: "random"}]}
                  users={allUsers}/>
                <Header/>
                <Messages/>
                <SendMessage/>
              </div>
            )
          }
        }}
      </Query>
    );
  }
}

export default Dashboard;