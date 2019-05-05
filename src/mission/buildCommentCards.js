import { writing, body, activateComment, setWriting, editMessage, clearSelection, removeComment } from './message.js';

function buildCommentCard(answerId, text, comment, i) {
    let id = answerId;
    let coords = [comment.coordinates[0], comment.coordinates[1]];
    let message = comment.message;

    let answer = document.getElementById(`mission-text-${answerId}`);
    let markedText = text.slice(0, comment.coordinates[1]) + "</mark>" + text.slice(comment.coordinates[1], text.length);
    markedText = markedText.slice(0, comment.coordinates[0]) + "<mark>" + markedText.slice(comment.coordinates[0], markedText.length);

    let e = document.createElement("span");
    e.classList.add("comment-card");
    e.innerText = comment.message;
    e.onmouseenter = () => {
        if (!writing) {
            answer.innerHTML = markedText;
        }
    };
    e.onmouseleave = () => {
        if (!writing) {
            answer.innerHTML = text;
        }
    };
    e.onclick = () => {
        let mIndex = -1;
        let node = e;
        while (node != null) {
            node = node.previousSibling;
            mIndex++;
        }
        
        if (writing) clearSelection();
        answer.innerHTML = text;
        setWriting(true);
        body.coordinates = coords;
        body.answer_id = id;
        body.message = message;
        body.messageIndex = mIndex;
        activateComment(id, coords, editMessage);
        document.getElementById(`write-comment-${id}`).value = e.innerText;

        // add delete button
        let d = document.getElementById(`delete-comment-from-${id}`);
        d.classList.remove("hidden");
        d.onclick = () => {
            removeComment(id, mIndex);
        }
    };

    if (i == document.getElementById(`comment-cards-${answerId}`).children.length) {
        document.getElementById(`comment-cards-${answerId}`).appendChild(e);
    } else {
        document.getElementById(`comment-cards-${answerId}`).children[i].replaceWith(e);
    }
}

function buildCommentCards(answerId, text, comments) {
    comments.forEach((comment, i) => {
        buildCommentCard(answerId, text, comment, i);
    });
}

export { buildCommentCards, buildCommentCard }
