import { React, Component } from 'react';
import { connect } from 'react-redux';
import { getConversations } from '../actions';

class Convos extends Component {
  componentDidMount() {
    this.props.getConversations();
  }

  render() {
    return <div>Hello</div>;
  }
}
const mapStateToProps = (reduxState) => ({
  user: reduxState.auth.user,
  conversations: reduxState.chat.conversations,
});

export default connect(mapStateToProps, { getConversations })(Convos);
