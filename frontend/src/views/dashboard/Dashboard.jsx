import React from 'react'
import { Link } from 'react-router-dom';
import Activities from '../../components/Activities';
import WordsLearned from '../../components/WordsLearned';
import Avatar from '../../components/Avatar';
import Divider from '../../components/Divider';
import Cookies from 'js-cookie'

const display = (view, user) => {
    switch (view) {
        case 'activity':
            return <Activities user={user} showAll={true}/>
        case 'history':
            return <WordsLearned />
        default:
            return <></>
    }
}

const Dashboard = ({ view = "" }) => {
    const cookieString = Cookies.get('user')
    let user = null
    if (typeof cookieString != 'undefined') {
        user = JSON.parse(cookieString)
    }

    return (
        <div className="text-black flex-1 w-10/12 m-auto">
            {
                user != null ?
                    <>
                        <div className="inline-block align-top w-4/12 p-10">
                            <span className="text-2xl">Dashboard</span>
                            <Divider />
                            <div className="w-full mt-5">
                                <Avatar />
                                <div className="inline-block align-top pt-2 ml-3">
                                    <Link to="/dashboard/activity">
                                        <span className="text-black block font-bold">
                                            {user.full_name}
                                        </span>
                                    </Link>
                                    <Link to="/dashboard/history"><span className="text-blue-300 block">Learned 20 words</span></Link>
                                    <span className="text-black block">Learned 5 lessons</span>
                                </div>
                            </div>
                        </div>
                        {display(view, user)}
                    </> :
                    <div className="inline-block align-top w-4/12 p-10"></div>
            }
        </div>
    )
}

export default Dashboard;
