// 2016-12-23

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
  // console.log("YouTube API is ready.");
}

var players = {}

function loadVids(vids){
	for (var i=0; i<vids.length; i++){
		// console.log('Building player '+i+'...');
		players[vids[i].resource] = new YT.Player('vid-' + vids[i]._id, {
			videoId: vids[i].resource,
			events: {
				'onStateChange': onPlayerStateChange
			}
		});
		// console.log('Player '+i+' built.');
	}
}

function onPlayerStateChange(event){
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

	// if (sounds.length > 0){
	// 	soundManager.pauseAll();
	// }

	/*
	//Gatters information about YT player when it's status changes and send it to Node server.
	// console.log(vidData);
	// event.target.m.id == video id
	// vidData[0] == video index in board elements
	// vidData[1] == video state
	// vidData[2] == video time
	*/

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

	eclassSocket.emit('instruction', { to: selectedGroup.users, from: Auth.userData.id, type: "control-video", resource: data});

	return false;
}

/*
var tempChosenVid = '';
function picVid(x){
	// console.log(x);
	//pause audio boardVidPlayers
	//window.sm2BarPlayers[0].actions.pause();

	if (x.length > 4){
		// console.log('x.length IS greater than 4. -> '+x);
		tempChosenVid = x;
		playYTVid();
	}else{
		// console.log('x.length IS NOT greater than 4. -> '+x);
		var slideNumberVid = Number(x.slice(2));

		//boardSocket.emit('play vid', slideNumberVid);
		// console.log(vidsIds);
		// console.log(vidsIds[x]);
		tempChosenVid = vidsIds[x];
		playYTVid();
	}

	// var vidData = [];
	// vidData[0] = classElements.indexOf(event.target.getVideoData()['video_id']);
	// vidData[1] = event.data;
	// vidData[2] = event.target.getCurrentTime();
	//
	// boardSocket.emit('play vid', vidData);

}

function playYTVid(){

	if(vidPlaying == ''){
		vidPlaying = tempChosenVid;
		$('#sl'+currentSlide).fadeOut(200, function(){
			$('#'+tempChosenVid).fadeIn(150, function(){
				// console.log('fisrt time playing vid. '+tempChosenVid);
				lastSlide = currentSlide;
				currentSlide = -1; // -1 means it's a video
				boardVidPlayers[tempChosenVid].playVideo();


				// boardSocket.emit('play vid', vidData);
				// boardVidPlayers[tempChosenVid].pauseVideo();


			});
		});
	}else if(vidPlaying == tempChosenVid){
		// console.log('Pause.');
		boardVidPlayers[vidPlaying].pauseVideo();
	}else{
		$('#'+vidPlaying).fadeOut(200, function(){
			//console.log('Did '+vidPlaying+' fade out?'); // yes
			$('#'+tempChosenVid).fadeIn(150, function(){
				 //console.log('#'+tempChosenVid+' fades in ... - '+'var "vidPlaying" is '+vidPlaying);
				boardVidPlayers[tempChosenVid].playVideo();

				// boardSocket.emit('play vid', vidData);
				// boardVidPlayers[tempChosenVid].pauseVideo();


				 //console.log('Play player '+tempChosenVid+' ...');
				boardVidPlayers[vidPlaying].pauseVideo();
				 //console.log('Pause player '+vidPlaying);
				vidPlaying = tempChosenVid;
				 //console.log('var "vidPlaying" becomes '+tempChosenVid);
			});
		});
	}
}
*/
