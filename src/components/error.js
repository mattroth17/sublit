import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { clearError } from '../actions';

class Error extends Component {
  clearError = (event) => {
    this.props.clearError();
  }

  // used this site to implement modal: https://react-bootstrap.github.io/components/modal/
  render() {
    return (
      <Modal show={this.props.isError}>
        <Modal.Header>
          <Modal.Title>There was an Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.clearError}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  isError: reduxState.errors.isError,
  errorMessage: reduxState.errors.errorMessage,
});

export default connect(mapStateToProps, { clearError })(Error);
