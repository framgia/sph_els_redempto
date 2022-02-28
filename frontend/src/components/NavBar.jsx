import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <div className="flex navbar bg-blue-400">
            <div className="navbar-start">
                <span className='text-3xl font-bold'>
                    <Link to="/" className=''>E-Learning System</Link>
                </span>
                <div className="divider divider-horizontal"></div>
                <span className='text-xl font-bold'>
                <Link to="/categories" className='btn-ghost p-3'>Categories</Link>
                </span>
            </div>
            <div className="navbar-center">
            </div>
            <div className="navbar-end">
                <Link to="/sign-up" className="btn-ghost mr-5 p-5 btn-lg">Sign Up</Link>
                <Link to="/login" className="btn-ghost mr-5 p-5 btn-lg">Login</Link>
            </div>

        </div>
    )
}

export default NavBar;