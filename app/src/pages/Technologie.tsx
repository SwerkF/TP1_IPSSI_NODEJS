import { useState, useEffect } from 'react';
import axios from 'axios';

function Technologie() {

    const [user, setUser] = useState(null);
    const [nom, setNom] = useState('');

    const [technologies, setTechnologies] = useState([]);

    useEffect(() => {
        // get user from local storage
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user))
        }

        // get technologies
        axios.get('http://localhost:3000/api/technologies').then((response) => {
            setTechnologies(response.data.technologies)
            console.log(response.data.technologies)
        }).catch((error) => {
            console.log(error);
        })

        
    }, [])

    const submit = () => {
        axios.post('http://localhost:3000/api/technologies', {
            nom
        }).then((response) => {
            if (response.status === 200) {
                window.location.href = '/technologie'
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleDelete = (id:number) => {
        axios.delete(`http://localhost:3000/api/technologies/${id}`).then((response) => {
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
                            user && (
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Ajouter une technologie</button>
                            )
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
                                                <th scope="row">{index + 1}</th>
                                                <td>{technologie.nom}</td>
                                                <td>
                                                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(technologie.id) }>Supprimer</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                         </div>
               
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
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary" onClick={() => submit()}>Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Technologie
