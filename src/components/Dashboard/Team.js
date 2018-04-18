import React from 'react';

const Team = ({letter, name, changeTeam}) => (
    <button className="tooltip team"
            onClick={() => changeTeam(name)}>
      <h1 className="team__letter">{letter}</h1>
      <span className="tooltip__text">{name}</span>
    </button>
);

export default Team;