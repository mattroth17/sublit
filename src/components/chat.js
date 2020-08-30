import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'underscore';
import { getConversations, getConversation, fetchUser } from '../actions';
import Convo from './convo';
import './css_files/chat.scss';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentConvo: (!isEmpty(this.props.conversation) ? this.props.conversation : {}),
      intervalID: 0,
    };
  }

  componentDidMount() {
    this.props.getConversations(this.props.email);
    this.props.fetchUser(this.props.email);
    const intervalID = setInterval(() => {
      if (!isEmpty(this.state.currentConvo) && !isEmpty(this.props.user)) {
        this.props.getConversation(this.state.currentConvo, this.props.user.email, this.state.currentConvo.email);
      } else if (!isEmpty(this.props.conversation)) {
        this.setState({ currentConvo: this.props.conversation });
      } else if (this.props.conversations.length > 0) {
        this.setState({ currentConvo: this.props.conversations[0] });
      }
    }, 1000);
    this.setState({ intervalID });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalID);
  }

  changeCurrentConvo = (c) => {
    this.props.getConversation(c, this.props.user.email, c.email);
    this.setState({ currentConvo: c });
  }

  // eslint-disable-next-line consistent-return
  renderConversations = () => {
    if (isEmpty(this.props.user)) {
      return <div className="place-holder">Loading...</div>;
    } else if (this.props.user.conversations.length === 0) {
      return <div className="place-holder">You have no conversations. Find a listing you like and start a conversation from there.</div>;
    } else if (this.props.conversations.length === 0) {
      return <div className="place-holder">Loading...</div>;
    }

    return this.props.conversations.map((c, i) => {
      let isSelected = 'not-selected';
      if ((!isEmpty(this.state.currentConvo) && this.state.currentConvo.email === c.email) || (isEmpty(this.state.currentConvo) && i === 0)) {
        isSelected = 'selected';
      }
      return (
        <div tabIndex={0} role="button" className={`convo_preview ${isSelected} noSelect`} key={c.email} onClick={() => this.changeCurrentConvo(c)}>
          <div>Chat with: {c.firstName}</div>
          <div>Email: {c.email}</div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="chat">
        <div className="convos">
          <h2 className="convos-title">Conversations</h2>
          <div className="convo-previews">
            {this.renderConversations()}
          </div>
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

export default connect(mapStateToProps, { getConversations, getConversation, fetchUser })(Chat);
