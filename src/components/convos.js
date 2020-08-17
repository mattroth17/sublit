import { React, Component } from 'react';
import { connect } from 'react-redux';
import { getConversations } from '../actions';



const mapStateToProps = (reduxState) => ({
  user: reduxState.auth.user,
  conversations: reduxState.chat.conversations,
});

export default connect(mapStateToProps, { getConversations, getConversation, sendChatMessage })(Chat);