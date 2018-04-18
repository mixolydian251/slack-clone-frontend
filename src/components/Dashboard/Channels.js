import React from 'react';
import { Link } from 'react-router-dom';

const user = ({id, username}) =>  (
    <div className="sidebar__user" key={`user-${id}`}>
      <span className="sidebar__user--status"> </span>
      <span className="sidebar__user--name">{username}</span>
    </div>
  );

const channel = ({id, name}) => (
    <p className="sidebar__section--item" key={`channel-${id}`}>{name}</p>
  );

const Channels = ({
  teamName,
  teamId,
  username,
  channels,
  users
  }) => (
    <div className="sidebar">

      <div className="sidebar__title">
        <div className="sidebar__title--user sidebar__user">
          <span className="sidebar__user--status"> </span>
          <span className="sidebar__user--name">{username}</span>
        </div>
        { teamName && <h1 className="sidebar__title--team">{teamName}</h1> }
      </div>

      <div className="sidebar__section">
        <h3 className="sidebar__section--title">Channels</h3>
        {
          channels.map(({id, name}) => (
            <Link to={`/dashboard/${teamId}/${id}`}
                  className="sidebar__section--item"
                  key={`channel-${id}`}>
              {name}
            </Link>
          ))
        }
      </div>

      <div className="sidebar__section">
        <h3 className="sidebar__section--title">Users</h3>
        {users.map(user)}
      </div>

    </div>
);

export default Channels;