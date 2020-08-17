import { React, Component } from 'react';
import { connect } from 'react-redux';
import { getConversations, getConversation, sendChatMessage } from '../actions';
import Convos from './convos';
import Convo from './convo';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // newMessage: '',
    };
  }

  componentDidMount() {
    this.props.getConversations();
  }

  renderConversations = () => {
    if (this.props.conversations) {
      this.props.conversations.map((convo) => {
        return (
          <div className="convo_preview" />
        );
      });
    }
    return <div>You have no conversations</div>;
  }

  render() {
    return (
      <div className="chat">
        <Convos />
        <Convo />
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  user: reduxState.auth.user,
  conversations: reduxState.chat.conversations,
  currentConversation: reduxState.chat.currentConversation,
});

export default connect(mapStateToProps, { getConversations, getConversation, sendChatMessage })(Chat);
