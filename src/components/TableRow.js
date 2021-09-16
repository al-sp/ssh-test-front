import React, {useEffect, useState} from 'react';
import {Button, FormControl} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTimes} from '@fortawesome/free-solid-svg-icons';
import {api} from '../api';


function TableRow(props) {
  const {
    item = {},
    index,
    emptyRow = false,
    removeRow,
    addDataItem,
    updateDataItem,
    addRow,
  } = props;

  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [ssh, setSsh] = useState({
    host: '',
    port: '',
    username: '',
    privateKey: '',
    passphrase: '',
  });

  useEffect(() => {
    if ((item && Object.keys(item).length) && !emptyRow) {
      setSsh({
        host: item.host,
        port: item.port,
        username: item.username,
        privateKey: item.privateKey,
        passphrase: item.passphrase,
      });
    }
  }, [emptyRow, item]);

  const connectSsh = (item) => {
    setLoading(true);
    if (!item.id) {
      const dataItem = {
        ...item,
        id: `${item.host}-${item.port}-${item.privateKey}`,
      };

      addDataItem(dataItem)
          .then(() => {
            setSsh({
              host: '',
              port: '',
              username: '',
              privateKey: '',
              passphrase: '',
            });

            addRow(dataItem);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
    } else {
      api.post('/api', {
        ...item,
      })
          .then((resp) => {
            console.log(resp);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.error(err);
          });
    }
  };

  useEffect(() => {
    const empty = Object.keys(ssh).filter((key) => !ssh[key]);
    if (empty.length && empty[0] !== 'passphrase') {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [ssh]);

  const onChange = (e, key) => {
    const value = e.target.value;
    setSsh({
      ...ssh,
      [key]: value,
    });
  };

  return (
    <tr>
      <td>{index !== null ? index + 1 : ''}</td>
      <td>
        <FormControl
          readOnly={!edit && !emptyRow}
          placeholder="Host *"
          aria-label="Host"
          aria-describedby="basic-addon1"
          value={ssh.host}
          onChange={(e) => onChange(e, 'host')}
        />
      </td>
      <td>
        <FormControl
          readOnly={!edit && !emptyRow}
          placeholder="Port *"
          aria-label="Port"
          aria-describedby="basic-addon1"
          value={ssh.port}
          onChange={(e) => onChange(e, 'port')}
        />
      </td>
      <td>
        <FormControl
          readOnly={!edit && !emptyRow}
          placeholder="Username *"
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={ssh.username}
          onChange={(e) => onChange(e, 'username')}
        />
      </td>
      <td>
        <FormControl
          readOnly={!edit && !emptyRow}
          type='password'
          placeholder="Password"
          aria-label="Password"
          aria-describedby="basic-addon1"
          value={ssh.passphrase}
          onChange={(e) => onChange(e, 'passphrase')}
        />
      </td>
      <td>
        <FormControl
          readOnly={!edit && !emptyRow}
          placeholder="Key Path *"
          aria-label="Key"
          aria-describedby="basic-addon1"
          value={ssh.privateKey}
          onChange={(e) => onChange(e, 'privateKey')}
        />
      </td>
      <td>
        <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {
            edit ? (
              <Button
                style={{height: 34, margin: '2px auto', width: '100%'}}
                variant={'primary'}
                size="sm"
                onClick={() => {
                  updateDataItem(ssh, item.id)
                      .then(() => setEdit(false))
                      .catch((err) => console.log(err));
                }}
              >
                Save
              </Button>
            ) : (
              <React.Fragment>
                {
                  emptyRow ? (
                    <Button
                      style={{height: 34, margin: '2px auto', width: '100%'}}
                      variant={disabled ? 'secondary' : 'primary'}
                      size="sm"
                      disabled={disabled}
                      onClick={() => connectSsh(ssh)}
                    >
                      Save
                    </Button>
                  ) : (
                    <React.Fragment>
                      <Button
                        style={{height: 34, margin: '2px 5px 2px 0'}}
                        variant={'primary'}
                        size="sm"
                        disabled={loading}
                        onClick={() => connectSsh(item)}
                      >
                        {loading ? 'Loading...' : 'Connect'}
                      </Button>

                      <Button
                        style={{height: 34, width: 28, margin: '2px 5px 2px 0'}}
                        variant={'secondary'}
                        size="sm"
                        disabled={loading}
                        onClick={() => setEdit(true)}
                      >
                        <FontAwesomeIcon className={'menu-icon'} icon={faEdit} style={{color: '#ffffff', fontSize: '0.7rem', position: 'relative', bottom: 1}}/>
                      </Button>

                      <Button
                        style={{height: 34, width: 28, margin: '2px 0 2px 0'}}
                        variant={'secondary'}
                        size="sm"
                        disabled={loading}
                        onClick={() => removeRow(item.id)}
                      >
                        <FontAwesomeIcon className={'menu-icon'} icon={faTimes} style={{color: '#ffffff', fontSize: '0.7rem', position: 'relative', bottom: 1}}/>
                      </Button>
                    </React.Fragment>
                  )
                }
              </React.Fragment>
            )
          }
        </div>
      </td>
    </tr>
  );
}

export default TableRow;
