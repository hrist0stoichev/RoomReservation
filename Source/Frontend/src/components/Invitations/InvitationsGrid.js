import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Button, ButtonGroup } from 'reactstrap';
import config from '../../config';

class InvitationsGrid extends React.Component {
  constructor(props) {
    super(props);

    this.columnDefs = [
      { headerName: "From (Student ID)", field: "FromStudentId", sortable: true, filter: true },
      { headerName: "From (Student Name)", field: "FromStudentName", sortable: true, filter: true },
      { headerName: "To (Student ID)", field: "ToStudentId", sortable: true, filter: true },
      { headerName: "To (Student Name)", field: "ToStudentName", sortable: true, filter: true },
      { headerName: "Room Number", field: "RoomNumber", sortable: true, filter: true },
      { headerName: 'Operations', pinned: 'right',
        cellRendererFramework: params => {
            return (
              <ButtonGroup size="sm">
                <Button onClick={() => this.handleReject(params.data.Id)}>Reject</Button>
                <Button onClick={() => this.handleApprove(params.data.Id)}>Approve</Button>
              </ButtonGroup>
            );
        }
      }
    ];
  }

  handleReject(id) {
    fetch(`${config.endpoint}/invitations/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.accessToken}`,
      },
    })
      .then(() => this.props.fetchInvitations())
      .catch((error) => {
        this.props.showError('Could not reject invitation.');
        console.log(error);
      });
  }

  handleApprove(id) {
    fetch(`${config.endpoint}/invitations/${id}/accept`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.accessToken}`,
      },
    })
      .then(() => this.props.fetchInvitations())
      .catch((error) => {
        this.props.showError('Could not approve invitation.');
        console.log(error);
      });
  }

  render() {
    return (
      <div 
      className="ag-theme-material"
      style={{ 
      height: '500px', 
      width: '100%' }} 
      >
        <AgGridReact
          columnDefs={this.columnDefs}
          rowData={this.props.invitations}
          paginationAutoPageSize={true}
          pagination={true}>
        </AgGridReact>
      </div>
    );
  }
};

export default InvitationsGrid;
