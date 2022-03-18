import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const getUserCookie = (key) => {
    const cookie = Cookies.get(key)
    if (typeof cookie != 'undefined') {
        return JSON.parse(cookie);
    }
    return null;
}


const useCookie = (key) => {
    const [cookie, setCookie] = useState(() => getUserCookie(key));

    useEffect(() => {
        cookie == null ?
            Cookies.remove(key) :
            Cookies.set(key, JSON.stringify(cookie))
    }, [key, cookie]);

    return [cookie, setCookie];
}

export default useCookie;
