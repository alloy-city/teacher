import { full } from './save'
import { findTotal } from './find-total'

function missionAll(value, student, hangout, btn) {
    let tab = $(`#hangout-tab-${hangout}`)

    tab.find("[data-btn='" + btn + "'][data-student='" + student + "']").toggleClass('buttonSelected');

    if (value == 0) {
        tab.find("[data-btn='" + btn + "'][data-student='" + student + "']").attr('value', 1);
        tab.find("[data-student='" + student + "'][data-btn='mission_accomp']").addClass('buttonSelected');
        tab.find("[data-student='" + student + "'][data-btn='writing']").val(40);
        tab.find("[data-student='" + student + "'][data-btn='mission_skill']").val(25);

        full(Teacher.Course.selectedCourse._id, student, hangout, "full-mission")

    } else {
        tab.find("[data-btn='" + btn + "'][data-student='" + student + "']").attr('value', 0);
        tab.find("[data-student='" + student + "'][data-btn='mission_accomp']").removeClass('buttonSelected');
        tab.find("[data-student='" + student + "'][data-btn='writing']").val(0);
        tab.find("[data-student='" + student + "'][data-btn='mission_skill']").val(0);

        full(Teacher.Course.selectedCourse._id, student, hangout, "zero-mission")
    }

    findTotal(hangout, student);
}

export { missionAll }