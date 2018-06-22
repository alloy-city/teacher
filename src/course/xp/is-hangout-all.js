import { findTotal } from "./find-total";
import { skillMaxP } from './skill-constants'

function isHangoutAll(student, hangout) {
    let tab = $(`#hangout-tab-${hangout}`)

    let presence = tab.find("[data-student='" + student + "'][data-btn='presence']").hasClass('buttonSelected')
    let ponctuality = tab.find("[data-student='" + student + "'][data-btn='ponctuality']").hasClass('buttonSelected')
    let participation = tab.find("[data-student='" + student + "'][data-btn='participation']").val()
    let oral_expr = tab.find("[data-student='" + student + "'][data-btn='oral_expr']").val()
    let hangout_skill = tab.find("[data-student='" + student + "'][data-btn='hangout_skill']").val()
    let listening = tab.find("[data-student='" + student + "'][data-btn='listening']").val()

    if (
        presence == true &&
        ponctuality == true &&
        participation == skillMaxP.participation &&
        oral_expr == skillMaxP.oral_expr &&
        hangout_skill == skillMaxP.hangout_skill &&
        listening == skillMaxP.listening
    ) {
        tab.find("[data-btn='h_all'][data-student='" + student + "']").addClass('buttonSelected')
        tab.find("[data-btn='h_all'][data-student='" + student + "']").attr('value', 1)
    } else {
        tab.find("[data-btn='h_all'][data-student='" + student + "']").removeClass('buttonSelected')
        tab.find("[data-btn='h_all'][data-student='" + student + "']").attr('value', 0)
    }

    findTotal(hangout, student)
}

export { isHangoutAll }