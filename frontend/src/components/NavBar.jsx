import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API } from '../api/api';
import { AppContext } from '../context/AppContext';

const NavBar = () => {
    const context = React.useContext(AppContext);
    const [currentUser, setCurrentUser] = context.user;
    const navigate = useNavigate();

    const handleLogout = () => {
        API.post('logout',
            {},
            {
                headers: {
                    'Authorization': `Bearer ${currentUser.token}`,
                }
            })
            .catch(response => console.log(response))
        setCurrentUser(null)
        navigate("/")
    }

    return (
        <div className="navbar bg-blue-400 p-0">
            <div className="navbar-start">
                <span className='text-3xl font-bold ml-2'>
                    <Link to="/" className=''>E-Learning System</Link>
                </span>
                <div className="divider divider-horizontal"></div>
                <span className='text-xl font-bold'>
                    <Link to="/categories" className='btn-ghost p-5'>Categories</Link>
                </span>
            </div>
            <div className="navbar-center">
            </div>
            <div className="navbar-end">
                {
                    currentUser === null ?
                        <div>
                            <Link to="/sign-up" className="btn-ghost p-5 btn-lg">Sign Up</Link>
                            <Link to="/login" className="btn-ghost p-5 btn-lg">Login</Link>
                        </div> :

                        <button onClick={handleLogout} className="btn-ghost p-5 btn-lg">Logout</button>
                }

            </div>

        </div>
    )
}

export default NavBar;
