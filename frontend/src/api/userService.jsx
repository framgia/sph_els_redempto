import Cookies from 'js-cookie'
import BASEAPI from './baseApi'

const UserService = {
    getUser: (userId) => {
        return BASEAPI.get(`/users/${userId}`)
    },
    getUserActivity: (userId) => {
        return BASEAPI.get(`/users/${userId}/attempts`)
    },
    getUserAnswers: (userId) => {
        return BASEAPI.get(`/users/${userId}/answers`)
    },
    getFollowerActivity: (userId) => {
        return BASEAPI.get(`/users/${userId}/followings/attempts`)
    },
    getAllAttempts: () => {
        return BASEAPI.get('/attempts')
    },
    postAnswers: (formData, callback = () => {}) => {
        BASEAPI.post(`attempts`, formData)
            .finally(callback)
    },
    followUser: (user, following, callback = () => {}) => {
        const formData = new FormData();

        formData.append('user_id', user.id);
        formData.append('following_id', following.id);
        BASEAPI.post('followers', formData)
            .finally(callback)
    },
    unfollowUser: (user, following, callback = () => {}) => {
        BASEAPI.delete(`followers/${user.id}/${following.id}`)
            .finally(callback)
    },
    signup: (formData, setUser = () => { }, callback = () => { }) => {
        BASEAPI.post("register", formData)
            .then((response) => {
                const userData = JSON.stringify(response.data.user)
                setUser(userData)
                Cookies.set('user', userData)
                Cookies.set('token', response.data.token)
            })
            .finall(callback)
    },
    login: (username, password, setUser = () => { }, callback = () => { }) => {
        const formData = new FormData();
        formData.append('user_name', username);
        formData.append('password', password);

        BASEAPI.post("login", formData)
            .then((response => {
                if (response.status === 201) {
                    const userData = JSON.stringify(response.data.user)
                    setUser(userData)
                    Cookies.set('user', userData)
                    Cookies.set('token', response.data.token)
                }
            }))
            .finally(callback);
    },
    logout: (setUser = () => { }, callback = () => { }) => {
        BASEAPI.post('logout', {})
            .then((response) => {
                Cookies.remove('user')
                Cookies.remove('token')
                setUser(null)
            })
            .finally(callback);
    }
}

export default UserService
