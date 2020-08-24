import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getConversations, getConversation } from '../actions';
import Convo from './convo';

class Chat extends Component {
  componentDidMount() {
    this.props.getConversations(this.props.email);
  }

  // eslint-disable-next-line consistent-return
  renderConversations = () => {
    console.log('in chat');
    console.log(this.props.conversations);
    if (this.props.user.conversations.length === 0) {
      return <div>You have no conversations</div>;
    } else if (this.props.conversations.length === 0) {
      return <div>Loading...</div>;
    }
    return this.props.conversations.map((convo) => {
      return (
        <div tabIndex={0} role="button" className="convo_preview" key={convo.email} onClick={() => this.props.getConversation(convo, this.props.user.email, convo.email)}>
          <div>{convo.firstName}</div>
          <div>{convo.email}</div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="chat">
        <div className="convos">
          {this.renderConversations()}
        </div>
        <Convo />
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  email: reduxState.auth.email,
  user: reduxState.auth.user,
  conversations: reduxState.chat.conversations,
});

export default connect(mapStateToProps, { getConversations, getConversation })(Chat);
