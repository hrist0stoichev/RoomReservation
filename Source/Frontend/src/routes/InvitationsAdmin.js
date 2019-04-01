import React from 'react';
import MainLayout from '../components/MainLayout';
import InvitationsGrid from '../components/Invitations/InvitationsGrid';

class InvitationsAdmin extends React.Component {
  componentWillMount() {
    this.props.fetchInvitations();
  }

  render() {
    return (
      <div id="invitations">
        <MainLayout
          title="Invitations"
          secondaryNav={[
          ]}
        >
          <InvitationsGrid invitations={this.props.invitations} accessToken={this.props.accessToken} fetchInvitations={this.props.fetchInvitations} showError={this.props.showError} />
        </MainLayout>
      </div>
    );
  }
}

export default InvitationsAdmin;
