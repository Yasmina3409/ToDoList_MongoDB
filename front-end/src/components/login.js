
import React, { useState } from 'react'
import logo from '../img/logo.png'
import axios from 'axios'
import { useNavigate, NavLink } from 'react-router-dom'




function Login() {
    const navigate = useNavigate()

    const [user_name, setUser_name] = useState(0)
    const [pwd, setPwd] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/login', { user_name, pwd })
            .then(res => {
                var result = res.data
                console.log(result)

                if (result) {
                    localStorage.setItem('token', JSON.stringify(result));
                    navigate('/ToDo')
                }
                else {
                    alert("mot de passe incorrecte")
                }
            })
            .catch(err => { alert("connexion échouée") });
    }
    return (
        <div className=' d-flex justify-content-center vh-100 align-items-center bg-light'>
            <div className='p-5 bg-secondary'>
                <img src={logo} alt="" />
                <h1>Connexion</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="user_name">Nom</label>
                        <input type='text' name='user_name' placeholder="enter le nom d'utilisateur" className='form-control' onChange={e => setUser_name(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="pwd">Mot de passe</label>
                        <input type='password' name='pwd' placeholder='enter le mot de passe' className='form-control' onChange={e => setPwd(e.target.value)} />
                    </div>
                    < button className='btn btn-light'> se connecter</button>
                    <h6>Vous n'avez pas de compte &nbsp;
                        <NavLink className="text-white" to="/" exact={true}>Cliquer ici</NavLink>
                    </h6>
                </form>
            </div>
        </div>
    )
}
export default Login