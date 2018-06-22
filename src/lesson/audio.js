import { eclassSocket } from '../live'
import { getStudentIds } from '../course'
import { lecture } from './lecture'

function loadAudios() {
    for (let i = 0; i < lecture.audios.length; i++) {
        // console.log(`[name="${lecture.audios[i].id}"]`)

        let element = document.querySelector(`#classroom-display-eclass [name="${lecture.audios[i].id}"]`)
        // let element = document.querySelector(`#classroom-display-eclass > [name="5b0ff87dcef36b23e0e25f69"]`)

        // let audioElements = document.getElementsByName(lecture.audios[i].id)
        console.log(element)

        $(element).children().last().before(lecture.audios[i].audio)
        $(element).children('audio').css('width', '100%')
        
    }
}

function isPlaying(a) {
    /// #if DEBUG
    console.log(a.target.name);
    console.log(a.target.currentTime);
    /// #endif

    var data = {
        resource: a.target.name,
        playerState: 'playing',
        playerCurrentTime: a.target.currentTime,
        type: "audio"
    }

    eclassSocket.emit('instruction', { to: getStudentIds(), from: Auth.userData._id, type: "control-audio", resource: data });
}

function isPaused(a) {
    /// #if DEBUG
    console.log(a.target.name);
    console.log(a.target.currentTime);
    /// #endif

    var data = {
        resource: a.target.name,
        playerState: 'paused',
        playerCurrentTime: a.target.currentTime,
        type: "audio"
    }

    eclassSocket.emit('instruction', { to: getStudentIds(), from: Auth.userData._id, type: "control-audio", resource: data });
}

export { loadAudios, isPlaying, isPaused }