import { showStudentDetails } from './show-details'
import { selected } from './index'

function getStudentDetails(id){
    console.log("getStudentDetails called.", id)

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

    fetch(`${apiDomain}/api/user/${id}`, init).then((response) => {
        if (response.status === 200) {
            response.json().then(response => {
                console.log(response)
                selected.setSelected(response)
                showStudentDetails(response)
            })
        } else {
            response.json().then(err => {
                console.log(err)
                notify(string.auth.wrongCode, "warning", true)
            })
        }
    })
}

export { getStudentDetails }