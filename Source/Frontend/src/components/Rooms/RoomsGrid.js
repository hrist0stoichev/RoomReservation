import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Redirect } from 'react-router-dom';
import { Button, Input, ButtonGroup } from 'reactstrap';
import config from '../../config';
import { CSVLink } from "react-csv";

class RoomsGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      redirectTo: ''
    };

    this.handleDetails = this.handleDetails.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.joinRoom = this.joinRoom.bind(this);

    this.columnDefs = [
      { headerName: "Number", field: "Number", sortable: true, filter: true, width: 115 },
      { headerName: "Capacity", field: "Capacity", sortable: true, filter: true, width: 120 },
      { headerName: "Residents Count", field: "ResidentsCount", sortable: true, filter: true, },
      { headerName: "RA Room", field: "IsRA", sortable: true, filter: true, width: 125,
        cellRendererFramework: params => {
          return <Input type="checkbox" disabled={true} checked={params.data.IsRA} style={{ margin: '1.05rem 0 0 0' }} />
        }
      },
      { headerName: "Sex", field: "IsMale", sortable: true, filter: true, width: 95,
        cellRendererFramework: params => {
          if (params.data.isMale !== null) {
            return params.data.IsMale ? 'Male' : 'Female';
          } else {
            return '';
          }
        }
      },
      { headerName: "Reserved", field: "IsReserved", sortable: true, filter: true, width: 125,
        cellRendererFramework: params => {
          return <Input type="checkbox" disabled={true} checked={params.data.IsReserved} style={{ margin: '1.05rem 0 0 0' }} />
        }
      },
      { headerName: "Apartment Room Number", field: "ApartmentRoomNumber", sortable: true, filter: true },
      { headerName: 'Operations', pinned: 'right',
        cellRendererFramework: params => {
            return (
              <ButtonGroup size="sm">
                {this.props.userRole === 'Admin' ?
                    <div>
                      <Button onClick={() => this.handleDetails(params.data.Number)}>Details</Button>
                      <Button onClick={() => this.handleDelete(params.data.Number)}>Delete</Button>
                    </div>
                   :
                   <Button onClick={() => this.joinRoom(params.data.Number)}>Join</Button>
                }
              </ButtonGroup>
            );
        }
      }
    ];
  }

  handleDetails(roomNumber) {
    this.setState({
      redirect: true,
      redirectTo: `/rooms/single?roomNumber=${roomNumber}`,
    });
  }

  handleDelete(number) {
    if (window.confirm('Are you sure?')) {
      fetch(`${config.endpoint}/rooms/${number}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.accessToken}`,
        },
      })
        .then(() => this.props.fetchRooms())
        .catch((error) => {
          this.props.showError('Could not delete room.');
          console.log(error);
        });
    }
  }

  joinRoom(number) {
    fetch(`${config.endpoint}/rooms/${number}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.accessToken}`,
      },
    })
      .then(() => this.props.fetchRooms())
      .catch((error) => {
        this.props.showError('Could not join room.');
        console.log(error);
      });
  }

  componentWillMount() {
    this.props.fetchRooms(this.props.sk, this.props.floor);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirectTo} />;
    } else {
      return (
        <div 
        className="ag-theme-material"
        style={{ 
        height: '500px', 
        width: '100%' }} 
        >
          <div style={{ width: '100%', textAlign: 'right', marginBottom: '1em' }}>
            <CSVLink data={this.props.rooms} filename="rooms-export.csv">
              <svg viewBox="0 0 512 512" style={{ width: '21px' }}>
                <path id="statement" d="M339.527,370.312H171.505v-30h168.022V370.312z M339.495,314.896h-167.99v-30h167.99V314.896zM339.495,259.562h-167.99v-30h167.99V259.562z M297.818,90v85.75h85.864V422H128.317V90H297.818 M322.818,50H88.317v412h335.365V150.75L322.818,50z"/>
              </svg>
              <div style={{ display: 'inline-block', position: 'relative', top: '2px', color: 'black' }}>Export CSV</div>
            </CSVLink>
          </div>
          <AgGridReact
            columnDefs={this.columnDefs}
            rowData={this.props.rooms}
            paginationPageSize={30}
            pagination={true}>
          </AgGridReact>
        </div>
      );
    }
  }
};

export default RoomsGrid;
