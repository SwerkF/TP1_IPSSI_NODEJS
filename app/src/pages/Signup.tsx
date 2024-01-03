import { useState, useEffect } from 'react';
import axios from 'axios';

function SignUp() {

    const [nom, setSom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [motdepasse, setMotdepasse] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/signup', {
                nom,
                prenom,
                email,
                motdepasse
            });
            // save token in local storage
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
                            <label htmlFor="nom" className="form-label">Nom</label>
                            <input type="text" className="form-control" id="nom" onChange={(e) => setSom(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="prenom" className="form-label">Prenom</label>
                            <input type="text" className="form-control" id="prenom" onChange={(e) => setPrenom(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="motdepasse" className="form-label">Mot de passe</label>
                            <input type="motdepasse" className="form-control" id="motdepasse" onChange={(e) => setMotdepasse(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={() => handleSubmit()} >Se connecter</button>
                    </div>
                    <div className="card-footer">
                        <a href="/register">Pas encore de compte ?</a>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default SignUp
