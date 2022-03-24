import React, { useEffect, useState } from 'react'
import UserService from '../../api/userService';
import Divider from '../../components/Divider';
import UserItem from './components/UserItem';

const Users = () => {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        UserService.getUsers()
            .then(response => setUserList(response.data.users))
    }, [])

    return (
        <div className="text-black flex-1 w-10/12 m-auto mt-10">
            <span className="text-2xl">Users</span>
            <Divider />
            <div className="w-full mt-5 h-most overflow-auto no-scrollbar">
                {
                    userList.map((user) => <UserItem user={user}/>)
                }
            </div>
        </div>
    )
}

export default Users;
