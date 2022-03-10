import axios from 'axios';

const API = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_API}`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export { API };
