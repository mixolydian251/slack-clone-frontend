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

  onLogin = async (e, login) => {
    e.preventDefault();
    const { email, password } = this;

    if (!this.email || !this.password){
      this.submitError = true;
    }
    else {
      const response = await login({
        variables: {
          email,
          password,
        }
      });

      const {ok, token, refreshToken} = response.data.login;

      if (ok) {
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        this.props.history.push("/dashboard");
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
                <form className="login__form"
                      onSubmit={ (e) => {this.onLogin(e, login) }}>

                  <div>
                    <input  name="email"
                            placeholder="Email"
                            type="text"
                            autoComplete
                            className="login__form--item"
                            value={this.email}
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
                            value={this.password}
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
                          >
                    Login
                  </button>

                  { // Display field left blank Error
                    this.submitError &&
                    <p className="login__form--error">Enter your email and password</p> }

                </form>
              </div>

            )}

          </Observer>

        )}
      </Mutation>
    )
  }
}

export default Login;