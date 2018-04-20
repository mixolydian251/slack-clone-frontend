import React from 'react';
import { Link } from 'react-router-dom';

const Team = ({ letter, name, id, previewTeamName }) => (
    <Link to={`/dashboard/${id}`}
          className="team"
          onMouseOver={() => previewTeamName(name)}>
      <h1 className="team__letter">{letter}</h1>
    </Link>
);

export default Team;