import { post } from '../http'
import { addOpenMissionsToDOM } from './add-open-missions-to-DOM'

let notAssessedOpenMissions = [];
let numberOfNotAssessedOpenMissions = 0;

function _callback(res) {
    /// #if DEBUG
    // console.log(res[0])
    /// #endif

    for (var i = 0; i < res.length; i++) {

        numberOfNotAssessedOpenMissions++;

        if (res[i] && res[i].creator && res[i].creator._id) {
            var notAssessedOpenMission = {
                answerId: res[i]._id,
                userId: res[i].creator._id,
                userEmail: res[i].creator.mainEmail,
                userPicture: res[i].creator.picture,
                missionId: res[i].question._id,
                mission: res[i].question.resource.question,
                answer: res[i].answer,
                worth: res[i].question.worth,
                comments: res[i].messages,
                timestamp: res[i].timestamp
            }

            notAssessedOpenMissions.push(notAssessedOpenMission);
        } else {
            console.log(res[i])
        }
    }

    addOpenMissionsToDOM(notAssessedOpenMissions);

    if (numberOfNotAssessedOpenMissions > 0) {
        $('#open-mission-assessment-counter').text(numberOfNotAssessedOpenMissions)
        let openMissionMultipliers = document.getElementsByClassName("mission-multiplier")
        for (let multiplier of openMissionMultipliers){
            multiplier.addEventListener("input", event => {
                document.getElementById(`open-mission-worth-${event.target.name}`).innerText = `${Math.round(event.target.value * event.target.dataset.worth)} XPs`
            })
        }
    }
}

function getNotAssessedOpenMissions() {
    post({}, "user/unassessed-missions", _callback)
}

export { getNotAssessedOpenMissions }