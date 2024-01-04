import { useState, useEffect } from 'react';
import axios from 'axios';

function Technologie() {

    const [user, setUser] = useState<any>(null);
    const [nom, setNom] = useState('');

    const [technologies, setTechnologies] = useState([]);
    const [date_creation, setDate] = useState('');
    const [createur, setCreateur] = useState('');

    useEffect(() => {
        // Get token
        const user:any = localStorage.getItem('user');

        if(user) 
        {
            // get user role using token in authorization header
        axios.get('http://localhost:3000/api/users/verifyToken', {
            headers: {
                Authorization: `Bearer ${JSON.parse(user).token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                setUser(response.data.user)
                console.log(response.data.user)
                
            }
        }).catch((error) => {
            console.log(error);
        })


        // get technologies bearer token
        axios.get('http://localhost:3000/api/technologies', {
            headers: {
                Authorization: `Bearer ${JSON.parse(user).token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                setTechnologies(response.data.technologies)
            }
        }).catch((error) => {
            console.log(error);
        })
        }
        
    }, [])

    const submit = () => {
        const userToken:any = localStorage.getItem('user');
        axios.post('http://localhost:3000/api/technologies', {
            nom,
            date_creation,
            createur
        }, {
            headers: {
                Authorization: `Bearer ${JSON.parse(userToken).token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                window.location.href = '/technologie'
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleDelete = (id:number) => {
        const userToken:any = localStorage.getItem('user');
        axios.delete(`http://localhost:3000/api/technologies/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(userToken).token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                window.location.href = '/technologie'
            }
        }).catch((error) => {
            console.log(error);
        })
    }
    
    return (
        <>
            <div className='container'>
                <div className="d-flex flex-row justify-content-center mt-5">
                    <div className="card w-100">
                        <div className="card-header">
                            <h3>Technologie</h3>
                        </div>
                        <div className="card-body">
                        {
                            user && user.role.toUpperCase() === 'ADMIN' ? (
                                <>
                                    <button type="button" className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        Ajouter une technologie
                                    </button>
                                    <div className="modal " id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Ajouter une technologie</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="mb-3">
                                                    <label htmlFor="nom" className="form-label">Nom</label>
                                                    <input type="text" className="form-control" id="nom" onChange={(e) => setNom(e.target.value)} />
                                                </div>
                                                <div className='mb-3'>
                                                    <label htmlFor="date" className="form-label">Date</label>
                                                    <input type="date" className="form-control" id="date" onChange={(e) => setDate(e.target.value)} />
                                                </div>
                                                <div className='mb-3'>
                                                    <label htmlFor="createur" className="form-label">Createur</label>
                                                    <input type="text" className="form-control" id="createur" onChange={(e) => setCreateur(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary" onClick={() => submit()}>Save changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </>
                            ) : null
                        }
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nom</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        technologies.map((technologie:any, index) => (
                                            <tr key={index}>
                                                <th scope="row">
                                                    <a href={`/technologie/${technologie.id}`}>
                                                        {technologie.id}
                                                    </a>
                                                </th>
                                                <td>{technologie.nom}</td>
                                                <td>
                                                    {
                                                        user && user.role === 'Admin' ? (
                                                            <button type="button" className="btn btn-danger" onClick={() => handleDelete(technologie.id)}>Supprimer</button>
                                                        ) : null
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                         </div>
               
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Technologie
