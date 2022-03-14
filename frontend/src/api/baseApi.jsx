import axios from 'axios';
import Cookies from 'js-cookie';

const BASEAPI = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_API}`,
});

BASEAPI.defaults.headers.common['Accept'] = 'application/json';
BASEAPI.defaults.headers.common['Content-Type'] = 'application/json';
BASEAPI.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

export default BASEAPI
