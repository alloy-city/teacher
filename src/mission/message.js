import { post } from "../http"
import { buildCommentCard } from "./buildCommentCards"

// DOM element pointers
let DOM = {
    selection: undefined,
    addCommentButton: undefined,
    clearSelectionButton: undefined,
    deleteCommentButton: undefined,
    commentTextarea: undefined,
    studentProduction: undefined
}

let writing = false;
let studentProduction;
let commentIndex;

function setWriting(v) {
    writing = v;
}

let body = {
    answer_id: undefined,
    coordinates: undefined,
    message: undefined,
    messageIndex: undefined
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

        activateComment(body.answer_id, body.coordinates, saveComment);
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

function activateComment (id, coordinates, callback) {
    document.execCommand("copy");
    DOM.addCommentButton = document.getElementById(`comment-about-${id}`)
    DOM.clearSelectionButton = document.getElementById(`clear-selection-on-${id}`)
    DOM.deleteCommentButton = document.getElementById(`delete-comment-from-${id}`)
    DOM.commentTextarea = document.getElementById(`write-comment-${id}`);
    DOM.studentProduction = document.getElementById(`mission-text-${id}`);
    
    studentProduction = DOM.studentProduction.innerHTML;

    deactivateMessageButton();

    let markedString = studentProduction.slice(0, coordinates[0]) + '<mark id="new-comment" class="edit">' + studentProduction.slice(coordinates[0], coordinates[1]) + '</mark>' + studentProduction.slice(coordinates[1], studentProduction.length);

    DOM.studentProduction.innerHTML = markedString;

    DOM.addCommentButton.onclick = callback;
    DOM.clearSelectionButton.onclick = clearSelection;
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
            if (e.key === "Enter") callback();
        }
    }
}

function clearSelection() {
    DOM.studentProduction.innerHTML = studentProduction;
    DOM.addCommentButton.classList.add("hidden");
    DOM.clearSelectionButton.classList.add("hidden");
    DOM.deleteCommentButton.classList.add("hidden");
    DOM.commentTextarea.hidden = true;
    DOM.commentTextarea.value = "";
    writing = false;
}

function saveComment() {
    let message = DOM.commentTextarea.value;
    
    if (message != null && message.length > 0) {
        body.message = message;

        saveMessage()
    }
}

function saveMessage(){
    post(body, "answer/message", response => {
        /// #if DEBUG
        // console.log(response)
        /// #endif

        body.messageIndex = response.messages.length-1;
        buildCommentCard(body.answer_id, studentProduction, body, response.messages.length-1);
        clearSelection();

        if (response.messages.length == 1){
            notify(`Une instruction rajoutée.`, "success", false);
        } else {
            notify(`${response.messages.length} instructions rajoutées.`, "success", false)
        }
    });
}

function editMessage() {
    if (body.message === DOM.commentTextarea.value) {
        return;
    }

    body.message = DOM.commentTextarea.value;
    console.log("editMessage", body);
    post(body, "answer/message/edit", response => {
        if (response == "OK") {
            buildCommentCard(body.answer_id, studentProduction, body, body.messageIndex);
            clearSelection();
        }
    });
}

function removeComment (answer_id, messageIndex) {
    post({answer_id, messageIndex}, "answer/message/delete", response => {
        if (response == "OK") {
            document.getElementById(`comment-cards-${answer_id}`).children[messageIndex].remove();
            clearSelection();
        }
    });
}

export { writing, body, activateComment, setWriting, commentIndex, setCommentIndex, editMessage, clearSelection, removeComment };
