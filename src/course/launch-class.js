import { addHangoutTabs } from '../ui/add-hangout-tabs';
import { getCourses, clearCourses } from './index';
import { leaveClassroom } from '../live';

let hangoutsTabs = document.getElementById("hangoutsTabs");
let xpControlLabels = document.getElementById("xpControlLabels");
let userXPControls = document.getElementById("usersXpControls");
let doors = document.getElementById("teacher-course-buttons");
let titleSpan = document.getElementById("course-header-title");
let closeButton = document.getElementById("course-header-close");

closeButton.onclick = () => {
    xpControlLabels.classList.add("hidden");
    closeButton.classList.add("hidden");
    userXPControls.innerHTML = "";
    doors.classList.remove("hidden");
    doors.innerHTML = "";
    hangoutsTabs.innerHTML = "";
    titleSpan.innerText = "";

    clearCourses();
    getCourses();
    leaveClassroom();
}

function launchClass(_id, title){
    doors.classList.add("hidden");
    closeButton.classList.remove("hidden");
    titleSpan.innerText = title;
    let index = findIndexOfObjectInArrayByProperty(Teacher.Course.courses, "_id", _id);
    Teacher.Course.selectCourse(Teacher.Course.courses[index]);
    addHangoutTabs(Teacher.Course.courses[index]);
    Teacher.Live.loadEventListeners();

    let students = [];
    for (let student of Teacher.Course.courses[index].students){
        students.push(student._id);
    }

    Teacher.Live.notifyUsersOfFacilitatorPresence(students);
    xpControlLabels.classList = "";
}

export { launchClass }
