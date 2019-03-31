import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Redirect } from 'react-router-dom';
import { Button, Input } from 'reactstrap';

class RoomsGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      redirectTo: ''
    };

    this.handleDetails = this.handleDetails.bind(this);

    this.columnDefs = [
      { headerName: "Number", field: "Number", sortable: true, filter: true, width: 115 },
      { headerName: "Capacity", field: "Capacity", sortable: true, filter: true, width: 120 },
      { headerName: "Residents Count", field: "ResidentsCount", sortable: true, filter: true, },
      { headerName: "RA Room", field: "IsRA", sortable: true, filter: true, width: 125,
        cellRendererFramework: params => {
          return <Input type="checkbox" disabled={true} checked={params.data.IsRa} style={{ margin: '1.05rem 0 0 0' }} />
        }
      },
      { headerName: "Sex", field: "IsMale", sortable: true, filter: true, width: 95,
        cellRendererFramework: params => {
          return params.data.IsMale ? 'Male' : 'Female';
        }
      },
      { headerName: "Reserved", field: "IsReserved", sortable: true, filter: true, width: 125,
        cellRendererFramework: params => {
          return <Input type="checkbox" disabled={true} checked={params.data.IsReserved} style={{ margin: '1.05rem 0 0 0' }} />
        }
      },
      { headerName: "Apartment Room Number", field: "ApartmentRoomNumber", sortable: true, filter: true },
      { headerName: "Comments", field: "Comments", sortable: true, filter: true, width: 330},
      { headerName: 'Operations', pinned: 'right',
        cellRendererFramework: params => {
            return <Button size="sm" onClick={() => this.handleDetails(params.data.Number)}>Details</Button>;
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
          <AgGridReact
            columnDefs={this.columnDefs}
            rowData={this.props.rooms}
            paginationAutoPageSize={true}
            pagination={true}>
          </AgGridReact>
        </div>
      );
    }
  }
};

export default RoomsGrid;
