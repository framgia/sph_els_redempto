import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postFormData } from '../../api/api'
import { AppContext } from '../../context/AppContext'

const Login = () => {
    const navigate = useNavigate();
    const context = React.useContext(AppContext)
    const [currentUser, setCurrentUser] = context.user
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('user_name', username);
        formData.append('password', password);

        const getUser = async() => {
            const user = await postFormData("http://127.0.0.1:8000/", "login", formData)
            setCurrentUser(user);
            navigate("/");
        }
        getUser();
    }

    return (
        <div className="text-black flex flex-1">
            <div className="h-auto w-5/12 bg-info px-4 py-8 m-auto rounded-2xl text-white">
                <span className="font-bold text-5xl">Login</span>
                <form className='mt-12' onSubmit={handleSubmit} >
                    
                    <label className="label">
                        <span className="label-text mr-3 text-xl">Username:</span>
                        <input
                            type="text"
                            placeholder="Username"
                            className="input input-bordered input-accent w-8/12"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }} />
                    </label>
                    <label className="label">
                        <span className="label-text mr-3 text-xl">Password:</span>
                        <input
                            type="password"
                            placeholder="Input full name"
                            className="input input-bordered input-accent w-8/12"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }} />
                    </label>
                    <div className="w-full flex flex-row justify-end mt-10">
                        <input type="submit" value="Submit" className="btn btn-lg" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;
