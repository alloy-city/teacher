// gets teacher's courses from the http module.
// @in: http.get
// @out: ui.addCourses

import { get } from "../http"
import { addCoursesButtons } from "../ui"
import { addCourse } from "./index"

get(`course/for-teacher`, res => {
    addCoursesButtons(res)
    
    for (let course of res){
        addCourse(course)
    }
})

export {}