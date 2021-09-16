import React from 'react';
import {ListGroup} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';

function Menu(props) {
  const {data = [], rows = [], expanded = true, addRow} = props;

  return (
    <div style={{width: 250, borderRight: '1px solid rgba(0, 0, 0, 0.2)', display: !expanded && 'none'}}>
      <div style={{height: 34, display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(0, 0, 0, 0.2)', justifyContent: 'center'}}>
        <p style={{textAlign: 'center', fontWeight: 600, margin: 0}}>Saved Configurations</p>
      </div>
      <ListGroup style={{borderRadius: 0, padding: 1}}>
        {
          data && data.length ? data.map((item, i) => {
            const {host, port, username, privateKey, id} = item;
            const activeRow = rows.find((el) => el.id === id);
            return (
              <ListGroup.Item
                key={item?.host + i}
                action
                style={{height: 47, borderRight: 0, borderLeft: 0, padding: '5px', fontSize: '0.7rem'}}
                onClick={() => addRow(item)}
              >
                <div>{host}:{port} - {username}
                  <span>{
                  activeRow && Object.keys(activeRow).length ? (
                    <FontAwesomeIcon
                      className={'menu-icon'}
                      icon={faCheck}
                      style={{color: '#85b0ff', fontSize: '0.6rem', marginLeft: 5}}/>
                  ) : ''}</span>
                </div>
                <div style={{color: 'gray'}}>{privateKey}</div>
              </ListGroup.Item>
            );
          }) : (
            <div style={{display: 'flex', padding: 12, justifyContent: 'center', color: 'rgba(0, 0, 0, 0.4)'}}>Empty</div>
          )
        }
      </ListGroup>
    </div>
  );
}

export default Menu;
