import { full } from './save'
import { findTotal } from './find-total'

function hangoutAll(value, student, hangout, btn) {
    let tab = $(`#hangout-tab-${hangout}`)

    /// #if DEBUG
    console.log(value, student, hangout, btn)
    /// #endif

    tab.find("[data-btn='" + btn + "'][data-student='" + student + "']").toggleClass('buttonSelected');

    if (value == 0) {
        tab.find(`[data-btn=${btn}][data-student=${student}]`).attr('value', 1);
        tab.find(`[data-student=${student}][data-btn='presence']`).addClass('buttonSelected');
        tab.find(`[data-student=${student}][data-btn='ponctuality']`).addClass('buttonSelected');
        tab.find(`[data-student=${student}][data-btn='participation']`).val(20);
        tab.find(`[data-student=${student}][data-btn='oral_expr']`).val(25);
        tab.find(`[data-student=${student}][data-btn='hangout_skill']`).val(10);
        tab.find(`[data-student=${student}][data-btn='listening']`).val(20);

        full(Teacher.Course.selectedCourse._id, student, hangout, "full-hangout")
    } else {
        tab.find(`[data-btn=${btn}][data-student=${student}]`).attr('value', 0);
        tab.find(`[data-student=${student}][data-btn='presence']`).removeClass('buttonSelected');
        tab.find(`[data-student=${student}][data-btn='ponctuality']`).removeClass('buttonSelected');
        tab.find(`[data-student=${student}][data-btn='participation']`).val(0);
        tab.find(`[data-student=${student}][data-btn='oral_expr']`).val(0);
        tab.find(`[data-student=${student}][data-btn='hangout_skill']`).val(0);
        tab.find(`[data-student=${student}][data-btn='listening']`).val(0);

        full(Teacher.Course.selectedCourse._id, student, hangout, "zero-hangout")
    }

    findTotal(hangout, student)
}

export { hangoutAll }