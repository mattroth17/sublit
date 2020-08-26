import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'underscore';
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
    this.setState({ newMessage: '' });
  }

  renderMessages = () => {
    if (!this.props.messages || isEmpty(this.props.messages)) {
      return <div>Send a message to get the conversation going</div>;
    }
    return this.props.messages.map((message) => {
      const messageType = (message.senderEmail === this.props.user.email) ? 'sent' : 'received';
      return (
        <div key={message.id} className={`message ${messageType}`}>{message.text}</div>
      );
    });
  }

  render() {
    if (!isEmpty(this.props.conversation)) {
      return (
        <div className="conversation">
          {this.renderMessages()}
          <input className="send-message" onChange={this.onMessageChange} placeholder="Message" value={this.state.newMessage} />
          <button className="send-message" type="submit" onClick={this.onSendMessage}>Send</button>
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
