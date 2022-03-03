import React, { useState } from 'react'
import Divider from '../../components/Divider'

const SignUp = () => {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")

    return (
        <div className="text-black flex flex-1">
            <div className="h-auto w-5/12 bg-info px-4 py-10 m-auto rounded-2xl text-white">
                <span className="font-bold text-5xl">Sign up</span>
                <form className='mt-12' onSubmit={() => alert("Signed up!")} >
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
                            placeholder="Input full name"
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
                            placeholder="Input full name"
                            className="input input-bordered input-accent w-8/12"
                            value={cPassword}
                            onChange={(e) => {
                                setCPassword(e.target.value)
                            }} />
                    </label>
                    <div className="w-full flex flex-row justify-end mt-10">
                        <input type="submit" value="Submit" className="btn btn-lg"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;
