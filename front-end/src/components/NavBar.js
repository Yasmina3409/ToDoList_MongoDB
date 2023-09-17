import React, { useState } from 'react'
import { FaListAlt, FaCheckSquare, FaPlusSquare, FaTrash } from 'react-icons/fa'
import { Modal, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import axios from 'axios';
function NavBar() {
    const [showPopup, setShowPopup] = useState(false);
    const handleClose = () => setShowPopup(false);
    const handleShow = () => setShowPopup(true);


    const deleteAll = () => {

        var tasks = JSON.parse(localStorage.getItem('tasks_complited'))
        var user = JSON.parse(localStorage.getItem('utilisateur'))
        var userName = user.user
        axios.delete(`http://localhost:8000/deleteAll/${userName}`)
            .then(res => {
                window.location.reload();
            })

    };
    return (
        <section>
            <footer className="d-flex justify-content-between bg-secondary p-3" id="mainFooter">
                <div className="btn-group">
                    <NavLink to="/toDo" className="btn btn-outline-dark bg-light" exact={true}><FaListAlt /></NavLink>
                    <NavLink to="/TaskCompleted" className="btn btn-outline-dark bg-light" exact={true}>< FaCheckSquare /></NavLink>
                    <NavLink to="/addTask" className="btn btn-outline-dark bg-light" exact={true}><FaPlusSquare /></NavLink>
                </div>
                <button className="btn btn-outline-dark bg-light" onClick={handleShow} ><FaTrash /></button>

            </footer>
            <div>
                <Modal show={showPopup} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Fenêtre contextuelle</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Vous êtes  sur le point de supprimer toutes les tâches,
                        appuyer sur Oui pour confirmer.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Non
                        </Button>
                        <Button variant="secondary" onClick={() => deleteAll()}>
                            Oui
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </section>
    )
}


export default NavBar