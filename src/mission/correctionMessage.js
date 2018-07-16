import { post } from "../http"

document.addEventListener("keydown", e => {
    if (e.shiftKey && e.code === "KeyM") {
        let selection = window.getSelection()

        
        let messageText = prompt("Instruction à l'apprenant", "")
        
        if (messageText == null || messageText == "") {
            
        } else {
            /// #if DEBUG
            console.log(
                selection.anchorNode.parentElement.parentElement.parentElement.id,
                selection.anchorOffset,
                selection.focusOffset,
                messageText
            )
            /// #endif

            let message = {
                answer_id: selection.anchorNode.parentElement.parentElement.parentElement.id,
                coordinates: [selection.anchorOffset, selection.focusOffset],
                message: messageText
            }

            saveMessage(message)
        }

    }
})

function saveMessage(message){
    post(message, "answer/message", response => {
        console.log(response)
    })
}

export { saveMessage }