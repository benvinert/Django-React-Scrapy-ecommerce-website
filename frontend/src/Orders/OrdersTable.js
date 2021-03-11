import React,{ useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useHistory } from 'react-router';



const columns = [
  { field: 'orderNumber', headerName: 'Order Number', width: 150 },
  { field: 'total', headerName: 'Total', width: 150 },
  { field: 'address', headerName: 'Address', width: 150 },
  { field: 'shipping', headerName: 'Shipping', width: 150 },
];

export const OrdersTable = ({orders}) => {
  const { push } = useHistory();
  const selectOrder = (rowData) =>
  {
    push("seeorderbyid=" + rowData.row.orderNumber)
  }

  console.log("Products Orders table" , orders)
  let rows = []
  orders.map((eachOrder,index) => rows.push({id : index, orderNumber : eachOrder.orderNumber,total : eachOrder.total + " $", address : eachOrder.address,shipping : eachOrder.shipping + " $"}))

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} onRowClick={(params) => selectOrder(params)}/>
    </div>
  );
}