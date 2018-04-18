import React from 'react';
import Team from './Team';

const Teams = ({teams, changeTeam}) => (
  <div className="teams">
    <h1 className="teams__title">Teams</h1>

    { teams.map( team => (
        <Team id={`team-${team.id}`}
        letter={team.name[0].toUpperCase()}
        name={team.name}
        changeTeam={changeTeam}/> ))}

  </div>
);

export default Teams;