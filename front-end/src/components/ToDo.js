import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import '../css/toDo.css';
import { Modal, Button } from 'react-bootstrap';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom'
function ToDo() {
    const [listTask, setListTask] = useState([]);
    const [taskcompleted, setTaskscomplited] = useState();
    const [message, setMesage] = useState()
    const [name, setName] = useState()
    const [username, setUsername] = useState('')
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const handleClose = () => setShowPopup(false);
    const handleShow = (name) => {
        setShowPopup(true);

        setName(name)
    }

    var list_complited = []
    useEffect(() => {
        localStorage.getItem('tasks_Complited');
        localStorage.getItem('tasks');
        var token = localStorage.getItem('token')
        if (token == null) {
            navigate('/')
            return
        }
        fetchTasks()
    }, []);
    function fetchTasks() {

        var token = JSON.parse(localStorage.getItem('token'))
        const decoded = jwt_decode(token);
        // console.log(decoded)
        var userName = decoded.pseudo
        setUsername(userName)
        axios.post(` http://localhost:8000/displayList/${userName}`)
            .then(res => {
                localStorage.setItem('tasks', JSON.stringify(res.data));
                var tasks = JSON.parse(localStorage.getItem('tasks'))
                setListTask(res.data);
                if (tasks.length == 0) {
                    var message = 'Aucune tache à affichée'
                    setMesage(message)
                    fetchTasks()
                }
            })
            .catch((err) => console.log(err));
        axios.post(` http://localhost:8000/displayListCompleted/${userName}`)
            .then(res => {
                localStorage.setItem('tasks_Complited', JSON.stringify(res.data));
            })
            .catch((err) => console.log(err));

    }
    const handleUpdate = (task_id, newCompletedValue) => {
        axios.put(`http://localhost:8000/updateCompleted/${task_id}`, { newCompletedValue: newCompletedValue })
            .then(res => {

                var newList = res.data
                newList.forEach(completedList => {
                    var token = JSON.parse(localStorage.getItem('token'))
                    const decoded = jwt_decode(token);
                    // console.log(decoded)
                    var userName = decoded.pseudo

                    if (completedList.completed == 1 && completedList.task_username == userName)
                        list_complited.push(completedList)
                });
                localStorage.setItem('tasks_Complited', JSON.stringify(list_complited));
                fetchTasks()
            })
            .catch(err => console.log(err));
    }
    const delte = (task_id) => {
        axios.delete(`http://localhost:8000/deleteTask/${task_id}`)
            .then(res => {
                console.log(res)
                var tasks_complited = JSON.parse(localStorage.getItem('tasks_complited'))
                fetchTasks()
                const newTasksCompleted = tasks_complited.filter(completed => completed.task_id !== task_id);
                setTaskscomplited(newTasksCompleted);
                console.log(newTasksCompleted)
                if (newTasksCompleted !== "")
                    localStorage.setItem('tasks_complited', JSON.stringify(newTasksCompleted));
            })
            .catch((err) => console.log(err));
    };

    const logout = async () => {
        axios.post('http://localhost:8000/logout').
            then(res => {
                if (res.data === "Déconnexion réussie.") {
                    localStorage.removeItem("utilisateur");
                    localStorage.removeItem("tasks");
                    localStorage.removeItem("tasks_Complited");
                    navigate('/')
                }
            })
            .catch((err) => console.log(err));
    }
    return (
        <div>
            <div className='bg-secondary  pb-3 pt-1 d-xl-flex align-items-xl-center justify-content-xl-center d-none '>
                <div className='d-xl-flex align-items-xl-center   d-none'>
                    <h2>la listes des taches de&nbsp;&nbsp;</h2>
                    <h1 className='text-white text-bold text-uppercase'  >   {username} </h1>
                </div>
                <span className='margin'>< button className=' btn btn-light text-black' onClick={logout}> Deconnexion</button></span>
            </div>
            <div className='bg-secondary  py-2 d-flex  justify-content-center d-xl-none '>
                <h1 className='text-white text-bold text-uppercase'  >   {username}  </h1>
                < button className='margin2 btn btn-light text-black p-0' onClick={logout}> Deconnexion</button>
            </div>
            <h1 className='title d-xl-none'>Listes des taches</h1>
            <ul className='d-flex flex-column justify-content-center align-items-center mt-xl-3'>
                {listTask.map((task) => (
                    <div className="couleur_b rounded-2 my-2  col-sm-12 col-xl-6" key={task.id}>
                        <li className={"d-flex justify-content-between align-items-center " + (task.completed ? 'bg-success' : null)}>
                            <div className="text-bold px-3 pl-*  ">
                                <span className="trunc-txt " onClick={() => handleShow(task.name)}> {task.name}</span>
                            </div>
                            <div className='bloc_btn d-flex justify-content-between align-items-center'>
                                <button className={"btn btn-sm my-2 border " + (task.completed ? 'btn-success' : '')} onClick={() => handleUpdate(task.task_id, !task.completed)}>
                                    &#x2713;
                                </button>
                                <button className="btn" onClick={() => delte(task.task_id)}>
                                    <FaTrash />
                                </button>
                            </div>
                        </li>
                    </div>
                ))}
                {message && <h3 className="m-3">{message}</h3>}
            </ul>
            <Modal show={showPopup} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body className='T_window'>
                    {name}
                </Modal.Body>
            </Modal>
            <NavBar />
        </div>
    );
}
export default ToDo;