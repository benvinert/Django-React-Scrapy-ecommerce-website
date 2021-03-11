import React,{useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';

const columns = [
  { field: 'id', headerName: 'email', width: 150 },
  { field: 'name', headerName: 'name', width: 120 },
  { field: 'birthday',headerName: 'birthday',width: 130},
  { field: 'email',headerName: 'id',width: 130},
  {
    field: 'is_active',
    headerName: 'is_active',
    width: 130,
  },
];



export default function TableUsers({users,setSelectionModel,selectionModel}) {

  var rows = [
        { id: "ben", name: 'Snow', birthday: "das",is_active : "dsa",email : "dsadsa" },
        { id: "danie@", name: 'Sno23w', birthday: "das4",is_active : "4dsa",email : "dsadsa" },
      ];

  rows = users;

  return (
    <div style={{ height: 400, width: '100%',marginTop : "2rem" }}>
      <DataGrid rows={rows} columns={columns} checkboxSelection onSelectionModelChange={(newSelection) => {
          console.log(newSelection)
          setSelectionModel(newSelection.selectionModel);
        }}
        selectionModel={selectionModel}/>
    </div>
  );
}
