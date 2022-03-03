const getData = () => {
    let promise = fetch('./data.json'
        , {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    )
    .then((response) => response.json())
    return promise
}

export default getData;

