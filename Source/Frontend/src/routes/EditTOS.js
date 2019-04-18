import React, { Component } from 'react';
import MainLayout from '../components/MainLayout';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { Button } from 'reactstrap';
import {stateToHTML} from 'draft-js-export-html';
import config from '../config';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import IErrorHandler from '../components/ErrorHandler';

class EditTOS extends Component {
  constructor(props) {
    super(props);

    this.state = {editorState: EditorState.createEmpty()};
    this.ErrorHandler = new IErrorHandler('edit contract', this.props.showError);
  }

  componentWillMount() {
    fetch(`${config.endpoint}/contract`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.auth.accessToken}`,
      }
    })
      .then(res => res.json())
      .then(res => this.setState({ editorState: EditorState.createWithContent(res.ContractContent) }))
      .catch(error => console.log(error));
  }

  save = () => {
    fetch(`${config.endpoint}/contract`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.auth.accessToken}`,
      },
      body: JSON.stringify({
        ContractContent: stateToHTML(this.state.editorState.getCurrentContent())
      })
    })
      .then(res => {
        if (!res.ok) throw res;
        return res.json();
      })
      .then(() => this.setState({ redirectToRooms: true }))
      .catch(error => this.ErrorHandler.catchStep(error))
      .then(error => this.ErrorHandler.thenStep(error));
  }

  onChange = (editorState) => this.setState({editorState});

  render() {
    return (
      <MainLayout
        title="Edit Contract"
        secondaryNav={[]}
      >
        <Editor 
          editorState={this.state.editorState}
          onEditorStateChange={this.onChange}
          editorStyle={editorStyle}
        />
        <Button onClick={this.save} color="primary">Save Changes</Button>
      </MainLayout>
    );
  }
}

const editorStyle = {
  height: '500px',
  border: '1px solid #e5e5e5',
  lineHeight: 1.1
}

export default EditTOS;