import { showStudentDetails } from './show-details';
import { selected } from './index';
import { get } from '../http';
import { formatMeetings } from './format-meetings';

function getStudentDetails(id){
    /// #if DEBUG
    // console.log("getStudentDetails called.", id);
    /// #endif

    let searchResults = document.getElementById("searchResult");
    searchResults.classList.add("wait");

    let headers = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
    });

    let init = {
        method: 'GET',
        headers: headers,
        mode: 'cors',
        cache: 'default'
    };

    fetch(`${apiDomain}/api/user/${id}`, init).then((response) => {
        if (response.status === 200) {
            response.json().then(response => {
                /// #if DEBUG
                // console.log(response);
                /// #endif

                selected.setSelected(response);
                showStudentDetails(response);

                get(`meeting/student/${id}`, meetings => {
                    formatMeetings(meetings);
                    searchResults.classList.remove("wait");
                });
            });
        } else {
            response.json().then(err => {
                /// #if DEBUG
                console.log(err);
                /// #endif
                notify(string.auth.wrongCode, "warning", true);
            });
        }
    });
}

export { getStudentDetails }
