let validSelection = false;

document.addEventListener("keydown", e => {
    if (
        e.altKey &&
        e.code === "KeyC" &&
        validSelection
    ) {
        writeComment(null)
    }
});

document.addEventListener("mouseup", e => {
    let selection = window.getSelection()
    
    if (
        selection.anchorOffset == selection.focusOffset ||
        (selection.anchorNode &&
        !selection.anchorNode.parentElement.classList.contains("mission-answer-text"))
    ){
        validSelection = false;
        deactivateMessageButton();
    }
    
    if (selection.anchorNode && selection.anchorNode.parentElement.classList.contains("mission-answer-text")) {
        activateComment(selection.anchorNode.parentElement.id)
    }
});

function deactivateMessageButton() {
    let buttons = document.getElementsByClassName("mission-comment-button");
    for (let b of buttons) b.classList.add("hidden");
    
    let textAreas = document.getElementsByClassName("open-mission-write-comment");
    for (let b of textAreas) b.hidden = true;
}

function activateComment (id) {
    let selection = window.getSelection()
    let addCommentButton = document.getElementById(`comment-about-${id}`)
    let textarea = document.getElementById(`write-comment-${id}`);

    deactivateMessageButton();

    let message = {
        answer_id: id,
        coordinates: [selection.anchorOffset, selection.focusOffset]
    }

    if (message.coordinates[0] == message.coordinates[1]) {
        addCommentButton.classList.add("hidden");
        textarea.hidden = true;
        validSelection = false;
    } else {
        addCommentButton.addEventListener("click", saveComment)
        validSelection = true;
        addCommentButton.classList.remove("hidden");
        textarea.hidden = false;
    }
}

function saveComment() {
    console.log("Save comment");

    let selection = window.getSelection();

    let messageText = "Tu écris trop mal ! Quelle horreur !";
    
    if (messageText != null && messageText.length > 0) {
        let message = {
            answer_id: selection.anchorNode.parentElement.parentElement.parentElement.id,
            coordinates: [selection.anchorOffset, selection.focusOffset],
            message: messageText
        }

        if (message.coordinates[0] > message.coordinates[1]) {
            let temp = message.coordinates[0]
            message.coordinates[0] = message.coordinates[1]
            message.coordinates[1] = temp
        }

        // saveMessage(message)
        console.log(message);
    }
}
