import { showUsersResult } from './show-results'

function getRecentUsers(){
    let headers = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
    })

    let init = {
        method: 'GET',
        headers: headers,
        mode: 'cors',
        cache: 'default'
    }

    fetch(`${apiDomain}/api/user/`, init).then((response) => {
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

export { getRecentUsers }