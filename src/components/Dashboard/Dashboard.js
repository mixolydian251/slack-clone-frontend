import React from 'react';
import { Query } from 'react-apollo';
import gql from "graphql-tag";

import Channels from './Channels';
import Header from './Header'
import Messages from './Messages'
import SendMessage from './SendMessage'
import Teams from './Teams'



class Dashboard extends React.Component {

  render(){
    return(
      <div className="dashboard">
        <Teams/>
        <Channels/>
        <Header/>
        <Messages/>
        <SendMessage/>
      </div>
    )
  }
}

export default Dashboard;



// const getUserQuery = gql`
//   query {
//     getUser {
//       username
//       email
//     }
//   }
// `;

// const Dashboard = () => (
//   <Query query={getUserQuery}>
//     {({ loading, error, data }) => {
//
//       if (loading) return <p>Loading...</p>;
//       if (error) return <p>Error!: {error}</p>;
//
//       return (
//         <div className="dashboard">
//           <h1>Welcome, {data.getUser.username}!</h1>
//           <h1>Your email is {data.getUser.email}</h1>
//         </div>
//       )
//     }}
//   </Query>
// );