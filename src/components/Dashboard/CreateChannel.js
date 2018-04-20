import React from 'react';
import gql from 'graphql-tag'
import onClickOutside from "react-onclickoutside";
import { Mutation } from 'react-apollo';

const createChannelMutation = ( gql`
 mutation createChannel($name: String!, $teamId: Int!, $isPublic: Boolean!) {
  createChannel(name: $name , teamId: $teamId, public: $isPublic){
    ok
    channel {
      id
      teamId
      name
      public
    }
  }
}`);

class CreateChannel extends React.Component{

  state = {
    name: '',
    nameError: false,
    teamId: this.props.teamId,
    isPublic: false,
    submitError: false,
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({[name]: value})
  };

  onCheckboxChange = e => {
    const { checked } = e.target;
    this.setState({ isPublic: !!checked })
  };

  handleClickOutside = evt => {
    this.props.closeModal()
  };

  onCreateChannel = async (e, createChannel) => {
    e.preventDefault();
    const { name, teamId, isPublic } = this.state;

    if (!name) {
      this.submitError = true;
    }
    else {

      let response = null;

      console.log({
        teamId: Number(teamId),
        name,
        isPublic
      });

      try {
        response = await createChannel({
          variables: {
            teamId: Number(teamId),
            name,
            isPublic
          }
        });
      }
      catch (err) {
        this.props.history.push("/login");
        return
      }

      const { ok, channel } = response.data.createChannel;

      if (ok) {
        this.props.pushNewChannel(channel);
        this.props.closeModal();
        this.props.history.push(`/dashboard/${teamId}/${channel.id}`);
      }
    }
  };

  render(){
    return(

      <Mutation mutation={createChannelMutation} >
        {(createChannel, { data }) => (

          <div >
            <form className="modal__form"
                  onSubmit={ (e) => {this.onCreateChannel(e, createChannel) }}>

              <div>
                <input  name="name"
                        placeholder="Channel Name"
                        type="text"
                        autoComplete="true"
                        className="modal__form--item"
                        value={this.name}
                        onChange={this.onChange}/>
              </div>

              <div>
                <label>Make this channel public?</label>
                <input type="checkbox"
                       name="isPublic"
                       checked=""
                       onChange={this.onCheckboxChange} />
              </div>

              <button className="modal__form--button"
                      type="submit"
              >
                Create Channel
              </button>

              { // Display field left blank Error
                this.submitError &&
                <p className="modal__form--error">Please enter a Channel name</p> }

            </form>
          </div>

        )}
      </Mutation>
    )
  }
}

export default onClickOutside(CreateChannel);

