import React, { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import BASEAPI from '../../api/baseApi';
import Avatar from '../../components/Avatar';
import Divider from '../../components/Divider';
import Cookies from 'js-cookie'

const Profile = () => {
    const { id } = useParams();
    const currentUser = useRef(null);
    const navigate = useNavigate();

    const cookie = Cookies.get('user')
    if (typeof cookie != 'undefined') {
        currentUser.current = JSON.parse(cookie);
    }

    const [isFollowing, setIsFollowing] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true);
    const [userData, setUserData] = useState(null)


    const handleFollow = () => {
        setIsDisabled(true)
        if (isFollowing) {
            BASEAPI.delete(`followers/${currentUser.current.id}/${userData.id}`)
                .finally(() => {
                    setIsFollowing((prevIsFollow) => !prevIsFollow)
                    setIsDisabled(false)
                })
        }
        else {
            const formData = new FormData();

            formData.append('user_id', currentUser.current.id);
            formData.append('following_id', userData.id);
            BASEAPI.post('followers', formData)
                .finally(() => {
                    setIsFollowing((prevIsFollow) => !prevIsFollow)
                    setIsDisabled(false)
                })
        }

    }

    useEffect(() => {
        BASEAPI.get(`users/${id}`)
            .then((response) => {
                setUserData(response.data.user)
                const followData = response.data.user.followers.find((user) => user.id === currentUser.current.id)
                if (typeof followData === 'undefined' || followData === null) {
                    setIsFollowing(false)
                }
                else {
                    setIsFollowing(true)
                }
                setIsDisabled(false)
            });
    }, [id])

    return (
        <div className="text-black flex-1 w-10/12 m-auto">
            <div className="inline-block align-top w-4/12 p-10">
                {
                    userData == null ?
                        <div className="w-full mt-5 h-1/2 text-2xl flex justify-center">
                            Loading...
                        </div> :
                        <div className="w-full mt-5">
                            <Avatar className="w-8/12 block m-auto" />
                            <div className="block align-top pt-2 text-center">
                                <Link to="activity"><span className="text-black block font-bold text-xl mt-5">{userData.full_name}</span></Link>
                                <div className='w-9/12 m-auto'>
                                    <Divider />
                                </div>
                                <div className="mt-3 flex w-8/12 m-auto">
                                    <div className="w-1/2">
                                        {userData.followers.length}
                                        <br />
                                        followers
                                    </div>
                                    <div className="w-1/2">
                                        {userData.following.length}
                                        <br />
                                        following
                                    </div>
                                </div>
                                {
                                    parseInt(id) === currentUser.current.id ?
                                        <></> :
                                        <button className="btn btn-primary mt-8 w-7/12" disabled={isFollowing == null || isDisabled} onClick={() => handleFollow()}>
                                            {isFollowing ? "Unfollow" : "Follow"}
                                        </button>
                                }
                                <Link to="history"><span className="text-blue-700 block mt-5">Learned 20 words</span></Link>
                            </div>
                        </div>
                }

            </div>
            <Outlet />
        </div>
    )
}

export default Profile;
