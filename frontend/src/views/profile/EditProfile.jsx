import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import UserService from '../../api/userService';
import Avatar from '../../components/Avatar';
import Divider from '../../components/Divider';
import { AppContext } from '../../context/AppContext';



const EditProfile = () => {
    const { id } = useParams();
    const context = useContext(AppContext)
    const user = useRef(JSON.parse(context.user))
    const setUser = context.setUser;
    const [inputProfilePic, setInputProfilePic] = useState(null)
    const [inputFullName, setInputFullName] = useState("")
    const [inputEmail, setInputEmail] = useState("")
    const navigate = useNavigate();

    const handleUpload = (event) => {
        event.preventDefault();
        setInputProfilePic(event.target.files[0]);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append('full_name', inputFullName)
        formData.append('email', inputEmail)
        formData.append('profile_pic', inputProfilePic)

        UserService.updateUser(user.current.id, formData, setUser, () => {
            navigate("/")
        })
    }

    useEffect(() => {
        if (user.current == null) return
        if (user.current.id !== parseInt(id)) navigate(`/users/${user.current.id}/edit`)

        setInputFullName(user.current.full_name)
        setInputEmail(user.current.email)
    }, [id, navigate])

    return (
        <div className="text-black flex-1 w-10/12 m-auto mt-10">
            <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">Edit Profile</span>
            </div>
            <Divider />
            <form className="form-control flex-1 p-3" encType='multipart/form-data' onSubmit={handleSubmit}>
                <Avatar className="inline-block w-36" isRounded={false} user={user.current} />
                <input type="file" className="mt-2" accept="image/png, image/jpeg" onChange={handleUpload} />
                <label className="label">
                    <span className="label-text text-black text-xl font-bold">Full Name</span>
                </label>
                <input
                    type="text"
                    className="input input-bordered text-white"
                    placeholder="Add Title"
                    value={inputFullName}
                    onChange={(e) => {
                        setInputFullName(e.target.value)
                    }} />
                <label className="label">
                    <span className="label-text text-black text-xl font-bold">Email</span>
                </label>
                <input
                    type="email"
                    className="input input-bordered text-white"
                    placeholder="Add Title"
                    value={inputEmail}
                    onChange={(e) => {
                        setInputEmail(e.target.value)
                    }} />
                <div className='mt-4'>
                    <input className='btn' type="submit"></input>
                </div>
            </form>
        </div>
    )
}

export default EditProfile;
