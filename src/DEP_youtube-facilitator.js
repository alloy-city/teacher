// 2016-12-23
/*
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {}

var players = {}

function loadVids(vids) {
    for (var i = 0; i < vids.length; i++) {
        players[vids[i].resource] = new YT.Player('vid-' + vids[i]._id, {
            videoId: vids[i].resource,
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
    }
}

function onPlayerStateChange(event) {
    var vidData = [];
    vidData[0] = event.target.getVideoData().video_id;
    vidData[1] = event.data;
    vidData[2] = event.target.getCurrentTime();

    var data = {
        resource: event.target.getVideoData().video_id,
        playerState: event.data,
        playerCurrentTime: event.target.getCurrentTime(),
        type: "video"
    }

    eclassSocket.emit('instruction', { to: selectedGroup.users, from: Auth.userData.id, type: "control-video", resource: data });

    return false;
}
*/
