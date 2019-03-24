import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const Alerts = (props) => {
  if (props.error) {
    return (
      <Modal isOpen={true} className="error-modal">
        <ModalHeader>Error</ModalHeader>
        <ModalBody>{props.errorMessage}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.hideError}>Close</Button>
        </ModalFooter>
      </Modal>
    );
  } else if (props.alert) {
    return (
      <Modal isOpen={true} className="alert-modal">
        <ModalBody>{props.alertMessage}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.hideAlert}>Close</Button>
        </ModalFooter>
      </Modal>
    );
  } else {
    return '';
  }
}

export default Alerts;
