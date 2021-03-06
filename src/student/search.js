import { showUsersResult } from './show-results'

function searchUsers(search) {
    /// if DEBUG
    // console.log(search)
    /// endif

    let headers = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
    })

    let init = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ "search": search }),
        mode: 'cors',
        cache: 'default'
    }

    fetch(`${apiDomain}/api/user/search/`, init).then((response) => {
        if (response.status === 200) {
            response.json().then(response => {
                /// if DEBUG
                // console.log(response)
                /// endif

                showUsersResult(response)
            })
        } else {
            response.json().then(err => {
                console.log(err)
                notify(string.auth.wrongCode, "warning", true)
            })
        }
    })
}

export { searchUsers }