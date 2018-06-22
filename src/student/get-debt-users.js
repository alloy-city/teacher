import { showUsersResult } from './show-results'

function getDebtUsers() {
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

    fetch(`${apiDomain}/api/user/debt`, init).then((response) => {
        if (response.status === 200) {
            response.json().then(response => {
                console.log(response)
                showUsersResult(response)
            })
        } else {
            response.json().then(err => {
                console.log(err)
                notify(err, "warning", true)
            })
        }
    })
}

export { getDebtUsers }