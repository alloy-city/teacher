// gets teacher's courses from the http module.
// @in: http.get
// @out: ui.addCourses

import { get } from "../http"
import { addCoursesButtons } from "../ui"
import { addCourse } from "./index"

function getCourses() {
    get(`course/for-teacher`, res => {
        /// #if DEBUG
        // console.log(res)
        /// #endif
    
        if (res != 0){
            addCoursesButtons(res)
    
            for (let course of res){
                addCourse(course)
            }
        }
    });
}

export { getCourses }
