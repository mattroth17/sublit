import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getConversation, sendChatMessage } from '../actions';

class Convo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newMessage: '',
    };
  }

  onMessageChange = (event) => {
    this.setState({ newMessage: event.target.value });
  }

  onSendMessage = () => {
    this.props.sendChatMessage(this.props.user.email, this.props.user.firstName, this.props.conversation.email, this.props.conversation.firstName, this.state.newMessage);
  }

  renderMessages = () => {
    this.props.messages.map((message) => {
      return (
        <div className="message">{message.text}</div>
      );
    });
  }

  render() {
    if (this.props.conversation) {
      return (
        <div className="conversation">
          {this.renderMessages()}
          <input onChange={this.onMessageChange} placeholder="Message" value={this.state.newMessage} />
          <button type="submit" onClick={this.onSendMessage}>Send</button>
        </div>
      );
    }
    return (
      <div> Select a conversation to see messages </div>
    );
  }
}
const mapStateToProps = (reduxState) => ({
  user: reduxState.auth.user,
  conversation: reduxState.chat.conversation,
  messages: reduxState.chat.messages,
});

export default connect(mapStateToProps, { getConversation, sendChatMessage })(Convo);
