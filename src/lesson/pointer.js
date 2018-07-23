import { eclassSocket } from '../live'

function pointer(){
    let slideElements = document.getElementsByClassName("slide")
    for (let slide of slideElements) {

        slide.addEventListener("pointerenter", () => {
            console.log(slide.name, "start")
        })

        slide.addEventListener("pointermove", e => {
            
            let x = (e.pageX - e.currentTarget.offsetLeft) / e.currentTarget.width
            let y = (e.pageY - e.currentTarget.offsetTop) / e.currentTarget.height

            console.log(slide.name, "moving", x, y)

            let instruction = {
                to: Teacher.Course.selectedCourse.students,
                from: Auth.userData._id,
                type: "pointer coordinates",
                slide: slide.name,
                coordinates: [x, y]
            }

            eclassSocket.emit('instruction', instruction)
        })

        slide.addEventListener("pointerleave", () => {
            console.log(slide.name, "end")
        })
    }
}

export { pointer }