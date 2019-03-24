function composeAnswer(answerId, text, comments) {
    console.log(comments);

    for (let i=0; i<comments.length; i++) {
        text = text.slice(0, comments[i].coordinates[0]) +
        `<mark id="answer-${answerId}-comment-${i}" class="student-production-saved-comment" title="${comments[i].message}">` +
        text.slice(comments[i].coordinates[0], comments[i].coordinates[1]) +
        "</mark>" +
        text.slice(comments[i].coordinates[1], text.length);
    }

    return `<p id="mission-text-${answerId}" name="${answerId}" class="mission-answer-text">${text}</p>`
}

export { composeAnswer }
