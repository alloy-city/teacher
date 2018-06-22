import { eclassSocket } from '../live'
import { getStudentIds } from '../course'

let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    /// #if DEBUG
    console.log("YouTube API is ready.");
    /// #endif
}

let players = {}

function loadVids(vids) {
    // console.log(vids)
    for (let i = 0; i < vids.length; i++) {
        // console.log('Building player '+i+'...')
        players[vids[i].resource] = new YT.Player('vid-' + vids[i]._id, {
            videoId: vids[i].resource,
            events: {
                'onStateChange': onPlayerStateChange
            }
        })
        // console.log('Player '+i+' built.');
    }
}

function onPlayerStateChange(event) {
    // console.log("Player state changed!");
    // console.log(event.data);
    /* state of the player
      -1 – unstarted
      0 – ended
      1 – playing
      2 – paused
      3 – buffering
      5 – video cued
    */

    // console.log(event.target.getVideoData().video_id);
    if (event.data == 1 || event.data == 2){
        let data = {
            resource: event.target.getVideoData().video_id,
            playerState: event.data,
            playerCurrentTime: event.target.getCurrentTime(),
            type: "video"
        }
    
        eclassSocket.emit('instruction', { to: getStudentIds(), from: Auth.userData._id, type: "control-video", resource: data })
    }
}

export { players, loadVids, onPlayerStateChange }