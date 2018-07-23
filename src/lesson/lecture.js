import { get, post } from '../http'
import { eclassSocket } from '../live'

let lecture = {
    selected: {},
    vids: [],
    audios: []
}

function selectEclassForLecture(id) {
    eclassSocket.emit('instruction', { to: Teacher.Course.selectedCourse.students, from: Auth.userData._id, type: "clear board" }); // clear board

    get(`eclass/full/${id}`, lesson => {
        /// #if DEBUG
        console.log(lesson)
        /// #endif

        Teacher.Lesson.clearClassRoomEclassDisplay()
        Teacher.Lesson.lecture.selected = lesson
        Teacher.Lesson.lecture.audios = []
        Teacher.Lesson.lecture.vids = []

        Teacher.Lesson.formatClassToLecture(lesson);
    })
}

function sendResourceToStudents(id) {

    console.log(id)

    let students = []
    for (let student of Teacher.Course.selectedCourse.students){
        students.push(student._id)
    }

    // get element
    let resourceElement = document.getElementsByName(id)[0]
    console.log(resourceElement)

    if (resourceElement.nextElementSibling) resourceElement.nextElementSibling.remove()

    // create ui acknowledgement bubbles with student ids.
    let bubbleContainer = document.createElement("div")
    bubbleContainer.classList = "ack-bubble-container"
    for (let student of Teacher.Course.selectedCourse.students){
        console.log(student)
        let bubble = htmlToElement(`
            <div id="ack-bubble-student-${student._id}-resource-${id}" class="ack-bubble">
                <div class="spinner">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                </div>
                ${student.name || student.mainEmail}
            </div>
        `)

        bubbleContainer.appendChild(bubble)
    }
    let p = resourceElement.parentElement
    p.appendChild(bubbleContainer)

    // remove onclick event and add button for retractResourceFromStudents(id)
    let retractButton = document.createElement("button")
    retractButton.classList.add("btn", "pull-right")
    retractButton.innerText = "Reprendre"
    retractButton.addEventListener("click", event => {
        Teacher.Lesson.retractResourceFromStudents(id)
        event.target.remove()
    })
    
    console.log(resourceElement)
    resourceElement.parentElement.lastChild.appendChild(retractButton)

    // prepare message
    let r = findElementInArrayOfObjectsByProperty(Teacher.Lesson.lecture.selected.owns, "_id", id);
    let msg = { to: students, from: Auth.userData._id, resource: r, type: 'resource' };
    if (eclassSocket) {
        // send message
        eclassSocket.emit('instruction', msg);
        $('[name="' + id + '"]').addClass('sent');
    }
}

function retractResourceFromStudents(id){
    console.log(`Retract resource ${id} from students.`)
    
    let element = document.getElementsByName(id)[0]

    let students = []
    for (let student of Teacher.Course.selectedCourse.students) {
        students.push(student._id)
    }

    element.setAttribute("onclick", `Teacher.Lesson.sendResourceToStudents('${id}')`)

    // remove acknowledgement div
    element.nextElementSibling.remove()

    // create ui acknowledgement bubbles with student ids.
    let bubbleContainer = document.createElement("div")
    bubbleContainer.classList = "ack-bubble-container"
    for (let student of Teacher.Course.selectedCourse.students) {
        console.log(student)
        let bubble = htmlToElement(`
            <div id="ack-bubble-student-${student._id}-resource-${id}" class="ack-bubble">
                <div class="spinner">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                </div>
                ${student.name || student.mainEmail}
            </div>
        `)

        bubbleContainer.appendChild(bubble)
    }
    element.parentElement.appendChild(bubbleContainer)

    // prepare message
    let msg = { to: students, from: Auth.userData._id, resource: {_id: id}, type: 'retract-resource' };
    if (eclassSocket) {

        // send message
        eclassSocket.emit('instruction', msg);

        // remove "sent" class
        element.classList = "resource"
    }
}

function sendEClassToStudents() {
    /// #if DEBUG
    console.log(Teacher.Course.selectedCourse)
    /// #endif

    if (Teacher.Course.selectedCourse == undefined || Teacher.Course.selectedCourse == '') console.error("No group selected. No Eclass sent.");
    else if (Teacher.Course.selectedCourse.students.length == 0) console.error("This group is empty. No Eclass sent.");
    else {
        
        
        for (let student of Teacher.Course.selectedCourse.students){
            let body = {
                user_id: student._id,
                product_id: Teacher.Lesson.lecture.selected._id
            }
    
            post(body, "product/give-access", res => {
                /// #if DEBUG
                console.log(res)
                /// #endif

                if (res == 0){
                    notify(`Apprenant ${student.mainEmail} avait déjà accès à cette leçon.`, "info", false)
                }

                if (res == "Success"){
                    notify(`Accès donné à ${student.mainEmail}.`, "success", false)
                }
            })
        }


    }
}

export { lecture, selectEclassForLecture, sendResourceToStudents, retractResourceFromStudents, sendEClassToStudents }