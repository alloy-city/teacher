import { loadAudios, isPlaying, isPaused } from './audio'
import { loadVids } from './video'
import { pointer } from './pointer';

function markUpFacilitatorParagraphs(string) {
    var arr = string.split('\n');
    var markUp = '';
    for (var i = 0; i < arr.length; i++) {
        markUp += '<p>' + arr[i] + '<p>';
    }
    return markUp;
}

function formatClassToLecture(EClass) {
    // console.log(EClass)

    let eclassHeader = `
        <div class="">
            <h2>${EClass.title}<small> - ${EClass.subtitle} </small>
            <button type="button" class="btn btn-danger btn-xs" onclick="Teacher.Lesson.sendEClassToStudents()">Donner accès</button></h2>
            <p>${EClass.description}</p>
            <div class="well eclass-facilitatorsOnly facilitatorsOnly">
                <span class="facilitator-label label label-default pull-right">pour le facilitateur</span>
                ${markUpFacilitatorParagraphs(EClass.facilitatorOnly)}
            </div>
        </div>`

    // var header = '<div class=""><h3>'+EClass.title+'<small> - '+EClass.subtitle+'</small></h2><p>'+EClass.description+'</p><div class="well facilitatorsOnly"><span class="facilitator-label label label-default pull-right">pour le facilitateur</span><p>'+EClass.facilitatorOnly+'</p></div></div>'
    let resources = `<div id="${EClass._id}" class="eclass">`

    for (let resource of EClass.owns) {
        // console.log(resource)
        resources += markUpResourceToLecture(resource)
    }

    resources += '</div>'
    $('#classroom-display-eclass').append(eclassHeader + resources);
    if (Teacher.Lesson.lecture.audios.length > 0) loadAudios();
    if (Teacher.Lesson.lecture.vids.length > 0) {
        // console.log("===>", Teacher.Lesson.lecture.vids)
        loadVids(Teacher.Lesson.lecture.vids)
    }

    pointer()
}

function markUpResourceToLecture(oneResource) {
    // console.log(oneResource)

    let facilitatorMarkUp = '<div class="facilitatorsOnly well"><span class="label label-default pull-right">pour le facilitateur</span><p>' + markUpFacilitatorParagraphs(oneResource.facilitatorOnly) + '</p></div></div></div>';

    let tags = ''
    if (oneResource.tags) {
        for (let i = 0; i < oneResource.tags.length; i++) {
            tags = tags + '<span class="label label-default">' + oneResource.tags[i] + '</span>';
        }
    }

    let markUpHeader = `<div class="resource-container"><div class="resource" name="${oneResource._id}" onclick="Teacher.Lesson.sendResourceToStudents('${oneResource._id}')">`

    let vidMarkUpHearder = `<div class="resource" name="${oneResource._id}">`

    let markUp = markUpHeader
    var items = ''
    if (oneResource.type == "html") {
        markUp = markUp + '<span class="label label-info">' + oneResource.type + '</span>' + tags + '' + oneResource.resource;
    } else if (oneResource.type == "text") {
        markUp = markUp + '<span class="label label-info">' + oneResource.type + '</span>' + tags + '<p>' + oneResource.resource + '</p>';
    } else if (oneResource.type == "image") {
        markUp += `<span class="label label-info">${oneResource.type}</span>${tags}<img name="${oneResource._id}" class="slide img-responsive" src="images/slides/${oneResource.resource}" />`
    } else if (oneResource.type == "audio") {
        // console.log(oneResource.type)

        let oneAudio = {
            id: oneResource._id,
            audio: document.createElement("AUDIO")
        }

        // console.log(oneAudio)
        
        oneAudio.audio.src = `media/${oneResource.resource}`
        oneAudio.audio.name = oneResource._id
        oneAudio.audio.controls = true
        oneAudio.audio.onplay = isPlaying
        oneAudio.audio.onpause = isPaused
        // console.log(oneAudio)

        Teacher.Lesson.lecture.audios.push(oneAudio);

        markUp = markUp + '<span class="label label-info">' + oneResource.type + '</span>' + tags + '<p>' + oneResource.resource;

        // console.log(markUp)

    } else if (oneResource.type == "video") {
        console.log("resource is a video.")
        console.log(oneResource)
        markUp += `
            <span class="label label-info">${oneResource.type}</span>
            ${tags}
            <div class="embed-responsive embed-responsive-16by9">
                <div id="vid-${oneResource._id}"></div>
            </div>`
        
        Teacher.Lesson.lecture.vids.push({ _id: oneResource._id, resource: oneResource.resource });
    } else if (oneResource.type == "open") {
        markUp = markUp + '<span class="label label-danger">' + oneResource.type + '</span>' + tags + '<p>' + oneResource.resource.question + '</p>';
    } else if (oneResource.type == "choice") {
        for (var i = 0; i < oneResource.resource.items.length; i++) {
            items = items + '<li>' + oneResource.resource.items[i] + '</li>';
        }
        markUp = markUp + '<span class="label label-primary">' + oneResource.type + '</span>' + tags + '<p>' + oneResource.resource.question + '</p><ol>' + items + '</ol>';
    } else if (oneResource.type == "order") {
        for (var i = 0; i < oneResource.resource.items.length; i++) {
            items = items + '<li>' + oneResource.resource.items[i] + '</li>';
        }
        markUp = markUp + '<span class="label label-success">' + oneResource.type + '</span>' + tags + '<p>' + oneResource.resource.question + '</p><ol>' + items + '</ol>';
    } else if (oneResource.type == "gaps") {
        items = '<p>'
        for (var i = 0; i < oneResource.resource.items.length; i++) {
            if (isEven(i)) items = items + oneResource.resource.items[i] + ' ';
            else items = items + '<mark><b class="text-danger">' + oneResource.resource.items[i] + '</b></mark> ';
        }
        items = items + '</p>';
        markUp = markUp + '<span class="label label-warning">' + oneResource.type + '</span>' + tags + '<p>' + oneResource.resource.question + '</p>' + items;
    }

    // console.log(markUp + facilitatorMarkUp)

    return markUp + facilitatorMarkUp;
}

export { markUpFacilitatorParagraphs, formatClassToLecture, markUpResourceToLecture }