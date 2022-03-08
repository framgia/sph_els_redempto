import axios from 'axios';

const getData = async (uri, endpoint) => {
    let data = await axios.get(
        `${uri}api/${endpoint}`
        , {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    )
        .then((response) => response.data)
    return data
}

export { getData };
