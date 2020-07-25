import { addOnlineUserToDOM, addOnlineUsersToDOM, removeOnlineUsersFromDOM } from "./ui"
import compatibleBrowser from './compatible-browser'

let eclassSocket = io.connect(socketDomain)
let onlineUsers = [];

eclassSocket.on('welcome', (data) => {
    /// #if DEBUG
    // console.log(data)
    /// #endif

    let user = {
        _id: Auth.userData._id,
        email: Auth.userData.mainEmail,
        name: Auth.userData.name || "",
        accessLevel: Auth.userData.accessLevel,
        compatibleBrowser: compatibleBrowser()
    }

    eclassSocket.emit('handshake', user);
});

eclassSocket.on('user-online', user => {
    let index = findIndexOfObjectInArrayByProperty(onlineUsers, "_id", user._id)
    if (index) {
        onlineUsers.push(user)
    }

    // Teacher.Course.selectedCourse.students // array of Student objects
    if (Teacher.Course.selectedCourse){
        let toBeNotified = []
        for (let s of Teacher.Course.selectedCourse.students){
            if (s._id == user._id){
                toBeNotified.push(s._id)
            }
        }
        notifyUsersOfFacilitatorPresence(toBeNotified)
    }

    addOnlineUserToDOM(user);
})

eclassSocket.on('users-online', addOnlineUsersToDOM);
eclassSocket.on('user-left', removeOnlineUsersFromDOM);

function loadEventListeners() {
    eclassSocket.on("instruction", interpretEvent);
    eclassSocket.on('ack', interpretEvent);
}

function notifyUsersOfFacilitatorPresence(users) {
    eclassSocket.emit('teacher-present', { teacher: { _id: Auth.userData._id, name: Auth.userData.name }, users: users });
}

function clearBoard(){
    let body = {
        type: "clear board",
        to: Teacher.Course.getStudentIds(),
        from: Auth.userData._id
    }

    eclassSocket.emit("instruction", body)
}

function interpretEvent(instruction) {

    if (instruction.type == "resource" || instruction.type == "retract-resource"){
        // add "received" mark to ui acknowledgement bubbles.
        let icon = document.querySelector(`#ack-bubble-student-${instruction.receivedBy}-resource-${instruction.resource_id} .spinner`)
        /// #if DEBUG
        // console.log(icon)
        /// #endif
    
        icon.innerHTML = ""
        icon.appendChild(htmlToElement(`<span class="glyphicon glyphicon-ok" style="color:#5f9ea0" aria-hidden="true"></span>`))
    }
}

function leaveClassroom() {
    let body = {
        to: Teacher.Course.getStudentIds(),
        from: Auth.userData._id
    }

    eclassSocket.emit('teacher-left', body);
}

export {
    eclassSocket,
    onlineUsers,
    loadEventListeners,
    notifyUsersOfFacilitatorPresence,
    interpretEvent,
    clearBoard,
    leaveClassroom
}
