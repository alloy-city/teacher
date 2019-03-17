// import { post } from "../http"

// document.addEventListener("keydown", e => {
//     if (e.altKey && e.code === "KeyM") {
//         let selection = window.getSelection()

        
//         let messageText = prompt("Instruction à l'apprenant", "")
        
//         if (messageText == null || messageText == "") {
            
//         } else {
//             / #if DEBUG
//             console.log(
//                 selection.anchorNode.parentElement.parentElement.parentElement.id,
//                 selection.anchorOffset,
//                 selection.focusOffset,
//                 messageText
//             )
//             / #endif

//             let message = {
//                 answer_id: selection.anchorNode.parentElement.parentElement.parentElement.id,
//                 coordinates: [selection.anchorOffset, selection.focusOffset],
//                 message: messageText
//             }

//             if (message.coordinates[0] > message.coordinates[1]) {
//                 let temp = message.coordinates[0]
//                 message.coordinates[0] = message.coordinates[1]
//                 message.coordinates[1] = temp
//             }

//             saveMessage(message)
//         }

//     }
// })

// function saveMessage(message){
//     post(message, "answer/message", response => {
//         / #if DEBUG
//         console.log(response)
//         / #endif

//         if (response.messages.length == 1){
//             notify(`Une instruction rajoutée.`, "success", false)
//         } else {
//             notify(`${response.messages.length} instructions rajoutées.`, "success", false)
//         }
//     })
// }

// export { saveMessage }