import React from 'react';
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo';
import { extendObservable } from 'mobx';
import { Observer } from 'mobx-react';

const createTeamMutation = gql`
        mutation createTeam($name: String!) {
          createTeam(name: $name){
            ok
            team {
              name
            }
            errors{
              path
              message
            }
          }       
        }`;

class CreateTeam extends React.Component{

  constructor(props) {
    super(props);

    extendObservable(this, {
      name: '',
      nameError: false,
      submitError: false,
    })
  }

  onChange = e => {
    const { name, value } = e.target;
    this[name] = value;
  };

  onCreateTeam = async (e, createTeam) => {
    e.preventDefault();
    const { name } = this;

    if (!this.name) {
      this.submitError = true;
    }
    else {

      let response = null;

      try {
        response = await createTeam({
          variables: {
            name,
          }
        });
      }
      catch (err) {
        this.props.history.push("/login");
        return
      }

      const {ok} = response.data.createTeam;

      if (ok) {
        this.props.history.push("/");
        console.log(`You've created a team named "${name}"`)
      }
    }
  };

  render(){
    return(

      <Mutation mutation={createTeamMutation} >
        {(createTeam, { data }) => (

          <Observer>
            {() => (

              <div className="login">
                <h1 className="login__title">Create a Team</h1>
                <form className="login__form"
                      onSubmit={ (e) => {this.onCreateTeam(e, createTeam) }}>

                  <div>
                    <input  name="name"
                            placeholder="Team Name"
                            type="text"
                            autoComplete
                            className="login__form--item"
                            value={this.name}
                            onChange={this.onChange}/>

                    { // Display Team name Error
                      data && data.createTeam.errors &&
                      <p className="login__form--error">
                        {data.createTeam.errors[0].path === 'name' &&
                        data.createTeam.errors[0].message }
                      </p> }
                  </div>

                  <button className="login__form--button"
                          type="submit"
                  >
                    Create Team
                  </button>

                  { // Display field left blank Error
                    this.submitError &&
                    <p className="login__form--error">Please enter a Team name</p> }

                </form>
              </div>

            )}

          </Observer>

        )}
      </Mutation>
    )
  }
}

export default CreateTeam;