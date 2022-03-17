import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BASEAPI from '../../api/baseApi';
import Avatar from '../../components/Avatar';
import Activities from '../../components/Activities';
import WordsLearned from '../../components/WordsLearned';
import Divider from '../../components/Divider';
import UserService from '../../api/userService';
import Cookies from 'js-cookie'

const Profile = ({view = ""}) => {
    const { id } = useParams();
    const currentUser = useRef(null);

    const cookie = Cookies.get('user')
    if (typeof cookie != 'undefined') {
        currentUser.current = JSON.parse(cookie);
    }

    const [isFollowing, setIsFollowing] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true);
    const [user, setUser] = useState(null)


    const handleFollow = () => {
        setIsDisabled(true)
        if (isFollowing) {
            BASEAPI.delete(`followers/${currentUser.current.id}/${user.id}`)
                .finally(() => {
                    setIsFollowing((prevIsFollow) => !prevIsFollow)
                    setIsDisabled(false)
                })
        }
        else {
            const formData = new FormData();

            formData.append('user_id', currentUser.current.id);
            formData.append('following_id', user.id);
            BASEAPI.post('followers', formData)
                .finally(() => {
                    setIsFollowing((prevIsFollow) => !prevIsFollow)
                    setIsDisabled(false)
                })
        }

    }

    useEffect(() => {
        UserService.getUser(id)
            .then((response) => {
                setUser(response.data.user)
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

    const display = (view, user) => {
        switch (view) {
            case 'activity':
                return <Activities user={user} />
            case 'history':
                return <WordsLearned />
            default:
                return <></>
        }
    }

    return (
        <div className="text-black flex-1 w-10/12 m-auto">
            <div className="inline-block align-top w-4/12 p-10">
    {
        user == null ?
            <div className="w-full mt-5 h-1/2 text-2xl flex justify-center">
                Loading...
            </div> :
            <div className="w-full mt-5">
                <Avatar className="w-8/12 block m-auto" />
                <div className="block align-top pt-2 text-center">
                    <Link to="activity">
                        <span className="text-black block font-bold text-xl mt-5">{
                            user != null ?
                                user.full_name :
                                ""
                        }
                        </span>
                    </Link>
                    <div className='w-9/12 m-auto'>
                        <Divider />
                    </div>
                    <div className="mt-3 flex w-8/12 m-auto">
                        <div className="w-1/2">
                            {user.followers.length}
                            <br />
                            followers
                        </div>
                        <div className="w-1/2">
                            {user.following.length}
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
                        {display(view, user)}
                    </div>
                    )
}

                    export default Profile;
