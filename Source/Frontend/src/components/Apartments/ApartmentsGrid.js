import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Button, ButtonGroup } from 'reactstrap';
import config from '../../config';
import { Redirect } from 'react-router-dom';
import { CSVLink } from "react-csv";

class ApartmentsGrid extends React.Component {
  constructor(props) {
    super(props);

    this.columnDefs = [
      { headerName: "Room #1", field: "Number", sortable: true, filter: true },
      { headerName: "Room #2", field: "ApartmentRoomNumber", sortable: true, filter: true },
      { headerName: "Sex", field: "IsMale", sortable: true, filter: true, width: 95,
        cellRendererFramework: params => {
          if (params.data.IsMale !== null) {
            return params.data.IsMale ? 'Male' : 'Female';
          } else {
            return '';
          }
        }
      },
      { headerName: "Capacity", field: "TotalCapacity", sortable: true, filter: true },
      { headerName: "Residents", field: "TotalResidentsCount", sortable: true, filter: true },
      { headerName: 'Operations', pinned: 'right',
        cellRendererFramework: params => {
            return (
              <ButtonGroup size="sm">
                <Button onClick={() => this.handleDetails(params.data.Number)}>Details</Button>
                <Button onClick={() => this.handleDelete(params.data.Number)}>Delete</Button>
              </ButtonGroup>
            );
        }
      }
    ];

    this.state = {
      redirect: false,
      redirectTo: '',
    }

    this.handleDetails = this.handleDetails.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDetails(number) {
    this.setState({
      redirect: true,
      redirectTo: `/apartments/details?number=${number}`,
    });
  }

  handleDelete(number) {
    fetch(`${config.endpoint}/rooms/apartments/${number}/detach`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.accessToken}`,
      },
    })
      .then(() => this.props.fetchApartments())
      .catch((error) => {
        this.props.showError('Could not delete student.');
        console.log(error);
      });
  }

  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirectTo} />;
    } else {
      return '';
    }
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
            <CSVLink data={this.props.apartments} filename="apartments-export.csv">
              <svg viewBox="0 0 512 512" style={{ width: '21px' }}>
                <path id="statement" d="M339.527,370.312H171.505v-30h168.022V370.312z M339.495,314.896h-167.99v-30h167.99V314.896zM339.495,259.562h-167.99v-30h167.99V259.562z M297.818,90v85.75h85.864V422H128.317V90H297.818 M322.818,50H88.317v412h335.365V150.75L322.818,50z"/>
              </svg>
              <div style={{ display: 'inline-block', position: 'relative', top: '2px', color: 'black' }}>Export CSV</div>
            </CSVLink>
          </div>
        {this.renderRedirect()}
        <AgGridReact
          columnDefs={this.columnDefs}
          rowData={this.props.apartments}
          paginationPageSize={30}
          pagination={true}>
        </AgGridReact>
      </div>
    );
  }
};

export default ApartmentsGrid;
