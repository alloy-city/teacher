import { save } from './save'
import { isHangoutAll } from './is-hangout-all'
import { isMissionAll } from './is-mission-all'
import { findTotal } from './find-total'

function sliderMoved(element, hangout) {
    let student = element.getAttribute('data-student')

    /// #if DEBUG
    console.log(hangout, student)
    /// #endif

    findTotal(hangout, student)
}

function sliderDroped(element, hangout) {
    let xp = Number(element.value)
    let btn = element.getAttribute('data-btn')
    let student = element.getAttribute('data-student')

    /// #if DEBUG
    console.log(xp, btn, student, hangout)
    /// #endif

    isHangoutAll(student, hangout);
    isMissionAll(student, hangout);
    save(Teacher.Course.selectedCourse._id, student, xp, btn, hangout);
}

export { sliderMoved, sliderDroped }