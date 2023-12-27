import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'



export default function Navbar(props) {

    let location = useLocation();

    let navigate = useNavigate();


    React.useEffect(() => {

        // console.log(location.pathname);
    }, [location]);


    const handlelogout = () => {

        localStorage.removeItem('auth-token');

        props.aboutalert("SuccessFully LogOut", "success");
        navigate("/login");

    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">

            <div className="container-fluid">
                {
                    localStorage.getItem('auth-token') ?

                        <Link className="navbar-brand" to="/">iNotebook</Link>
                        :
                        <Link className="navbar-brand" to="/login">iNotebook</Link>

                }

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            {
                                localStorage.getItem('auth-token') ?
                                    <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                                    :
                                    <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/login">Home</Link>


                            }
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                        </li>


                    </ul>
                    {

                        !localStorage.getItem('auth-token') ? (
                            <form className="d-flex" role="search">
                                <Link className="btn btn-outline-primary mx-1" to="/Login" type="submit">Login </Link>
                                <Link className="btn btn-outline-success" to='/signup' type="submit">Sign Up</Link>

                            </form>
                        ) : (<button className='btn btn-outline-danger' onClick={handlelogout}> Logout</button>)
                    }
                </div>
            </div>
        </nav >
    )
}
