import React from 'react';
import { Query } from 'react-apollo';
import gql from "graphql-tag";

const GET_USERS = gql`
      {
        allUsers {
          username
          email
        }
      }
    `;

const HomePage = () => (
  <Query
    query={GET_USERS}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error!: {error}</p>;

      return (
        <div style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column'}}>

          <div style={{display: 'flex', justifyContent: 'flex-start'}}>
            <h1 style={{width: '300px', padding: '0 8px', textDecoration: 'underline'}}>Username</h1>
            <h1 style={{width: '300px', padding: '0 8px', textDecoration: 'underline'}}>Email</h1>
          </div>

          {data.allUsers.map(({ id, username, email }) => (
            <div key={username} style={{display: 'flex', justifyContent: 'flex-start'}}>
              <p style={{width: '300px', padding: '0 8px', fontSize: '16px'}}>{username}</p>
              <p style={{width: '300px', padding: '0 8px', fontSize: '16px'}}>{email}</p>
            </div>
          ))}
        </div>
      )
    }}
  </Query>
);

export default HomePage;