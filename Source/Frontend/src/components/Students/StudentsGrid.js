import React from 'react';
import Loader from '../../components/Loader';
import { AgGridReact } from 'ag-grid-react';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class StudentsGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      redirectTo: '',
    };

    this.columnDefs = [
      { headerName: "First Name", field: "FirstName", sortable: true, filter: true },
      { headerName: "Middle Name", field: "MiddleName", sortable: true, filter: true },
      { headerName: "Last Name", field: "LastName", sortable: true, filter: true },
      { headerName: "Registration Time", field: "RegistrationTime", sortable: true, filter: true },
      { headerName: "Credit Hours", field: "CreditHours", sortable: true, filter: true },
      { headerName: "Email", field: "Email", sortable: true, filter: true },
      { headerName: "Sex", field: "IsMale", sortable: true, filter: true },
      { headerName: "RA", field: "IsRa", sortable: true, filter: true },
      { headerName: "Room Confirmed", field: "IsRoomConfirmed", sortable: true, filter: true },
      { headerName: "Banned", field: "IsBanned", sortable: true, filter: true },
      { headerName: "On Campus", field: "IsOnCampus", sortable: true, filter: true },
      { headerName: "Deposit Paid", field: "IsDepositPaid", sortable: true, filter: true },
      { headerName: "Comments", field: "Comments", sortable: true, filter: true },
      { headerName: "Room Number", field: "CurrentRoomNumber", sortable: true, filter: true },
      { headerName: 'Operations', 
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
