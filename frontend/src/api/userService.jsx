import Cookies from 'js-cookie'
import BASEAPI from './baseApi'

const UserService = {
    getUser: (userId, headers = {}) => {
        return BASEAPI.get(`/users/${userId}`, headers)
    },
    getUsers: (headers = {}) => {
        return BASEAPI.get(`/users`, headers)
    },
    getUserActivity: (userId, headers = {}) => {
        return BASEAPI.get(`/users/${userId}/attempts`, headers)
    },
    getUserAnswers: (userId, headers = {}) => {
        return BASEAPI.get(`/users/${userId}/answers`, headers)
    },
    getFollowerActivity: (userId, headers = {}) => {
        return BASEAPI.get(`/users/${userId}/followings/attempts`, headers)
    },
    getAllAttempts: (headers = {}) => {
        return BASEAPI.get('/attempts', headers)
    },
    updateUser: (userId, formData, setUser, callback = () => { }) => {
        return BASEAPI.post(`/users/${userId}`, formData)
            .then((response) => {
                setUser(JSON.stringify(response.data.user))
            })
            .finally(callback)
    },
    postAnswers: (formData, callback = () => { }) => {
        BASEAPI.post(`attempts`, formData)
            .finally(callback)
    },
    followUser: (user, following, callback = () => { }) => {
        const formData = new FormData();

        formData.append('user_id', user.id);
        formData.append('following_id', following.id);
        BASEAPI.post('followers', formData)
            .finally(callback)
    },
    unfollowUser: (user, following, callback = () => { }) => {
        BASEAPI.delete(`followers/${user.id}/${following.id}`)
            .finally(callback)
    },
    signup: (formData, setUser = () => { }, errorHandle = () => {}, callback = () => { }) => {
        BASEAPI.post("register", formData)
            .then((response) => {
                if (response.status === 201) {
                    const userData = JSON.stringify(response.data.user)
                    setUser(userData)
                    Cookies.set('user', userData)
                    Cookies.set('token', response.data.token)
                }
            })
            .catch(errorHandle)
            .finally(callback)
    },
    login: (username, password, setUser = () => { }, exceptionHandle = () => {}, callback = () => { }) => {
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
            .catch(exceptionHandle)
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
    },
    isLoggedIn: () => {
        if (Cookies.get('user')) return true;
        return false;
    }
}

export default UserService
