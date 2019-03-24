import React from 'react';
import Loader from '../../components/Loader';
import { AgGridReact } from 'ag-grid-react';

const columnDefs = [
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
];

const StudentsGrid = (props) => {
  if (props.isLoading) {
    return (
      <Loader />
    );
  } else {
    return (
        <div 
        className="ag-theme-balham"
        style={{ 
        height: '500px', 
        width: '100%' }} 
        >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={props.students}>
        </AgGridReact>
      </div>
    );
  }
};

export default StudentsGrid;
