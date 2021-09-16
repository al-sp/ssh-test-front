import React from 'react';
import {Table} from 'react-bootstrap';
import TableRow from './TableRow';

function TableComponent(props) {
  const {
    rows,
    removeRow,
    addDataItem,
    updateDataItem,
    addRow,
  } = props;

  return (
    <div style={{width: '100%'}}>
      <Table striped bordered hover size="sm">
        <thead style={{position: 'sticky', top: 0, zIndex: 1020}}>
          <tr>
            <th>#</th>
            <th>Host</th>
            <th>Port</th>
            <th>Username</th>
            <th>Password</th>
            <th>Private Key Path</th>
            <th></th>
          </tr>
        </thead>
        <tbody>

          <TableRow
            index={null}
            emptyRow={true}
            addDataItem={addDataItem}
            addRow={addRow}
          />

          {
          rows && rows.length ? rows.map((item, i) => {
            return (
              <TableRow
                key={item?.host + i}
                item={item}
                index={i}
                addDataItem={addDataItem}
                removeRow={removeRow}
                updateDataItem={updateDataItem}
              />
            );
          }) : (
            <></>
          )
          }
        </tbody>
      </Table>
    </div>
  );
}

export default TableComponent;
