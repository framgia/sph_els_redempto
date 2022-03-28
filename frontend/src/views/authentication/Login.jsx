import React, { useContext, useEffect, useState } from 'react'
import UserService from '../../api/userService'
import { AppContext } from '../../context/AppContext'

const Login = () => {
    const context = useContext(AppContext)
    const setUser = context.setUser;
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [isError, setIsError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        UserService.login(username, password, setUser,
            (error) => {
                setIsError(true)
                if (error.response.status === 422) {
                    setErrorMessage("Incomplete Fields")
                }
                else if (error.response.status === 400) {
                    setErrorMessage("Incorrect Username or Password")
                }
                else {
                    setErrorMessage("Error Handling Your Request")
                }
            },)
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
        <>
            <div className="text-black flex flex-1">
                <div className="h-auto w-5/12 bg-info px-4 py-8 m-auto rounded-2xl text-white">
                    <span className="font-bold text-5xl">Login</span>
                    <form className='mt-4' onSubmit={handleSubmit} >
                        <div className={`alert alert-error shadow-lg mb-8 ${!isError && 'hidden'}`}>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{errorMessage}</span>
                            </div>
                        </div>

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
                        <div className="w-full flex flex-row justify-end mt-10">
                            <input type="submit" value="Submit" className="btn btn-lg" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;
