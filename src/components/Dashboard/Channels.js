import React from 'react';
import { Link } from 'react-router-dom';
import CreateChannel from "./CreateChannel";
const add = 'http://localhost:8080/images/add.svg';

class Channels extends React.Component{
  state = {
    teamName: this.props.teamName,
    teamId: this.props.teamId,
    username: this.props.username,
    channels: this.props.channels,
    users: this.props.users,
    createChannelModal: false
  };

  onCreateChannelClick = () => this.setState(prevState => ({createChannelModal: !prevState.createChannelModal}));

  pushNewChannel = (channel) => {
    this.setState(prevState => ({channels: prevState.channels.concat(channel)}))
  };

  user = ({id, username}) =>  (
    <div className="sidebar__user" key={`user-${id}`}>
      <span className="sidebar__user--status"> </span>
      <span className="sidebar__user--name">{username}</span>
    </div>
  );

  channel = (({id, name}) => (
    <Link to={`/dashboard/${this.state.teamId}/${id}`}
          className="sidebar__section--item"
          key={`channel-${id}`}>
      {name}
    </Link>
  ));

  render(){
    const {teamName, teamId, username, channels, users, createChannelModal } = this.state;

    return (
      <div className="sidebar">

        <div className="sidebar__title">
          { teamName && <h1 className="sidebar__title--team">{teamName}</h1> }
          <div className="sidebar__title--user sidebar__user">
            <span className="sidebar__user--status"> </span>
            <span className="sidebar__user--name">{username}</span>
          </div>
        </div>

        { teamName &&
        <div>
          <div className="sidebar__section">
            <div className="sidebar__section--container">
              <h3 className="sidebar__section--title">Channels</h3>
              <button className="sidebar__section--button"
                      onClick={this.onCreateChannelClick}>
                <img src={add} alt="add channel" className="sidebar__section--icon"/>
              </button>
            </div>
            {channels.map(this.channel)}
          </div>

          <div className="sidebar__section">
            <h3 className="sidebar__section--title">Users</h3>
            {users.map(this.user)}
          </div>
        </div>
        }

        { createChannelModal &&
          <div className="modal-container">
            <CreateChannel
              history={this.props.history}
              teamId={teamId}
              closeModal={this.onCreateChannelClick}
              pushNewChannel={this.pushNewChannel}/>
          </div>}
      </div>
    )
  }
}

export default Channels;