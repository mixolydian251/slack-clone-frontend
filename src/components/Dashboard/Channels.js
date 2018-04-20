import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { getChannels } from "../../graphql/query"

const add = 'http://localhost:8080/images/add.svg';

const Channels = (props) => {
  const channel = (({id, name}) => (
    <Link to={`/dashboard/${props.teamId}/${id}`}
          className="sidebar__section--item"
          key={`channel-${id}`}>
      {name}
    </Link>
  ));

  return(
    <Query  query={ getChannels }
            variables={{teamId: props.teamId}}>

      {({loading, data}) => {

        if (loading) return null;

        if (data) {


          const { getChannels } = data;

          return(
            <div className="sidebar__section">
              <div className="sidebar__section--container">
                <h3 className="sidebar__section--title">Channels</h3>
                <button className="sidebar__section--button"
                        onClick={props.openModal}>
                  <img src={add} alt="add channel" className="sidebar__section--icon"/>
                </button>
              </div>
              {getChannels.map(channel)}
            </div>
          )
        }
      }}
    </Query>
  );
};

export default Channels;