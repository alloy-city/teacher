import { findTotal } from './find-total'
import { skillMaxP } from './skill-constants'

function isMissionAll(student, hangout) {
    let tab = $(`#hangout-tab-${hangout}`)

    let mission_accomp = tab.find("[data-student='" + student + "'][data-btn='mission_accomp']").hasClass('buttonSelected')
    let writing = tab.find("[data-student='" + student + "'][data-btn='writing']").val()
    let mission_skill = tab.find("[data-student='" + student + "'][data-btn='mission_skill']").val()

    if (
        mission_accomp == true &&
        writing == 40 &&
        mission_skill == 25
    ) {
        tab.find("[data-btn='m_all'][data-student='" + student + "']").addClass('buttonSelected')
        tab.find("[data-btn='m_all'][data-student='" + student + "']").attr('value', 1)
    } else {
        tab.find("[data-btn='m_all'][data-student='" + student + "']").removeClass('buttonSelected')
        tab.find("[data-btn='m_all'][data-student='" + student + "']").attr('value', 0)
    }
    
    findTotal(hangout, student)
}

export { isMissionAll }