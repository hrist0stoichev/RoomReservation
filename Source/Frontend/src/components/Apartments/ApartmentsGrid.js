import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Button } from 'reactstrap';

class ApartmentsGrid extends React.Component {
  constructor(props) {
    super(props);

    this.columnDefs = [
      { headerName: "Room #1", field: "room1", sortable: true, filter: true },
      { headerName: "Room #2", field: "room2", sortable: true, filter: true },
      { headerName: "Sex", field: "IsMale", sortable: true, filter: true, width: 95,
        cellRendererFramework: params => {
          if (params.data.isMale !== null) {
            return params.data.IsMale ? 'Male' : 'Female';
          } else {
            return '';
          }
        }
      },
      { headerName: 'Operations', pinned: 'right',
        cellRendererFramework: params => {
            return (
              <div>
                <Button size="sm" onClick={() => this.handleDetails(params.data.Id)}>Details</Button>
                <Button size="sm" onClick={() => this.handleDelete(params.data.Id)}>Delete</Button>
              </div>
            );
        }
      }
    ];
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
          columnDefs={this.columnDefs}
          rowData={this.props.apartments}
          paginationAutoPageSize={true}
          pagination={true}>
        </AgGridReact>
      </div>
    );
  }
};

export default ApartmentsGrid;
