import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import Divider from '../../components/Divider';

const Dashboard = () => {
    return (
        <div className="text-black flex-1 w-10/12 m-auto">
            <div className="inline-block align-top w-4/12 p-10">
                <span className="text-2xl">Dashboard</span>
                <Divider />
                <div className="w-full mt-5">
                    <Avatar />
                    <div className="inline-block align-top pt-2 ml-3">
                        <Link to="activity"><span className="text-black block font-bold">John Doe</span></Link>
                        <Link to="history"><span className="text-blue-300 block">Learned 20 words</span></Link>
                        <span className="text-black block">Learned 5 lessons</span>
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Dashboard;
