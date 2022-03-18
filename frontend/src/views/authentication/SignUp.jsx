import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserService from '../../api/userService'
import { AppContext } from '../../context/AppContext'

const SignUp = () => {
    const context = useContext(AppContext);
    const setUser = context.setUser;

    const navigate = useNavigate();
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('full_name', fullName);
        formData.append('user_name', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', cPassword);

        UserService.signup(formData, setUser, () => {
            navigate("/");
        })
    }

    return (
        <div className="text-black flex flex-1">
            <div className="h-auto w-5/12 bg-info px-4 py-10 m-auto rounded-2xl text-white">
                <span className="font-bold text-5xl">Sign up</span>
                <form className='mt-12' onSubmit={handleSubmit} >
                    <label className="label">
                        <span className="label-text mr-3 text-xl">Full Name:</span>
                        <input
                            type="text"
                            placeholder="Full name"
                            className="input input-bordered input-accent w-8/12"
                            value={fullName}
                            onChange={(e) => {
                                setFullName(e.target.value)
                            }} />
                    </label>
                    <label className="label">
                        <span className="label-text mr-3 text-xl">Email:</span>
                        <input
                            type="email"
                            placeholder="Email"
                            className="input input-bordered input-accent w-8/12"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }} />
                    </label>
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
                            placeholder="Input password"
                            className="input input-bordered input-accent w-8/12"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }} />
                    </label>
                    <label className="label">
                        <span className="label-text mr-3 text-xl">Confirm Password:</span>
                        <input
                            type="password"
                            placeholder="Confirm password"
                            className="input input-bordered input-accent w-8/12"
                            value={cPassword}
                            onChange={(e) => {
                                setCPassword(e.target.value)
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

export default SignUp;
