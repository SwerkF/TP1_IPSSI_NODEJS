import { useEffect, useState } from "react"
import axios from 'axios'
function Commentaire() {

  const [user, setUser] = useState<any>(null);
  const [commentaires, setCommentaires] = useState([]);
  const [technologie, setTechnologie] = useState<any>([]);

  useEffect(() => {
    // get local storage 
    const user = localStorage.getItem('user');
    if (user) {
        // get user 
        axios.get('http://localhost:3000/api/users/verifyToken', {
            headers: {
            Authorization: `Bearer ${JSON.parse(user).token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                setUser(response.data.user)
                // get commentaires
                axios.get(`http://localhost:3000/api/commentaires`, {
                    headers: {
                    Authorization: `Bearer ${JSON.parse(user).token}`
                    }
                }).then((response) => {
                    if (response.status === 200) {
                    console.log(response.data.commentaires)
                    setCommentaires(response.data.commentaires)

                    // get technologie
                    axios.get(`http://localhost:3000/api/technologies`, {
                        headers: {
                        Authorization: `Bearer ${JSON.parse(user).token}`
                        }
                    }).then((response) => {
                        if (response.status === 200) {
                        console.log(response.data.technologies)
                        setTechnologie(response.data.technologies)
                        }
                    }).catch((error) => {
                        console.log(error);
                    })
                    }
                }).catch((error) => {
                    console.log(error);
                })
            }
        }).catch((error) => {
            console.log(error);
        })
    }
  }, [])

  
    const handleDelete = (id:number) => {
        const userToken:any = localStorage.getItem('user');
        axios.delete(`http://localhost:3000/api/commentaires/${id}`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(userToken).token}`
        }
        }).then((response) => {
        if (response.status === 200) {
            window.location.href = `/technologie/${window.location.pathname.split('/')[2]}`
        }
        }).catch((error) => {
        console.log(error);
        })
    }

    const handleSort = async (e:any) => {
        // sort without api
        
        const user:any = localStorage.getItem('user');
        await axios.get(`http://localhost:3000/api/commentaires`, {
                headers: {
                Authorization: `Bearer ${JSON.parse(user).token}`
                }
            }).then((response) => {
                if (response.status === 200) {
                    console.log(response.data.commentaires)
                    setCommentaires(response.data.commentaires)
                    if (e.target.value !== '') {
                        const commentaires:any = response.data.commentaires.filter((commentaire:any) => commentaire.techno === e.target.value)
                        setCommentaires(commentaires)
                    }
                }
            }).catch((error) => {
                console.log(error);
            })
        
        
        
    }

    return (
        <>
        {
            commentaires && (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="text-center">Commentaires</h1>
                            <div className="form-group">
                                <label htmlFor="tri">Trier par technologie</label>
                                <select name="tri" id="tri" className="form-control" onChange={handleSort}>
                                    <option value="">Trier par technologie</option>
                                    {
                                        technologie.map((technologie:any) => (
                                            <option key={technologie.id} value={technologie.nom}>{technologie.nom}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Commentaire</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        commentaires.map((commentaire:any) => (
                                            <tr key={commentaire.id}>
                                                <td>{commentaire.commentaire}</td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={() => handleDelete(commentaire.id)}>Supprimer</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }
        </>
    )
}

export default Commentaire
