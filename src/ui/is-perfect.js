import { skillMaxP } from '../course/xp'

function isHangoutPerfect(skills, hangout) {
    if (
        skills &&
        skills.presence[hangout] == skillMaxP.presence &&
        skills.ponctuality[hangout] == skillMaxP.ponctuality &&
        skills.participation[hangout] == skillMaxP.participation &&
        skills.oral_expr[hangout] == skillMaxP.oral_expr &&
        skills.hangout_skill[hangout] == skillMaxP.hangout_skill &&
        skills.listening[hangout] == skillMaxP.listening
    ) {
        return true
    } else {
        return false
    }
}

function isMissionPerfect(skills, hangout) {
    if (
        skills &&
        skills.mission_accomp[hangout] == skillMaxP.mission_accomp &&
        skills.writing[hangout] == skillMaxP.writing &&
        skills.mission_skill[hangout] == skillMaxP.mission_skill
    ) {
        return true
    } else {
        return false
    }
}

export { isHangoutPerfect, isMissionPerfect }