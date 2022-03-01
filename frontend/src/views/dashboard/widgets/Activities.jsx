import React from 'react'
import Divider from '../../../components/Divider';
import ActivityItem from './ActivityItem';

const Activities = () => {
  const activityList = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
  ]
  return (
    <div className="inline-block align-top h-full w-8/12 p-10 box-sizing">
        <span className="text-2xl">Activities</span>
        <Divider/>
        <div className="w-full mt-5 h-most overflow-auto no-scrollbar">
          {activityList.map((activity) => <ActivityItem/>)}
        </div>
    </div>
  )
}

export default Activities;
