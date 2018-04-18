import React from 'react';
import { Link } from 'react-router-dom';

const Team = ({ letter, name, id }) => (
    <Link to={`/dashboard/${id}`} className="tooltip team">
      <h1 className="team__letter">{letter}</h1>
      <span className="tooltip__text">{name}</span>
    </Link>
);

export default Team;