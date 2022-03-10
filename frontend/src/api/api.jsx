import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_API}`,
});

axiosInstance.defaults.headers.common['Accept'] = 'application/json';
axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';

// axiosInstance.defaults.headers.put['content-type'] = 'application/x-www-form-urlencoded';

export default axiosInstance;
