const getData = (uri) => {
    let promise = fetch(uri
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

export { getData };
