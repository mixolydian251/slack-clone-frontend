import React from 'react';
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo';
import { extendObservable } from 'mobx';
import { Observer } from 'mobx-react';

const loginMutation = gql`
        mutation login($email: String!, $password: String!) {
          login(email: $email, password: $password){
            ok
            token
            refreshToken
            errors {
              path
              message
            }
          }        
        }`;

class Login extends React.Component{

  constructor(props) {
    super(props);

    extendObservable(this, {
      email: '',
      emailError: false,
      password: '',
      passwordError: false,
      submitError: false,
    })
  }


  onChange = e => {
    const { name, value } = e.target;
    this[name] = value;
  };

  onLogin = async (login) => {
    const { email, password } = this;

    console.log("Hit Login");

    if (!this.state.email || !this.state.password){
      this.setState({submitError: true})
    }
    else {
      const response = await login({
        variables: {
          email,
          password,
        }
      });

      const status = response.data.login;

      if (status.ok) {
        this.props.history.push("/");
        console.log("Login Successful");
        console.log(status)
      }
    }
  };

  render(){
    return(

      <Mutation mutation={loginMutation}>
        {(login, { data }) => (

          <Observer>
            {() => (

              <div className="login">
                <h1 className="login__title">Login</h1>
                <div className="login__form">

                  <div>
                    <input  name="email"
                            placeholder="Email"
                            type="text"
                            autoComplete
                            className="login__form--item"
                            value={this.state.email}
                            onChange={this.onChange}/>

                    { // Display email Error
                      data && data.login.errors &&
                      <p className="login__form--error">
                        {data.login.errors[0].path === 'email' &&
                        data.login.errors[0].message }
                      </p> }
                  </div>

                  <div>
                    <input  name="password"
                            placeholder="Password"
                            type="password"
                            autoComplete
                            className="login__form--item"
                            value={this.state.password}
                            onChange={this.onChange}/>

                    { // Display password Error
                      data && data.login.errors &&
                      <p className="login__form--error">
                        {data.login.errors[0].path === 'password' &&
                        data.login.errors[0].message }
                      </p> }
                  </div>

                  <button className="login__form--button"
                          type="submit"
                          onClick={() => {this.onLogin(login)}}>
                    Login
                  </button>

                  { // Display field left blank Error
                    this.state.submitError &&
                    <p className="login__form--error">Enter your email and password</p> }

                </div>
              </div>

            )}

          </Observer>

        )}
      </Mutation>
    )
  }
}

export default Login;