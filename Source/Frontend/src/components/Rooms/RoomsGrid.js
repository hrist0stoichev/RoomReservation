import React from 'react';
import Loader from '../Loader';
import { AgGridReact } from 'ag-grid-react';

const columnDefs = [
  { headerName: "Number", field: "Number", sortable: true, filter: true },
  { headerName: "Capacity", field: "Capacity", sortable: true, filter: true },
  { headerName: "RA Room", field: "IsRA", sortable: true, filter: true },
  { headerName: "Sex", field: "IsMale", sortable: true, filter: true },
  { headerName: "Reserved", field: "IsReserved", sortable: true, filter: true },
  { headerName: "Comments", field: "Comments", sortable: true, filter: true },
];

const RoomsGrid = (props) => {
  if (props.isLoading) {
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
          columnDefs={columnDefs}
          rowData={props.rooms}
          paginationAutoPageSize={true}
          pagination={true}>
        </AgGridReact>
      </div>
    );
  }
};

export default RoomsGrid;
