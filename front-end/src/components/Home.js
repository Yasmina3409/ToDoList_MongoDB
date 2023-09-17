import React, { useState } from 'react'
import axios from 'axios'
import logo from '../img/logo.png'
import { useNavigate, NavLink } from 'react-router-dom'

function Home() {
    const navigate = useNavigate();
    const [user_name, setUser_name] = useState(0)
    const [pwd, setPwd] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/inscription', { user_name, pwd })
            .then(res => {
                var result = res.data
                console.log(result)
                // if (result === 'user_nameExist') {
                //     alert('ce nom existe déja')
                //     return
                // }
                // else
                //     localStorage.setItem('utilisateur', JSON.stringify(result));
                // navigate('/ToDo')
            })
            .catch((err) => console.log(err));
    }
    return (
        <div className=' d-flex justify-content-center vh-100 align-items-center '>
            <div className='p-5 couleur '>
                <img src={logo} alt="" />
                <h1>Inscription</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="user_name">nom</label>
                        <input type='text' name='user_name' placeholder="enter le nom d'utilisateur" className='form-control' required onChange={e => setUser_name(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="pwd">mot de passe</label>
                        <input type='password' name='pwd' placeholder='enter le mot de passe' className='form-control' required onChange={e => setPwd(e.target.value)} />
                    </div>
                    < button className='btn btn-light mb-3'> inscription</button>
                </form>
                <h6 className='' s> Vous avez déjà un compte  &nbsp;
                    <NavLink className="text-white" to="/login" exact={true}>Cliquez ici</NavLink>
                </h6>
            </div>
        </div>
    )
}
export default Home
