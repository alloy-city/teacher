import { eclassSocket } from '../live'

function pointer(){
    let slideElements = document.getElementsByClassName("slide")
    for (let slide of slideElements) {

        slide.addEventListener("pointerenter", e => {
            if (e.currentTarget.parentElement.classList.contains("sent")){
                // console.log(slide.name, "start")

                let instruction = {
                    to: Teacher.Course.getStudentIds(),
                    from: Auth.userData._id,
                    type: "pointer-enter",
                    slide: slide.name,
                }
    
                eclassSocket.emit('instruction', instruction)
            }
        })

        slide.addEventListener("pointermove", e => {
            if (e.currentTarget.parentElement.classList.contains("sent")){
                let x = (e.pageX - e.currentTarget.offsetLeft) / e.currentTarget.width
                let y = (e.pageY - e.currentTarget.offsetTop) / e.currentTarget.height
    
                // console.log(slide.name, "moving", x, y)
    
                let instruction = {
                    to: Teacher.Course.getStudentIds(),
                    from: Auth.userData._id,
                    type: "pointer-coordinates",
                    slide: slide.name,
                    coordinates: [x, y]
                }
    
                eclassSocket.emit('instruction', instruction)
            }
            
        })

        slide.addEventListener("pointerleave", e => {
            if (e.currentTarget.parentElement.classList.contains("sent")){
                // console.log(slide.name, "end")

                let instruction = {
                    to: Teacher.Course.getStudentIds(),
                    from: Auth.userData._id,
                    type: "pointer-exit",
                    slide: slide.name,
                }
    
                eclassSocket.emit('instruction', instruction)
            }
        })
    }
}

export { pointer }