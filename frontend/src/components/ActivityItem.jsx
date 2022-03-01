import React from 'react'
import Avatar from './Avatar';
import {Link} from 'react-router-dom';

function ActivityItem() {
    return (
        <div className="bg-blue-100 rounded-xl p-3 mb-2">
            <Avatar />
            <div className="inline-block w-5/6 ml-4 mt-3">
                <div>
                    <Link to = "../../users/1/activity"><span className="text-red font-bold">User </span> </Link>
                    learned 20 of 20 words in <span className="text-red font-bold">Category</span>
                </div>
                <div>
                    <span className="text-gray-500 font-bold">2 days ago</span>
                </div>
            </div>
        </div>
    )
}

export default ActivityItem;