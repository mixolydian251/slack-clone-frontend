import React from 'react';
import { Query } from 'react-apollo';
import { dashboardQuery } from "../../graphql/query"

import Sidebar from './Sidebar';
import Header from './Header'
import Messages from './Messages'
import SendMessage from './SendMessage'
import Teams from './Teams'

class Dashboard extends React.Component {

  render() {
    return (
      <Query query={ dashboardQuery }>
        {({ loading, error, data }) => {

          if (loading) return null;
          if (error) return <p>Error!: {error}</p>;

          if(data) {

            const { getUser, allTeams } = data;
            const teamId = this.props.match.params.teamId;
            const channelId = this.props.match.params.channelId;
            let currentTeam;

            if (this.props.match.params.teamId){
              currentTeam = allTeams.filter( team => {
                return team.id === Number(this.props.match.params.teamId)
              })[0];
            }

            else {
              currentTeam = {
                name: undefined,
                channels: []
              }
            }

            return (
              <div className="dashboard">
                <Teams/>

                <Sidebar
                  history={this.props.history}
                  teamName={ currentTeam.name }
                  teamId={ teamId }
                  username={ getUser.username }/>

                { channelId &&
                  <Header
                    teamId={ teamId }
                    channelId={ channelId }/> }

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