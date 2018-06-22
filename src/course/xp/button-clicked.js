import { save } from './save'
import { isHangoutAll } from './is-hangout-all'
import { isMissionAll } from './is-mission-all'
import { missionAccomplished } from './mission-accomplished'

function buttonClicked(element, hangout) {

    let value = Number(element.value)
    let name = element.name
    let btn = element.getAttribute('data-btn')
    let student = element.getAttribute('data-student')
    let maxvalue = Number(element.getAttribute('data-maxvalue'))

    /// #if DEBUG
    console.log(value, name, btn, student, maxvalue, hangout)
    /// #endif

    if (value == 0) {
        $('#hangout-tab-' + hangout).find("[data-btn='" + btn + "'][data-student='" + student + "']").toggleClass('buttonSelected');
        $('#hangout-tab-' + hangout).find("[data-btn='" + btn + "'][name='" + name + "']").attr('value', maxvalue);

        save(Teacher.Course.selectedCourse._id, student, maxvalue, btn, hangout);

        isHangoutAll(student, hangout);
        isMissionAll(student, hangout);

        /* give mission access */
        if (btn == 'mission_accomp') {
            console.log('Present! Give access to mission.');
            missionAccomplished(student, true);
        }

    } else {
        $('#hangout-tab-' + hangout).find("[data-btn='" + btn + "'][data-student='" + student + "']").toggleClass('buttonSelected');
        $('#hangout-tab-' + hangout).find("[data-btn='" + btn + "'][name='" + name + "']").attr('value', 0);

        save(Teacher.Course.selectedCourse._id, student, 0, btn, hangout);
        
        isHangoutAll(student, hangout);
        isMissionAll(student, hangout);

        /* take mission access away */
        if (btn == 'mission_accomp') {
            console.log('Absent! Take access to mission away.');
            missionAccomplished(student, false);
        }

    }
}

export { buttonClicked }