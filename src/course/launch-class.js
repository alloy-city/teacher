import { addHangoutTabs } from '../ui/add-hangout-tabs'

let xpControlLabels = document.getElementById("xpControlLabels")

function launchClass(_id){
    // console.log(_id)

    // http => ask for xps previously registered for users on this course.

    let index = findIndexOfObjectInArrayByProperty(Teacher.Course.courses, "_id", _id)

    Teacher.Course.selectCourse(Teacher.Course.courses[index])

    addHangoutTabs(Teacher.Course.courses[index])

    Teacher.Live.loadEventListeners()

    let students = []
    for (let student of Teacher.Course.courses[index].students){
        students.push(student._id)
    }
    // console.log(students)

    Teacher.Live.notifyUsersOfFacilitatorPresence(students)

    xpControlLabels.classList = ""
}

export { launchClass }