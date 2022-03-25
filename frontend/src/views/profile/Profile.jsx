import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import Divider from '../../components/Divider';
import UserService from '../../api/userService';
import useUserActivityView from '../../hooks/useUserActivityView';
import { AppContext } from '../../context/AppContext';

const Profile = ({ view = "" }) => {
    const { id } = useParams();

    const context = useContext(AppContext)
    const currentUser = useRef(JSON.parse(context.user))

    const [isFollowing, setIsFollowing] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true);
    const [user, setUser] = useState(null)
    const [wordsLearned, setWordsLearned] = useState(0)

    const display = useUserActivityView(view, user);

    const handleFollow = () => {
        setIsDisabled(true)
        if (isFollowing) {
            UserService.unfollowUser(currentUser.current, user, () => {
                setIsFollowing((prevIsFollow) => !prevIsFollow)
                setIsDisabled(false)
            })
        }
        else {
            UserService.followUser(currentUser.current, user, () => {
                setIsFollowing((prevIsFollow) => !prevIsFollow)
                setIsDisabled(false)
            })
        }

    }

    useEffect(()=> {
        if (currentUser.current == null) return
    
        UserService.getUserAnswers(currentUser.current.id)
          .then(response => {
            setWordsLearned(response.data.answers.length)
          })
    }, [])

    const displayPage = () => {
        return (
            user != null ?
                (<div className="w-full mt-5">
                    <Avatar className="w-8/12 block m-auto" user={user} />
                    <div className="block align-top pt-2 text-center">
                        <Link to={`/users/${id}/activity`}>
                            <span className="text-black block font-bold text-xl mt-5">
                                {user != null && user.full_name}
                            </span>
                        </Link>
                        <div className='w-9/12 m-auto'>
                            <Divider />
                        </div>
                        <div className="mt-3 flex w-8/12 m-auto">
                            <div className="w-1/2">
                                {user.followers.length}
                                <span className="block">followers</span>
                            </div>
                            <div className="w-1/2">
                                {user.following.length}
                                <span className="block">following</span>
                            </div>
                        </div>
                        {
                            currentUser.current != null && parseInt(id) !== currentUser.current.id &&
                            <button className="btn btn-primary mt-8 w-7/12" disabled={isFollowing == null || isDisabled} onClick={() => handleFollow()}>
                                {isFollowing ? "Unfollow" : "Follow"}
                            </button>
                        }
                        <Link to={`/users/${id}/history`}><span className="text-blue-700 block mt-5">Learned {wordsLearned} words</span></Link>
                        {
                            currentUser.current != null && parseInt(id) === currentUser.current.id &&
                            <Link to={`/users/${id}/edit`} className="btn btn-ghost text-blue-800 w-7/12" disabled={isFollowing == null || isDisabled}>
                                Edit profile
                            </Link>
                        }
                    </div>
                </div>) :
                (<div className="w-full mt-5 h-1/2 text-2xl flex justify-center">
                    Loading...
                </div>)
        )
    }

    useEffect(() => {
        UserService.getUser(id)
            .then((response) => {
                setUser(response.data.user)
                if (currentUser.current != null) {
                    const followData = response.data.user.followers.find((user) => user.id === currentUser.current.id)
                    if (typeof followData === 'undefined' || followData === null) {
                        setIsFollowing(false)
                    }
                    else {
                        setIsFollowing(true)
                    }
                    setIsDisabled(false)
                }
            });
    }, [id])

    return (
        <div className="text-black flex-1 w-10/12 m-auto">
            {
                currentUser != null &&
                <>
                    <div className="inline-block align-top w-4/12 p-10">
                        {displayPage()}
                    </div>
                    {display}
                </>
            }
        </div>
    )
}

export default Profile;
