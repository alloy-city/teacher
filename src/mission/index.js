import { getNotAssessedOpenMissions } from './get-not-assessed-open-missions'
import { dismissOpenMissionAnswer } from './dismiss-open-mission-answer'

getNotAssessedOpenMissions()

document.addEventListener("keydown", e => {
    if (e.shiftKey && e.code === "KeyM") {
        let selection = window.getSelection()
        console.log(selection.anchorNode.parentElement.parentElement.parentElement.id, selection.anchorOffset, selection.focusOffset)
    }
})

export { dismissOpenMissionAnswer }