import React from 'react';
import { Query } from 'react-apollo';
import gql from "graphql-tag";

const getUserQuery = gql`
  query getUser($id: Int!) {
    dog(id: $id) {
      username
      email
    }
  }
`;

const Dashboard = () => (
  <Query
    query={getUserQuery}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error!: {error}</p>;

      return (
        <div className="dashboard">



        </div>
      )
    }}
  </Query>
);

export default Dashboard;