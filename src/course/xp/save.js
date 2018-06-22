import { post } from "../../http"

function save(course, user, xp, skill, hangout) {
    console.log(course, user, xp, skill, hangout);

    let body = {
        course,
        user,
        xp,
        skill,
        hangout
    }

    post(body, `xp/course`, res => {
        console.log(res)
        $(`.total-xp-user-${res._id}`).text(res.xp)
        // TODO eclassSocket.emit('instruction', { to: [user], from: Auth.userData._id, type: "update-xp" });
    })
}

function full(course, user, hangout, instruction){

    let body = {
        course,
        user,
        hangout
    }

    post(body, `xp/${instruction}`, res => {
        console.log(res)
        $(`.total-xp-user-${res._id}`).text(res.xp)
    })
}

export { save, full }