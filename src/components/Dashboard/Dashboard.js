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
      id
      username
      email
    }
    allTeams{
      id
      name
      channels {
        id
        name
      }
    }
  }
`;

class Dashboard extends React.Component {

  render() {
    return (
      <Query query={ dashboardQuery }>
        {({ loading, error, data }) => {

          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error!: {error}</p>;

          if(data) {

            const { getUser, allUsers, allTeams } = data;

            const currentTeam = data.allTeams.filter( team => {
              return team.id === Number(this.props.match.params.teamId)
            })[0];

            const currentChannel = currentTeam.channels.filter(channel => {
              return channel.id === Number(this.props.match.params.channelId)
            })[0];

            return (
              <div className="dashboard">
                <Teams teams={ allTeams }/>
                <Channels
                  teamName={ currentTeam.name }
                  teamId={this.props.match.params.teamId}
                  username={ getUser.username }
                  channels={ currentTeam.channels }
                  users={ allUsers }/>
                <Header channel={currentChannel ? currentChannel.name : ""}/>
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