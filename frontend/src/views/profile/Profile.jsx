import React, {useState} from 'react'
import { Link, Outlet } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import Divider from '../../components/Divider';

const Profile = () => {
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollow = () => {
        setIsFollowing((prevIsFollow) => !prevIsFollow);
    }

    return (
        <div className="text-black flex-1 w-10/12 m-auto">
            <div className="inline-block align-top w-4/12 p-10">
                <div className="w-full mt-5">
                    <Avatar className="w-8/12 block m-auto" />
                    <div className="block align-top pt-2 text-center">
                        <Link to="activity"><span className="text-black block font-bold text-3xl mt-5">John Doe</span></Link>
                        <div className='w-9/12 m-auto'>
                            <Divider />
                        </div>
                        <div className="mt-3 flex w-8/12 m-auto">
                            <div className="w-1/2">
                                12
                                <br />
                                followers
                            </div>
                            <div className="w-1/2">
                                32
                                <br />
                                following
                            </div>
                        </div>
                        <button className="btn btn-primary mt-8 w-7/12" onClick={() => handleFollow()}>
                            { isFollowing ? "Unfollow" : "Follow"}
                        </button>
                        <Link to="history"><span className="text-blue-700 block mt-5">Learned 20 words</span></Link>
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Profile;
