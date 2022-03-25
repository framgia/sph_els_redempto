import React, { useContext, useEffect, useState } from 'react'
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
    const [errorMessage, setErrorMessage] = useState("")
    const [isError, setIsError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (password !== cPassword) {
            setPassword("")
            setCPassword("")
            setErrorMessage("Passwords do not match!")
            setIsError(true)
            return;
        }

        const formData = new FormData();
        formData.append('full_name', fullName);
        formData.append('user_name', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', cPassword);

        UserService.signup(formData, setUser,
            (error) => {
                setIsError(true)
                if (error.response.status === 422) {
                    setErrorMessage(error.response.data.message)
                }
                else {
                    setErrorMessage("Error Handling Your Request")
                }
            },
            () => {
                setFullName("")
                setEmail("")
                setUsername("")
                setPassword("")
                setCPassword("")

                if (!UserService.isLoggedIn()) return;
                navigate("/dashboard/activity");
            })
    }

    useEffect(() => {
        if (!isError) return;
        const timer = setTimeout(() => {
            setIsError(false)
        }, 5000)

        return () => {
            clearTimeout(timer)
        }
    }, [isError])

    return (
        <div className="text-black flex flex-1">
            <div className="h-auto w-5/12 bg-info px-4 py-10 m-auto rounded-2xl text-white">
                <span className="font-bold text-5xl">Sign up</span>
                <form className='mt-4' onSubmit={handleSubmit} >
                    <div className={`alert alert-error shadow-lg mb-8 ${!isError && 'hidden'}`}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{errorMessage}</span>
                        </div>
                    </div>
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
