import { useState, useEffect } from 'react';

const getStorageValue = (key, defaultValue) => {
    let saved = localStorage.getItem(key);
    if (typeof saved === 'undefined') {
        saved = null
        localStorage.setItem(key, null);
    }
    const initial = JSON.parse(saved);
    return initial;
}

const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        return getStorageValue(key, defaultValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;
