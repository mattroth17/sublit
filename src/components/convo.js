import { React, Component } from 'react';
import { connect } from 'react-redux';
import { getConversation, sendChatMessage } from '../actions';

class Convo extends Component {
  componentDidMount() {
    this.props.getConversation();
  }

  render() {
    return <div>Hello</div>;
  }
}
const mapStateToProps = (reduxState) => ({
  user: reduxState.auth.user,
  conversation: reduxState.chat.conversation,
});

export default connect(mapStateToProps, { getConversation, sendChatMessage })(Convo);
