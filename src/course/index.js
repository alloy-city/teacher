import * as Get from "./get"
import { launchClass } from "./launch-class"
import { Course } from "./course"
import { activateTab } from '../ui'
import * as XP from './xp'

let courses = []
let selectedCourse

function addCourse(course){
    let c = new Course(
        course._id,
        course.title,
        course.description,
        course.level,
        course.theme,
        course.price,
        course.hangouts,
        course.students,
        course.teachers
    )

    courses.push(c)
}

function getStudentIds(){
    let studentIds = []

    for (let student of selectedCourse.students){
        studentIds.push(student._id)
    }

    return studentIds
}

function selectCourse(course){
    selectedCourse = course
}

export { courses, selectedCourse, selectCourse, launchClass, addCourse, activateTab, XP, getStudentIds }