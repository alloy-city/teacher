import { getNotAssessedOpenMissions } from './get-not-assessed-open-missions'
import { dismissOpenMissionAnswer } from './dismiss-open-mission-answer'
import { saveMessage } from './correctionMessage'
import { activateCommentButton } from './message'

getNotAssessedOpenMissions()

export { dismissOpenMissionAnswer, saveMessage, activateCommentButton }