function missionAccomplished(student, isCompleted) {

    /// #if DEBUG
    console.log(student, isCompleted)
    /// #endif

    if (Teacher.Course.selectedCourse._id) {
        console.log(student);
        console.log(Teacher.Course.selectedCourse._id);
        console.log(isCompleted);

        /*
        $.post('../admin/php/mission-success.php', {
            student: student,
            mission: hangoutId,
            isCompleted: isCompleted,
        }, function (data) {
            console.log(data);
        });
        */

    } else {
        console.error('What mission?');
    }
}

export { missionAccomplished }