import React from 'react';
import Team from './Team';

const Teams = ({teams}) => (
  <div className="teams">
    <h1 className="teams__title">Teams</h1>

    { teams.map( team => (
        <Team key={`team-${team.id}`}
        letter={team.name[0].toUpperCase()}
        id={team.id}
        name={team.name} /> ))}

  </div>
);

export default Teams;