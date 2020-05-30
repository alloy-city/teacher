function addOnlineUsersToDOM(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (Teacher.Live.onlineUsers.indexOf(arr[i]) == -1) {
            addOnlineUserToDOM(arr[i]);
        }
    }
}

function addOnlineUserToDOM(user) {
    let index = findIndexOfObjectInArrayByProperty(Teacher.Live.onlineUsers, "_id", user._id);

    if (Auth.userData._id != user._id) {
        if (index === undefined) {
            Teacher.Live.onlineUsers.push(user);
            let browserStatusMarkUp = "";

            if (user.compatibleBrowser == true) {
                browserStatusMarkUp = `<span class="glyphicon glyphicon-ok text-success" aria-hidden="true" title="Bon navigateur."></span>`;
            } else if (user.compatibleBrowser == false) {
                browserStatusMarkUp = `<span class="glyphicon glyphicon-remove text-success" aria-hidden="true" title="Mauvais navigateur."></span>`;
            }
            $('#classroom-online-users').append(`<p id="online-user-${user._id}">${user.email} ${user.name} ${browserStatusMarkUp}</p>`);
            
            notify(`<b>${user.email} ${user.name}</b> is online.`, 'success', false);
        }
    }
}

function removeOnlineUsersFromDOM(user) {
    let index = findIndexOfObjectInArrayByProperty(Teacher.Live.onlineUsers, "_id", user._id);

    if (index > -1) {
        Teacher.Live.onlineUsers.splice(index, 1);
        $('#online-user-' + user._id).remove();

        notify(`User ${user.email}/${user.name} disconnected.`, "warning", false);
    }
}

export { addOnlineUsersToDOM, addOnlineUserToDOM, removeOnlineUsersFromDOM }
