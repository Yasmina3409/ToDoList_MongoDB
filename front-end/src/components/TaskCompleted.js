
import '../css/toDo.css';
import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa'
import NavBar from './NavBar';







function TaskCompleted() {
    const [tasks_complited, setTaskscomplited] = useState([]);
    const [message, setMesage] = useState();
    useEffect(() => {
        var tasks_complited = JSON.parse(localStorage.getItem('tasks_Complited'))
        setTaskscomplited(tasks_complited)
        if (tasks_complited && Array.isArray(tasks_complited)) {
            if (tasks_complited.length === 0) {
                var message = "Aucune tâche n'a été assurée";
                setMesage(message);
            }
        }
    }, []);
    const completedDelete = (task_id) => {
        var newTasksCompleted = tasks_complited.filter(completed => completed.task_id !== task_id);
        setTaskscomplited(newTasksCompleted);
        if (newTasksCompleted !== []) {
            localStorage.setItem('tasks_Complited', JSON.stringify(newTasksCompleted));
        }
    };

    return (
        <div>
            <h1 className="m-3">Liste de tâches complétées</h1>
            <ul className="list-group m-3 -flex flex-column justify-content-center align-items-center mt-xl-3">
                {tasks_complited.map((task) => (
                    <div className="couleur_b   rounded-2 my-2  col-sm-12  col-xl-6">
                        <li className="list-group-item align-tiems-center d-flex justify-content-between py-2" key={task.id}>
                            <span className='trunc-txt'> {task.name} </span>
                            <div className='bloc_btn'>
                                <button className="btn btn-outline-danger   "
                                    onClick={() => completedDelete(task.task_id)}><FaTrash /></button>
                            </div>
                        </li>
                    </div>
                ))}
                {message && <h3 className="m-3">{message}</h3>}
            </ul >
            <NavBar />
        </div>
    )
}


export default TaskCompleted