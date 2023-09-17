
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import jwt_decode from "jwt-decode";
function AddTask() {
    const navigate = useNavigate()
    const [taskName, setTaskName] = useState(0)
    const completed = false
    var token = JSON.parse(localStorage.getItem('token'))
    const decoded = jwt_decode(token);
    const username = decoded.pseudo
    const handleSubmit = (event) => {


        event.preventDefault();
        axios.post('http://localhost:8000/tasks/addTask', { taskName, completed, username })

            .then(res => {
                var result = res.data
                // if (result === 'emailExist') {
                //     alert('Task Exist')
                // }
                // else
                //    navigate('/ToDo')
            })
            .catch((err) => console.log(err));
    }

    return (
        <section>
            <h1 className="m-3">Nouvelle tâche</h1>
            <div className="card mx-3">
                <form className="card-body" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label form="taskName">Nom de la tâche</label>
                        <input type="text" className="form-control" name="taskName" id="taskName" required onChange={e => setTaskName(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Créer</button>
                </form>
            </div>
            <NavBar />
        </section>
    )
}


export default AddTask