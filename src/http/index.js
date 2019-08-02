// perform HTTP requests.

function http(method, body, route, callback) {
    /// #if DEBUG
    // console.log(`${apiDomain}/api/${route}`)
    /// #endif

    let headers = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
    })

    let init = {
        method: method,
        headers: headers,
    }

    if (body) {
        init.body = JSON.stringify(body)
    }

    fetch(`${apiDomain}/api/${route}`, init).then(response => {
        /// #if DEBUG
        // console.log(response.status)
        /// #endif

        if (response.status == 304) {
            callback(304)
        }

        if (response.status == 204) {
            callback(0)
        }

        if (response.status == 401) {
            notify("Unauthorized", "warning", false);
        }

        if (response.status == 200) {
            response.json().then(callback)
        } else {
            /// #if DEBUG
            // console.log(response)
            /// #endif
        }
    }).catch(reason => {
        /// #if DEBUG
        // console.log(reason)
        /// #endif
    })
}

function get(route, callback) {
    http("GET", null, route, callback)
}

function post(body, route, callback) {
    http("POST", body, route, callback)
}

export { get, post }