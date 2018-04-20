import React from 'react';
import { Query } from 'react-apollo';
import { allUsers } from "../../graphql/query"

const Users = () => {

  const user = ({id, username}) =>  (
    <div className="sidebar__user" key={`user-${id}`}>
      <span className="sidebar__user--status"> </span>
      <span className="sidebar__user--name">{username}</span>
    </div>
  );

  return(
    <Query  query={ allUsers }>

      {({loading, data}) => {
        if (loading) return null;

        if (data) {
          const { allUsers } = data;

          return (
            <div className="sidebar__section">
              <h3 className="sidebar__section--title">Users</h3>
              {allUsers.map(user)}
            </div>
          )
        }
      }}
    </Query>
  );
};

export default Users;