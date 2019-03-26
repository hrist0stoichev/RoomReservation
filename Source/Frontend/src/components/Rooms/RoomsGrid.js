import React from 'react';
import { AgGridReact } from 'ag-grid-react';

const columnDefs = [
  { headerName: "Number", field: "Number", sortable: true, filter: true },
  { headerName: "Capacity", field: "Capacity", sortable: true, filter: true },
  { headerName: "RA Room", field: "IsRA", sortable: true, filter: true },
  { headerName: "Sex", field: "IsMale", sortable: true, filter: true },
  { headerName: "Reserved", field: "IsReserved", sortable: true, filter: true },
  { headerName: "Comments", field: "Comments", sortable: true, filter: true },
];

class RoomsGrid extends React.Component {
  componentWillMount() {
    this.props.fetchRooms(this.props.sk, this.props.floor);
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
          columnDefs={columnDefs}
          rowData={this.props.rooms}
          paginationAutoPageSize={true}
          pagination={true}>
        </AgGridReact>
      </div>
    );
  }
};

export default RoomsGrid;
