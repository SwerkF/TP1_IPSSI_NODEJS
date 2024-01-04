import { useEffect, useState } from "react"
import axios from 'axios'
function Commentaire() {

  const [user, setUser] = useState<any>(null);
  const [technologie, setTechnologie] = useState<any>(null);
  const [commentaires, setCommentaires] = useState<any>(null);

  const [commentaire, setCommentaire] = useState('');

  useEffect(() => {
    // get local storage 
    const user = localStorage.getItem('user');
    if (user) {
      const id = window.location.pathname.split('/')[2];
      // get user 
      axios.get('http://localhost:3000/api/users/verifyToken', {
        headers: {
          Authorization: `Bearer ${JSON.parse(user).token}`
        }
      }).then((response) => {
        if (response.status === 200) {
          setUser(response.data.user)
          console.log(response.data.user)
          axios.get(`http://localhost:3000/api/technologies/${id}`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(user).token}`
            }
          }).then((response) => {
            if (response.status === 200) {
              setTechnologie(response.data.technologie)
              console.log(response.data.technologie)
            }
          }).catch((error) => {
            console.log(error);
          })
    
          // get commentaires
          axios.get(`http://localhost:3000/api/technologies/${id}/commentaires`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(user).token}`
            }
          }).then((response) => {
            if (response.status === 200) {
              console.log(response.data.commentaires)
              setCommentaires(response.data.commentaires)
            }
          }).catch((error) => {
            console.log(error);
          })
        }
      }).catch((error) => {
        console.log(error);
      })
     
    } else {
      window.location.href = '/login'
    }
  }, [])

  const submit = () => {
    const userToken:any = localStorage.getItem('user');
    const id = window.location.pathname.split('/')[2];
    console.log(user)
    console.log(user)
    console.log(user)
    console.log(user)
    axios.post(`http://localhost:3000/api/commentaires`, {
      technologie_id: id,
      utilisateur_id: user.id,
      date_creation: new Date(),
      commentaire
    }, {
      headers: {
        Authorization: `Bearer ${JSON.parse(userToken).token}`
      }
    }).then((response) => {
      if (response.status === 200) {
        window.location.href = `/technologie/${id}`
      }
    }).catch((error) => {
      console.log(error);
    })
  }

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

  return (
    <>
      {
        technologie && (
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1 className="text-center">{technologie.nom}</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <h2 className="text-center">Commentaires</h2>
              </div>
            </div>
            {
              user && (user.role === 'Admin' || user.role === 'Journaliste') && (
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="mb-3">
                          <label htmlFor="commentaire" className="form-label">Commentaire</label>
                          <textarea className="form-control" id="commentaire" rows={3} onChange={(e) => setCommentaire(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={() => submit()}>Ajouter</button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
            <div className="row">
              {
                commentaires && commentaires.map((commentaire:any) => (
                  <div key={commentaire.id} className="col-12">
                    <div className="card">
                      <div className="card-body">
                        {
                          user && user.role === 'Admin' && (
                            <button type="button" className="btn btn-danger" aria-label="Close" onClick={() => handleDelete(commentaire.id)}
                            >Supprimer</button>
                          )
                        }
                        <p>{commentaire.commentaire}</p>
                        <p>{commentaire.nom} {commentaire.prenom} - {commentaire.date_creation}</p>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        )
      }
    </>
  )
}

export default Commentaire
