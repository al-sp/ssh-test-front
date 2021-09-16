import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import TableComponent from '../components/TableComponent';
import Menu from '../components/Menu';
import Utils from '../Utils';

const Container = (props) => {
  const [expanded, setExpanded] = useState(true);
  const [data, setData] = useState([]);
  const [activeRows, setActiveRows] = useState([]);

  useEffect(() => {
    const dataJson = localStorage.getItem('data');
    const rowsJson = localStorage.getItem('rows');

    if (dataJson) {
      const data = JSON.parse(dataJson);
      setData(data);
    }

    if (rowsJson) {
      const rows = JSON.parse(rowsJson);
      setActiveRows(rows);
    }
  }, []);

  useEffect(() => {
    if (data.length) {
      const dataJson = JSON.stringify(data);
      localStorage.setItem('data', dataJson);
    }

    if (activeRows.length) {
      const dataJson = JSON.stringify(activeRows);
      localStorage.setItem('rows', dataJson);
    }
  }, [data, activeRows]);

  const changeMenu = () => {
    setExpanded(!expanded);
  };

  const addDataItem = async (item) => {
    const newData = [...data];
    const copy = newData.find((el) => el.id === item.id);

    if (!copy || !Object.keys(copy).length) {
      newData.push(item);
      setData(newData);
    } else {
      alert('Connection already exists');
    }
  };

  const addRow = (item) => {
    const rows = [...activeRows];
    const copy = rows.find((el) => el.id === item.id);
    if (!copy || !Object.keys(copy).length) {
      rows.push(item);
      setActiveRows(rows);
    }
  };

  const removeRow = (id) => {
    const arr = activeRows.filter((item) => item.id !== id);
    setActiveRows(arr);
  };

  const updateDataItem = async (item, id) => {
    const resultData = Utils.updateItem(data, item, id);
    setData(resultData);

    const resultRows = Utils.updateItem(activeRows, item, id);
    setActiveRows(resultRows);
  };

  const clearAllData = () => {
    localStorage.clear();
    setData([]);
    setActiveRows([]);
  };


  return (
    <div style={{height: '100vh'}}>
      <Header
        changeMenu={changeMenu}
        expanded={expanded}
        clearAllData={clearAllData}
      />

      <div style={{display: 'flex', height: 'calc(100% - 50px)'}}>
        <Menu
          rows={activeRows}
          data={data}
          expanded={expanded}
          addRow={addRow}
        />

        <TableComponent
          rows={activeRows}
          removeRow={removeRow}
          addDataItem={addDataItem}
          addRow={addRow}
          updateDataItem={updateDataItem}
        />
      </div>
    </div>
  );
};

export default Container;
