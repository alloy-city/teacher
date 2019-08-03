// add courses to UI
// @in: [course]
// @out: UI buttons

function addCoursesButtons(courses) {
    /// #if DEBUG
    // console.log(courses)
    /// #endif
    
    let container = document.getElementById("teacher-course-buttons")

    let buttons = ""
    for (let course of courses) {
        buttons += `<button type="button" class="btn btn-default" onclick="Teacher.Course.launchClass('${course._id}', '${course.title}')">${course.title}</button>`
    }

    container.innerHTML = buttons
}

export { addCoursesButtons }