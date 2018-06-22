function addOpenMissionsToDOM(notAssessedOpenMissions) {
    for (var i = 0; i < notAssessedOpenMissions.length; i++) {
        var markUp = `
            <div id="${notAssessedOpenMissions[i].answerId}" class="panel panel-default">
                <div class="panel-heading">
                    ${notAssessedOpenMissions[i].mission}
                    <p class="text-success">User: <b>${notAssessedOpenMissions[i].userEmail}</b></p>
                </div>
                <div class="panel-body">
                    <p>Answer: ${notAssessedOpenMissions[i].answer}</p>
                </div>
                <div class="panel-footer">
                    <input id="multiplier-${notAssessedOpenMissions[i].answerId}" class="mission-multiplier" name="${notAssessedOpenMissions[i].answerId}" data-worth="${notAssessedOpenMissions[i].worth}" type="range" min="0" max="1" step="0.01" value="1">
                    <span id="open-mission-worth-${notAssessedOpenMissions[i].answerId}" class="open-mission-worth text-muted">${notAssessedOpenMissions[i].worth} XPs</span>
                    <button onclick="Teacher.Mission.dismissOpenMissionAnswer('${notAssessedOpenMissions[i].answerId}')" type="button" class="btn btn-danger">Accorder XPs et archiver</button>
                </div>
            </div>`

        $('#open-mission-assessment').append(markUp);
    }
}

export { addOpenMissionsToDOM }