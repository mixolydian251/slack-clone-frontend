import gql from 'graphql-tag';

export const getUsers = gql`
  query {
    getUser {
      username
    }
  }
`;

export const allUsers = gql`
  query {
    allUsers {
      id
      username
      email
    }
  }
`;

export const allTeams = gql`
  query {
    allTeams {
      id
      name
      channels {
        id
        name
      }
    }
  }
`;

export const getChannels = gql`
  query getChannels($teamId: Int!){
    getChannels(teamId: $teamId) {
      id
      name
    }
  }
`;

export const dashboardQuery = gql`
  query {
    getUser{
      username
    }
    allUsers {
      id
      username
      email
    }
    allTeams{
      id
      name
      channels {
        id
        name
      }
    }
  }
`;