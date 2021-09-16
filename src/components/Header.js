import React, {useEffect, useState} from 'react';
import {Badge, Button, Modal, Nav, Navbar} from 'react-bootstrap';
import {api} from '../api';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faCircle, faSync, faTrash} from '@fortawesome/free-solid-svg-icons';
import './header.css';


function Header(props) {
  const {changeMenu, expanded = true, clearAllData} = props;

  const [successText, setSuccessText] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getNetworkStatus();
  }, []);

  const getNetworkStatus = () => {
    api.get('/')
        .then((resp) => setSuccessText(resp.status))
        .catch((err) => {
          setSuccessText(null);
          console.error(err);
        });
  };

  return (
    <React.Fragment>
      <Navbar bg="dark" variant={'dark'} style={{paddingRight: 0}} sticky={'top'}>
        <Badge
          variant="secondary"
          className={'menu-button'}
          onClick={() => changeMenu()}
        >
          <FontAwesomeIcon className={'menu-icon'} icon={faBars} style={{color: !expanded && '#343a40'}}/>
        </Badge>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" style={{width: '100%'}}>
            <Navbar.Brand style={{fontSize: '1rem'}}>Network status: {successText}
              <FontAwesomeIcon
                icon={faCircle}
                style={{
                  fontSize: '0.6rem',
                  color: String(successText) === '200' ? 'green' : 'tomato',
                  marginLeft: 6,
                  position: 'relative',
                  bottom: 2,
                }}
              />
            </Navbar.Brand>
          </Nav>
          <Button
            className={'icon-button'}
            size="sm"
            variant="outline-secondary"
            onClick={() => {
              handleShow();
            }}
          >
            <FontAwesomeIcon
              icon={faTrash}
              style={{color: '#ffffff'}}
            />
          </Button>

          <Button
            className={'icon-button'}
            size="sm"
            variant="outline-secondary"
            onClick={() => {
              setSuccessText(null);
              getNetworkStatus();
            }}
          >
            <FontAwesomeIcon
              icon={faSync}
              style={{color: '#ffffff'}}
            />
          </Button>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Clear all lists</Modal.Title>
        </Modal.Header>
        <Modal.Body>Clicking <b>"Clear"</b> will <b>delete all saved data</b> and lines and <b>terminate all connections.</b></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            clearAllData();
            handleClose();
          }}>
            Clear
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}


export default Header;
