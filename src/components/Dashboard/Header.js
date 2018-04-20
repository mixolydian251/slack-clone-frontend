import React from 'react';
import { Query } from 'react-apollo';
import { getChannels } from "../../graphql/query";

const Header = ({ channelId, teamId }) => {

  const channelName = ( channels ) => {
    try {
      return "#" + channels.filter( channel => {
        return channel.id === Number(channelId)
      })[0].name;
    }
    catch (error) {

    }
  };

  return (
    <Query query={getChannels} variables={{teamId}}>
      {({loading, error, data}) => {

        if (loading) return null;
        if (error) return <p>Error!: {error}</p>;

        if (data) {
          const { getChannels } = data;
          return (
            <div className="header">
              <h1 className="header__title">{channelName(getChannels)}</h1>
            </div>
          )
        }
      }}
    </Query>
  )
};

export default Header;