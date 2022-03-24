
import { Link } from 'react-router-dom';
import Avatar from '../../../components/Avatar';

function UserItem({ user = null }) {
    return (
        <div className="bg-blue-100 rounded-xl p-3 mb-2">
            <Avatar user={user} />
            <div className="inline-block w-5/6 ml-4 mt-3">
                <div>
                    <Link to={`/users/${user.id}/activity`}><span className="text-red font-bold text-2xl">{user.full_name}</span> </Link>
                </div>
            </div>
        </div>
    )
}

export default UserItem;
