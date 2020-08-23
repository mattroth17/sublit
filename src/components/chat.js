import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getConversations, getConversation } from '../actions';
import Convo from './convo';

class Chat extends Component {
  componentDidMount() {
    this.props.getConversations(this.props.user.email);
  }

  renderConversations = () => {
    if (this.props.conversations) {
      this.props.conversations.map((convo) => {
        return (
          <div tabIndex={0} role="button" className="convo_preview" key={convo.id} onClick={() => this.props.getConversation(convo, this.props.user.email, convo.email)}>
            <div>{convo.firstName}</div>
            <div>{convo.email}</div>
          </div>
        );
      });
    }
    return <div>You have no conversations</div>;
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
  user: reduxState.auth.user,
  conversations: reduxState.chat.conversations,
});

export default connect(mapStateToProps, { getConversations, getConversation })(Chat);
