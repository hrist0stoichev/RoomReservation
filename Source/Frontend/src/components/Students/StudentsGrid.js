import React from 'react';
import Loader from '../../components/Loader';
import { AgGridReact } from 'ag-grid-react';
import { Button, Input, ButtonGroup } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import config from '../../config';
import { CSVLink } from "react-csv";

class StudentsGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      redirectTo: '',
    };

    this.columnDefs = [
      { headerName: "Student ID", field: "Id", sortable: true, filter: true, width: 135 },
      { headerName: "Name", field: 'FirstName', sortable: true, filter: true,
        cellRendererFramework: params => {
          return `${params.data.FirstName} ${params.data.MiddleName ? params.data.MiddleName : ''} ${params.data.LastName}`;
        }
      },
      { headerName: "Room Number", field: "CurrentRoomNumber", sortable: true, filter: true, width: 155 },
      { headerName: "Registration Time", field: "RegistrationTime", sortable: true, filter: true,
        cellRendererFramework: params => {
          if (params.data.RegistrationTime !== null) {
            return params.data.RegistrationTime.replace('T', ' ');
          } else {
            return '';
          }
        }
      },
      { headerName: "Comments", field: "Comments", sortable: true, filter: true },
      { headerName: "RA", field: "IsRA", sortable: true, filter: true, width: 90,
        cellRendererFramework: params => {
          return <Input type="checkbox" disabled={true} checked={params.data.IsRA} style={{ margin: '1.05rem 0 0 0' }} />
        }
      },
      { headerName: "Email", field: "Email", sortable: true, filter: true },
      { headerName: "Sex", field: "IsMale", sortable: true, filter: true, width: 95,
        cellRendererFramework: params => {
          if (params.data.isMale !== null) {
            return params.data.IsMale ? 'Male' : 'Female';
          } else {
            return '';
          }
        }
      },
      { headerName: "On Campus", field: "IsOnCampus", sortable: true, filter: true,  width: 140,
        cellRendererFramework: params => {
          return <Input type="checkbox" disabled={true} checked={params.data.IsOnCampus} style={{ margin: '1.05rem 0 0 0' }} />
        }
      },
      { headerName: "Credit Hours", field: "CreditHours", sortable: true, filter: true, width: 150 },
      { headerName: 'Operations', pinned: 'right', width: 150,
        cellRendererFramework: params => {
            return (
              <div>
                <ButtonGroup size="sm">
                  <Button onClick={() => this.handleDetails(params.data.Id)}>Details</Button>
                  <Button onClick={() => this.handleDelete(params.data.Id)}>Delete</Button>
                </ButtonGroup>
              </div>
            );
        }
      }
    ];

    this.handleDetails = this.handleDetails.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDetails(id) {
    this.setState({
      redirect: true,
      redirectTo: `/single-student?id=${id}`,
    });
  }

  handleDelete(id) {
    fetch(`${config.endpoint}/students/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.accessToken}`,
      },
    })
      .then(() => this.props.fetchStudents())
      .catch((error) => {
        this.props.showError('Could not delete student.');
        console.log(error);
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
          <div style={{ width: '100%', textAlign: 'right', marginBottom: '1em' }}>
            <CSVLink data={this.props.students} filename="students-export.csv">
              <svg viewBox="0 0 512 512" style={{ width: '21px' }}>
                <path id="statement" d="M339.527,370.312H171.505v-30h168.022V370.312z M339.495,314.896h-167.99v-30h167.99V314.896zM339.495,259.562h-167.99v-30h167.99V259.562z M297.818,90v85.75h85.864V422H128.317V90H297.818 M322.818,50H88.317v412h335.365V150.75L322.818,50z"/>
              </svg>
              <div style={{ display: 'inline-block', position: 'relative', top: '2px', color: 'black' }}>Export CSV</div>
            </CSVLink>
          </div>
          <AgGridReact
            columnDefs={this.columnDefs}
            rowData={this.props.students}
            paginationPageSize={30}
            pagination={true}>
          </AgGridReact>
        </div>
      );
    }
  }
};

export default StudentsGrid;
