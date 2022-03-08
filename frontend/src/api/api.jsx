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

const postFormData = async (uri, endpoint, formData) => {
    let user = await axios.post(
        `${uri}api/${endpoint}`,
        formData,
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    )
        .then((response) => {
            return response.data
        })
        .catch((response) => {
            console.log(response)
        })

    return user;
}

const authPostData = async (uri, endpoint, token, formData = {}) => {
    await axios.post(
        `${uri}api/${endpoint}`,
        formData,
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }
    )
        .then((response) => {
            return response
        })
        .catch((response) => {
            console.log(response)
        })
}

export { postFormData, getData, authPostData };
