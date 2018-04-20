import React from 'react';
import CreateChannel from "./CreateChannel";
import Channels from "./Channels";
import Users from "./Users";

class Sidebar extends React.Component{
  state = {
    teamName: this.props.teamName,
    teamId: this.props.teamId,
    username: this.props.username,
    createChannelModal: false,
  };

  onCreateChannelClick = () => this.setState( prevState => ({createChannelModal: !prevState.createChannelModal}));

  render(){
    const {teamName, teamId, username, createChannelModal } = this.state;

    return (
      <div className="sidebar">

        <div className="sidebar__title">
          { teamName && <h1 className="sidebar__title--team">{teamName}</h1> }
          <div className="sidebar__title--user sidebar__user">
            <span className="sidebar__user--status"> </span>
            <span className="sidebar__user--name">{username}</span>
          </div>
        </div>

        { teamName && [
          <Channels key="sidebar-channels"
                    teamId={teamId}
                    openModal={this.onCreateChannelClick}/>,
          <Users key="sidebar-users"/> ]}

        { createChannelModal &&
          <div className="modal-container">
            <CreateChannel
              history={this.props.history}
              teamId={teamId}
              closeModal={this.onCreateChannelClick}/>
          </div> }

      </div>
    )
  }
}

export default Sidebar;