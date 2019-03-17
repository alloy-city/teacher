import { post } from "../http"

// DOM element pointers
let DOM = {
    selection: undefined,
    addCommentButton: undefined,
    clearSelectionButton: undefined,
    commentTextarea: undefined,
    studentProduction: undefined
}

let writing = false;
let studentProduction;

let body = {
    answer_id: undefined,
    coordinates: undefined,
    message: undefined
}

document.addEventListener("mouseup", e => {
    DOM.selection = window.getSelection()

    if (isValid()) {
        writing = true;
        body.answer_id = DOM.selection.anchorNode.parentElement.getAttribute("name");
        body.coordinates = [DOM.selection.anchorOffset, DOM.selection.focusOffset];

        if (body.coordinates[0] > body.coordinates[1]) {
            body.coordinates[0] = body.coordinates[0] + body.coordinates[1];
            body.coordinates[1] = body.coordinates[0] - body.coordinates[1];
            body.coordinates[0] = body.coordinates[0] - body.coordinates[1];
        }

        activateComment(body.answer_id);
    }
});

document.onkeydown = function (e) {
    if (writing && e.key === "Escape") clearSelection();
};

function isValid(){
    if (
        !writing &&
        DOM.selection.anchorNode &&
        DOM.selection.anchorNode.parentElement.classList.contains("mission-answer-text") &&
        DOM.selection.anchorOffset != DOM.selection.focusOffset &&
        DOM.selection.baseNode === DOM.selection.extentNode
    ) return true;
    return false;
}

function deactivateMessageButton() {
    let buttons = document.getElementsByClassName("mission-comment-button");
    for (let b of buttons) b.classList.add("hidden");
    
    let textAreas = document.getElementsByClassName("open-mission-write-comment");
    for (let b of textAreas) b.hidden = true;
}

function activateComment (id) {
    console.log(id, "-> activateComment");

    DOM.addCommentButton = document.getElementById(`comment-about-${id}`)
    DOM.clearSelectionButton = document.getElementById(`clear-selection-on-${id}`)
    DOM.commentTextarea = document.getElementById(`write-comment-${id}`);
    DOM.studentProduction = document.getElementById(`mission-text-${id}`);
    
    studentProduction = DOM.studentProduction.innerHTML;

    console.log(studentProduction);

    deactivateMessageButton();

    let markedString = studentProduction.slice(0, body.coordinates[0]) + '<mark id="new-comment" class="edit">' + studentProduction.slice(body.coordinates[0], body.coordinates[1]) + '</mark>' + studentProduction.slice(body.coordinates[1], studentProduction.length);

    console.log(markedString);

    // studentProductionElement.innerText = markedString;
    DOM.studentProduction.innerHTML = markedString;

    DOM.addCommentButton.addEventListener("click", saveComment)
    DOM.clearSelectionButton.addEventListener("click", clearSelection);
    DOM.addCommentButton.classList.remove("hidden");
    DOM.clearSelectionButton.classList.remove("hidden");
    DOM.commentTextarea.hidden = false;
    DOM.commentTextarea.focus();

    DOM.commentTextarea.onkeydown = function (e) {
        if (e.key === "Enter") e.preventDefault();
    }

    DOM.commentTextarea.onkeyup = function (e) {
        if (DOM.commentTextarea.value.length === 0) {
            DOM.addCommentButton.disabled = true;
        } else {
            DOM.addCommentButton.disabled = false;
            if (e.key === "Enter") saveComment();
        }
    }
}

function clearSelection() {
    console.log("clearSelection");

    DOM.studentProduction.innerHTML = studentProduction;
    DOM.addCommentButton.classList.add("hidden");
    DOM.clearSelectionButton.classList.add("hidden");
    DOM.commentTextarea.hidden = true;
    DOM.commentTextarea.value = "";
    writing = false;
}

function saveComment() {
    console.log("Save comment");

    let message = DOM.commentTextarea.value;
    
    if (message != null && message.length > 0) {
        body.message = message;

        saveMessage()
        console.log(body);
    }
}

function saveMessage(){
    post(body, "answer/message", response => {
        /// #if DEBUG
        console.log(response)
        /// #endif

        // TEMP
        let x = 0;

        let mark = document.getElementById("new-comment");
        mark.classList.remove("edit");
        mark.id = `${body.answer_id}-comment-${x}`;

        studentProduction = DOM.studentProduction.innerHTML;

        clearSelection();

        if (response.messages.length == 1){
            notify(`Une instruction rajoutée.`, "success", false);
        } else {
            notify(`${response.messages.length} instructions rajoutées.`, "success", false)
        }
    });
}
