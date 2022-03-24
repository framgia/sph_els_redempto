import Avatar from './Avatar';
import { Link } from 'react-router-dom';
import DateHelper from '../helper/DateHelper';

function ActivityItem({ attempt }) {
    return (
        <div className="bg-blue-100 rounded-xl p-3 mb-2">
            <Avatar user={attempt.user}/>
            <div className="inline-block w-5/6 ml-4 mt-3">
                <div>
                    <Link to={`../../users/${attempt.user.id}/activity`}><span className="text-red font-bold">{attempt.user.full_name}</span> </Link>
                    learned {attempt.score} words in <span className="text-red font-bold">{attempt.category.title}</span>
                </div>
                <div>
                    <span className="text-gray-500 font-bold">{DateHelper.howLongSince(Date.parse(attempt.date_finished))}</span>
                </div>
            </div>
        </div>
    )
}

export default ActivityItem;
