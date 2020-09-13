import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { clearModal } from '../actions';

class MessageModal extends Component {
  clear = (event) => {
    this.props.clearModal();
  }

  // used this site to implement modal: https://react-bootstrap.github.io/components/modal/
  render() {
    const header = this.props.isError ? 'There was an Error' : 'Your Listing has Been Submitted';
    const message = this.props.isError ? `${this.props.errorMessage}` : `${this.props.otherMessage}`;
    const toShow = this.props.isError || this.props.isMessage;
    return (
      <Modal show={toShow}>
        <Modal.Header>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.clear}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  isError: reduxState.messageModal.isError,
  isMessage: reduxState.messageModal.isMessage,
  errorMessage: reduxState.messageModal.errorMessage,
  otherMessage: reduxState.messageModal.otherMessage,
});

export default connect(mapStateToProps, { clearModal })(MessageModal);
