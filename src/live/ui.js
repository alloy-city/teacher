function addOnlineUsersToDOM(arr) {
    // console.log(arr);

    for (var i = 0; i < arr.length; i++) {
        if (Teacher.Live.onlineUsers.indexOf(arr[i]) == -1) {
            addOnlineUserToDOM(arr[i]);
        }
    }
}

function addOnlineUserToDOM(user) {
    /// #if DEBUG
    // console.log(user)
    /// #endif

    let index = findIndexOfObjectInArrayByProperty(Teacher.Live.onlineUsers, "_id", user._id);
    
    /// #if DEBUG
    // console.log(index)
    /// #endif

    if (Auth.userData._id != user._id) {
        if (index === undefined) {
            Teacher.Live.onlineUsers.push(user);
            let browserStatusMarkUp = "";
            if (user.compatibleBrowser == true) {
                browserStatusMarkUp = `<span class="label label-info">good browser</span>`
            } else if (user.compatibleBrowser == false) {
                browserStatusMarkUp = `<span class="label label-danger">uncompatible browser</span>`
            }
            $('#classroom-online-users').append(`<p id="online-user-${user._id}">${user.email} ${user.name} ${browserStatusMarkUp}</p>`);
            notify(`<b>${user.email} ${user.name}</b> is online.`, 'success', false);
        }
    }
}

function removeOnlineUsersFromDOM(user) {
    /// #if DEBUG
    // console.log(user)
    /// #endif

    let index = findIndexOfObjectInArrayByProperty(Teacher.Live.onlineUsers, "_id", user._id);

    /// #if DEBUG
    // console.log(index)
    /// #endif

    if (index > -1) {
        Teacher.Live.onlineUsers.splice(index, 1);
        $('#online-user-' + user._id).remove();
        notify(`User ${user.email}/${user.name} disconnected.`, "warning", false);
    }
}

export { addOnlineUsersToDOM, addOnlineUserToDOM, removeOnlineUsersFromDOM }