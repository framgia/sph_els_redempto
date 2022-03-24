import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import UserService from '../api/userService'

const NavBar = () => {
    const context = useContext(AppContext);
    const user = JSON.parse(context.user);
    const setUser = context.setUser;
    const navigate = useNavigate();

    const handleLogout = () => {
        UserService.logout(setUser, () => {
            navigate("/")
        });
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
                    user === null ?
                        <div>
                            <Link to="/sign-up" className="btn-ghost p-5 btn-lg">Sign Up</Link>
                            <Link to="/login" className="btn-ghost p-5 btn-lg">Login</Link>
                        </div> :
                        <>
                            <Link to={`/users/${user.id}/activity`} className="btn-ghost p-5 btn-lg">{user.full_name}</Link>
                            <button onClick={handleLogout} className="btn-ghost p-5 btn-lg">Logout</button>
                        </>
                }

            </div>

        </div>
    )
}

export default NavBar;
