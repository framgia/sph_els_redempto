import BASEAPI from "./baseApi"

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
    getAllAttempts: () => {
        return BASEAPI.get('/attempts')
    }
}

export default UserService
