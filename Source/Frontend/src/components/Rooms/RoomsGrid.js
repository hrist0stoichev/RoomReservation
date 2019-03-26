import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';

class RoomsGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      redirectTo: ''
    };

    this.handleDetails = this.handleDetails.bind(this);

    this.columnDefs = [
      { headerName: "Number", field: "Number", sortable: true, filter: true },
      { headerName: "Capacity", field: "Capacity", sortable: true, filter: true },
      { headerName: "RA Room", field: "IsRA", sortable: true, filter: true },
      { headerName: "Sex", field: "IsMale", sortable: true, filter: true },
      { headerName: "Reserved", field: "IsReserved", sortable: true, filter: true },
      { headerName: "Comments", field: "Comments", sortable: true, filter: true },
      { headerName: 'Operations', 
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
