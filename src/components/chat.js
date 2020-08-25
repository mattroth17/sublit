import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'underscore';
import { getConversations, getConversation } from '../actions';
import Convo from './convo';

class Chat extends Component {
  componentDidMount() {
    this.props.getConversations(this.props.email);
  }

  // eslint-disable-next-line consistent-return
  renderConversations = () => {
    if (this.props.user.conversations.length === 0) {
      return <div>You have no conversations</div>;
    } else if (this.props.conversations.length === 0) {
      return <div>Loading...</div>;
    }

    return this.props.conversations.map((convo) => {
      let selected = '';
      if (!isEmpty(this.props.conversation) && this.props.conversation.email === convo.email) {
        selected = 'selected';
      }
      return (
        <div tabIndex={0} role="button" className={`convo_preview ${selected}`} key={convo.email} onClick={() => this.props.getConversation(convo, this.props.user.email, convo.email)}>
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
  conversation: reduxState.chat.conversation,
});

export default connect(mapStateToProps, { getConversations, getConversation })(Chat);
