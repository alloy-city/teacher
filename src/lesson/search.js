import { get } from '../http'

function classroomSearchEclass() {
    /// #if DEBUG
    console.log('classroomSearchEclass');
    /// #endif

    clearClassRoomEclassDisplay();
    let search = $("#classroom-eclass-search").val()

    if (search.length > 0) {
        get(`eclass/search/${search}`, lessons => {
            if (lessons.length > 0) {
                markUpClassRoomEclassList(lessons)
            }
        })
    } else {
        classroomGetLatestEclasses()
    }
}

function classroomGetLatestEclasses() {
    /// #if DEBUG
    console.log('classroomGetLatestEclasses')
    /// #endif

    get("eclass", lessons => {
        /// #if DEBUG
        console.log(lessons)
        /// #endif
        clearClassRoomEclassDisplay()
        markUpClassRoomEclassList(lessons)
    })
}

function clearClassRoomEclassDisplay() {
    $('#classroom-display-eclass').html('')
    Teacher.Live.clearBoard()
}

function markUpClassRoomEclassList(arr) {
    var markUp = '<table class="table table-striped"><tr><th>titre</th><th>sous-titre</th></tr>'
    for (var i = 0; i < arr.length; i++) {
        var tags = '';
        if (arr[i].tags) {
            for (var ii = 0; ii < arr[i].tags.length; ii++) {
                tags = tags + '<span class="label label-default pull-right">' + arr[i].tags[ii] + '</span>';
            }
        }
        markUp += `
            <tr class="info" onclick="Teacher.Lesson.selectEclassForLecture('${arr[i]._id}')" role="button">
                <td>${arr[i].title}${tags}</td>
                <td>${arr[i].subtitle}</td>
            </tr>`
    }
    markUp = markUp + '</table>';
    $('#classroom-display-eclass').append(markUp);
}

export { classroomSearchEclass, classroomGetLatestEclasses, clearClassRoomEclassDisplay, markUpClassRoomEclassList }