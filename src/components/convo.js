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

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.onSendMessage();
    }
  }

  renderMessages = () => {
    if (!this.props.messages || isEmpty(this.props.messages)) {
      return <div className="no-messages">Send a message to get the conversation going</div>;
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
          <div className="convo-top">
            <h2 className="conversation-with">{this.props.conversation.firstName}</h2>
          </div>
          <div className="convo-bottom">
            <div className="messages">
              {this.renderMessages()}
            </div>
            <div className="new-message-bar">
              <input className="send-message" onChange={this.onMessageChange} placeholder="Message" value={this.state.newMessage} onKeyPress={this.handleKeyPress} />
              <i role="button" tabIndex={0} aria-label="Send Message" className="fas fa-paper-plane" onClick={this.onSendMessage} />
            </div>
          </div>

        </div>
      );
    }
    return (
      <div className="conversation">
        <div className="place-holder">Loading...</div>
      </div>
    );
  }
}
const mapStateToProps = (reduxState) => ({
  user: reduxState.auth.user,
  conversation: reduxState.chat.conversation,
  messages: reduxState.chat.messages,
});

export default connect(mapStateToProps, { getConversation, sendChatMessage })(Convo);
