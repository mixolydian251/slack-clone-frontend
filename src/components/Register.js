import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const createUserMutation = gql`
        mutation register($username: String!, $email: String!, $password: String!) {
          register(username: $username, email: $email, password: $password){
            ok
            errors {
              path
              message
            }
          }        
        }`;

class Register extends React.Component {

  state = {
    username: '',
    email: '',
    password: '',
    verifyPassword: '',
    passwordDoesNotMatch: false
  };

  onUsernameChange = e => {
    const username = e.target.value;
    this.setState({username})
  };

  onEmailChange = e => {
    const email = e.target.value;
    this.setState({email})
  };

  onPasswordChange = e => {
    const password = e.target.value;
    this.setState({password})
  };

  onVerifyPasswordChange = e => {
    const verifyPassword = e.target.value;
    this.setState({verifyPassword});
  };

  createUser = async (register) => {
    if (this.state.password !== this.state.verifyPassword) {
      this.setState({passwordDoesNotMatch: true});
    }
    else {
      this.setState({passwordDoesNotMatch: false});
      const response = await register({
        variables: {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
        }
      });

      console.log(response);

      if (response.data.register.ok) {
        this.props.history.push("/")
      }
      else {
        console.log(response.data.register.ok);
      }
    }
  };

  render() {
    return (
      <Mutation mutation={createUserMutation}>
        { (register, { data }) => (

          <div className="register">

            <h1 className="register__title">Create an account</h1>

            <div className="register__form">

              <div>
                <input  name="username"
                        placeholder="Username"
                        type="text"
                        className="register__form--item"
                        value={this.state.username}
                        onChange={this.onUsernameChange}/>

                { // display error if username is already taken
                  data && !data.register.ok && data.register.errors[0].path === 'username'
                  && <p className="register__form--error">{data.register.errors[0].message}</p> }
              </div>

              <div>
                <input  name="email"
                        placeholder="Email"
                        type="text"
                        className="register__form--item"
                        value={this.state.email}
                        onChange={this.onEmailChange}/>

                { // display error if username is already taken
                  data && !data.register.ok && data.register.errors[0].path === 'email'
                  && <p className="register__form--error">{data.register.errors[0].message}</p> }
              </div>

              <div>
                <input  name="password"
                        placeholder="Password"
                        type="password"
                        className="register__form--item"
                        value={this.state.password}
                        onChange={this.onPasswordChange}/>

                { // display error if password does not meet requirements
                  data && !data.register.ok && data.register.errors[0].path === 'password'
                  && <p className="register__form--error">{data.register.errors[0].message}</p> }
              </div>

              <div>
                <input  name="verify password"
                        placeholder="Re-type Password"
                        type="password"
                        className="register__form--item"
                        value={this.state.verifyPassword}
                        onChange={this.onVerifyPasswordChange}/>

                { // display error if passwords do not match
                  this.state.passwordDoesNotMatch &&
                  <p className="register__form--error">Passwords do not match.</p> }
              </div>

              <button className="register__form--button"
                      onClick={() => {this.createUser(register)}}>
                Create Account
              </button>

            </div>
          </div>
        )}
      </Mutation>
    )
  }
}

export default Register;