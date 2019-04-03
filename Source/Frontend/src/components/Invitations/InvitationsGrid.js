import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Button, ButtonGroup } from 'reactstrap';
import config from '../../config';
import { CSVLink } from "react-csv";

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
        <div style={{ width: '100%', textAlign: 'right', marginBottom: '1em' }}>
            <CSVLink data={this.props.invitations} filename="invitations-export.csv">
              <svg viewBox="0 0 512 512" style={{ width: '21px' }}>
                <path id="statement" d="M339.527,370.312H171.505v-30h168.022V370.312z M339.495,314.896h-167.99v-30h167.99V314.896zM339.495,259.562h-167.99v-30h167.99V259.562z M297.818,90v85.75h85.864V422H128.317V90H297.818 M322.818,50H88.317v412h335.365V150.75L322.818,50z"/>
              </svg>
              <div style={{ display: 'inline-block', position: 'relative', top: '2px', color: 'black' }}>Export CSV</div>
            </CSVLink>
          </div>
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
