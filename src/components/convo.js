import { React, Component } from 'react';
import { connect } from 'react-redux';
import { getConversation, sendChatMessage } from '../actions';

class Convo extends Component {
  renderMessages = () => {

  }

  render() {
    return <div>Hello</div>;
  }
}
const mapStateToProps = (reduxState) => ({
  user: reduxState.auth.user,
  conversation: reduxState.chat.current,
});

export default connect(mapStateToProps, { getConversation, sendChatMessage })(Convo);
