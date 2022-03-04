import axios from 'axios';

const getData = (uri) => {
    let promise = axios.get(
        uri
        , {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    )
        .then((response) => response.data)
    return promise
}

export { getData };
