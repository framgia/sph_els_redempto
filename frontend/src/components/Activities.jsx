import React, { useEffect, useState } from 'react'
import Divider from './Divider';
import ActivityItem from './ActivityItem';
import UserService from '../api/userService';

const Activities = ({ user = null, followersOnly = false }) => {
  const [userActivity, setUserActivity] = useState([]);

  useEffect(() => {
    if (user == null) return
    if (!followersOnly) {
      UserService.getUserActivity(user.id)
        .then(response => {
          setUserActivity(response.data.attempts)
        })
    }
    else {
      UserService.getFollowerActivity(user.id)
        .then(response => {
          setUserActivity(response.data.attempts)
        })
    }
  }, [user, followersOnly])

  return (
    <div className="inline-block align-top h-full w-8/12 p-10 box-sizing">
      <span className="text-2xl">{(followersOnly && "Follow Feed") || "Activities"}</span>
      <Divider />
      <div className="w-full mt-5 h-most overflow-auto no-scrollbar">
        {
          userActivity.map((attempt) => <ActivityItem key={attempt.id} attempt={attempt} />)
        }
      </div>
    </div>
  )
}

export default Activities;
