import { useState, useEffect } from 'react';
import axios from 'axios';

function Login() {

    useEffect(() => {
        // get local storage 
        const user = localStorage.getItem('user');
        if (user) {
            // redirect to home
            window.location.href = '/'
        }
    }, [])

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/users/login', {
                email,
                password
            });
            // save token in local storage
            console.log(response.data)
            localStorage.setItem('user', JSON.stringify(response.data));
            // redirect to home
            window.location.href = '/'
        } catch (error) {
            console.log(error);
        }
    }

    return (
    <>
        <div className='container'>
            <div className="d-flex flex-row justify-content-center mt-5">
                <div className="card w-50">
                    <div className="card-header">
                        <h3>Connexion</h3>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Mot de passe</label>
                            <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={() => handleSubmit()} >Se connecter</button>
                    </div>
                    <div className="card-footer">
                        <a href="/signup">Pas encore de compte ?</a>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login
