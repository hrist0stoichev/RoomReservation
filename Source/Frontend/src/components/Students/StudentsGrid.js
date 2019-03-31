import React from 'react';
import Loader from '../../components/Loader';
import { AgGridReact } from 'ag-grid-react';
import { Button, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class StudentsGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      redirectTo: '',
    };

    this.columnDefs = [
      { headerName: "Name", field: 'FirstName', sortable: true, filter: true,
        cellRendererFramework: params => {
          return `${params.data.FirstName} ${params.data.MiddleName} ${params.data.LastName}`;
        }
      },
      { headerName: "Registration Time", field: "RegistrationTime", sortable: true, filter: true,
        cellRendererFramework: params => {
          return params.data.RegistrationTime.replace('T', ' ');
        }
      },
      { headerName: "Credit Hours", field: "CreditHours", sortable: true, filter: true, width: 150 },
      { headerName: "Email", field: "Email", sortable: true, filter: true },
      { headerName: "Sex", field: "IsMale", sortable: true, filter: true, width: 95,
        cellRendererFramework: params => {
          return params.data.IsMale ? 'Male' : 'Female';
        }
      },
      { headerName: "Room Number", field: "CurrentRoomNumber", sortable: true, filter: true, width: 155 },
      { headerName: "RA", field: "IsRa", sortable: true, filter: true, width: 90,
        cellRendererFramework: params => {
          return <Input type="checkbox" disabled={true} checked={params.data.IsRa} style={{ margin: '1.05rem 0 0 0' }} />
        }
      },
      { headerName: "Room Confirmed", field: "IsRoomConfirmed", sortable: true, filter: true, width: 169,
        cellRendererFramework: params => {
          return <Input type="checkbox" disabled={true} checked={params.data.IsRoomConfirmed} style={{ margin: '1.05rem 0 0 0' }} />
        }
      },
      { headerName: "Banned", field: "IsBanned", sortable: true, filter: true, width: 115,
        cellRendererFramework: params => {
          return <Input type="checkbox" disabled={true} checked={params.data.IsBanned} style={{ margin: '1.05rem 0 0 0' }} />
        }
      },
      { headerName: "On Campus", field: "IsOnCampus", sortable: true, filter: true,  width: 140,
        cellRendererFramework: params => {
          return <Input type="checkbox" disabled={true} checked={params.data.IsOnCampus} style={{ margin: '1.05rem 0 0 0' }} />
        }
      },
      { headerName: "Deposit Paid", field: "IsDepositPaid", sortable: true, filter: true, width: 145,
        cellRendererFramework: params => {
          return <Input type="checkbox" disabled={true} checked={params.data.IsDepositPaid} style={{ margin: '1.05rem 0 0 0' }} />
        }
      },
      { headerName: "Comments", field: "Comments", sortable: true, filter: true },
      { headerName: 'Operations', pinned: 'right', width: 125,
        cellRendererFramework: params => {
            return <Button size="sm" onClick={() => this.handleDetails(params.data.Id)}>Details</Button>;
        }
      }
    ];

    this.handleDetails = this.handleDetails.bind(this);
  }

  handleDetails(id) {
    this.setState({
      redirect: true,
      redirectTo: `/single-student?id=${id}`,
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirectTo} />
    }
    if (this.props.isLoading) {
      return (
        <Loader />
      );
    } else {
      return (
          <div 
          className="ag-theme-material"
          style={{ 
          height: '500px', 
          width: '100%' }} 
          >
          <AgGridReact
            columnDefs={this.columnDefs}
            rowData={this.props.students}
            paginationAutoPageSize={true}
            pagination={true}>
          </AgGridReact>
        </div>
      );
    }
  }
};

export default StudentsGrid;
