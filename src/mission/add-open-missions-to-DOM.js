import { buildCommentCards } from "./buildCommentCards"

function addOpenMissionsToDOM(notAssessedOpenMissions) {
    for (var i = 0; i < notAssessedOpenMissions.length; i++) {
        var markUp = `
            <div id="${notAssessedOpenMissions[i].answerId}" class="panel panel-default">
                <div class="panel-heading">
                    <img src="${notAssessedOpenMissions[i].userPicture || "images/noPicture.png"}" alt=" " class="mission-student-photo">
                    ${notAssessedOpenMissions[i].mission}
                    <p class="text-success">Apprenant : <b>${notAssessedOpenMissions[i].userEmail}</b></p>
                    ${ notAssessedOpenMissions[i].timestamp ? `<p class="text-info">Fait : <b>${moment(notAssessedOpenMissions[i].timestamp).format("dddd, D/MM/YY, HH:mm")}</b></p>` : ``}
                </div>
                <div class="panel-body">
                    <p class="text-muted"><i>Réponse de l'apprenant :</i></p>
                    <p id="mission-text-${notAssessedOpenMissions[i].answerId}" name="${notAssessedOpenMissions[i].answerId}" class="mission-answer-text">${notAssessedOpenMissions[i].answer}</p>
                    <p class="text-muted"><i>Commentaires du prof :</i></p>
                    <div id="comment-cards-${notAssessedOpenMissions[i].answerId}"></div>
                </div>
                <div class="panel-footer">

                    <div>
                        <textarea hidden id="write-comment-${notAssessedOpenMissions[i].answerId}" class="open-mission-write-comment" placeholder="Avez-vous utilisé LeBonPatron/le correcteur de votre navigateur ? / Développez ceci. / Je n'ai pas compris ce que vous voulez dire là. / etc."></textarea>
                        <button
                            id="comment-about-${notAssessedOpenMissions[i].answerId}"
                            type="button"
                            class="btn btn-success pull-right mission-comment-button hidden"
                            disabled
                            title="Écrivez sur le morceau sélectionné.">
                            Enregistrer - ENTER
                        </button>
                        <button
                            id="clear-selection-on-${notAssessedOpenMissions[i].answerId}"
                            name="${notAssessedOpenMissions[i].answerId}"
                            type="button"
                            class="btn btn-default pull-right mission-comment-button hidden"
                            title="Annuler l'édition - ESC">
                            Annuler
                        </button>
                        <button
                            id="delete-comment-from-${notAssessedOpenMissions[i].answerId}"
                            name="${notAssessedOpenMissions[i].answerId}"
                            type="button"
                            class="btn btn-danger pull-right mission-comment-button hidden"
                            title="Effacer le commentaire">
                            Effacer
                        </button>
                    </div>

                    <input id="multiplier-${notAssessedOpenMissions[i].answerId}" class="mission-multiplier" name="${notAssessedOpenMissions[i].answerId}" data-worth="${notAssessedOpenMissions[i].worth}" type="range" min="0" max="1" step="0.01" value="1">
                    <span id="open-mission-worth-${notAssessedOpenMissions[i].answerId}" class="open-mission-worth text-muted">${notAssessedOpenMissions[i].worth} XPs</span>
                    <button onclick="Teacher.Mission.dismissOpenMissionAnswer('${notAssessedOpenMissions[i].answerId}')" type="button" class="btn btn-danger">Accorder XPs et archiver</button>
                </div>
            </div>`

        $('#open-mission-assessment').append(markUp);

        buildCommentCards(notAssessedOpenMissions[i].answerId, notAssessedOpenMissions[i].answer, notAssessedOpenMissions[i].comments);
    }
}

export { addOpenMissionsToDOM }