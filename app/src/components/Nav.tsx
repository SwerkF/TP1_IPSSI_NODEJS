import { useEffect, useState } from 'react';
import axios from 'axios';
function Nav() {

    const [user, setUser] = useState(null)

    useEffect(() => {
      document.title = "LaTechTONIK"
  
      // Récupérer user dans local storage
      const user = localStorage.getItem('user');
      if (user) {
        // Vérifier token
        axios.post('http://localhost:3000/api/users/verifyToken', {
          token: JSON.parse(user).token
        }).then((response) => {
            if (response.status === 200) {
                setUser(JSON.parse(user))
            } else {
                localStorage.removeItem('user');
                window.location.href = '/login'
            }
        }).catch(() => {
            localStorage.removeItem('user');
            window.location.href = '/login'
        })
      }
  
      
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/'
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand fw-bold" href="/">LaTechTONIK</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
                </button>
            </div>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                    <a className="nav-link" href="/technologie">Technologies</a>
                    {
                        user ? (
                            <>
                                <a className="nav-link" href="/profile">Profile</a>
                                <a className="nav-link" href="/logout" onClick={() => handleLogout()}>Logout</a>
                            </>
                        ) : (
                            <>
                                <a className="nav-link" href="/login">Login</a>
                                <a className="nav-link" href="/signup">Signup</a>
                            </>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}

export default Nav
