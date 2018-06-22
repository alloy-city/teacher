import { instructions } from './xp-instructions'
import { isHangoutPerfect, isMissionPerfect } from './is-perfect.js'
import { skillMaxP } from '../course/xp'
import { calculateHangoutTotalXP } from './calculate-hangout-total-xp'

let tabHandleContainer = document.getElementById("hangoutsTabs")
let tabContainer = document.getElementById("usersXpControls")

function _addHandles(nOfHangouts){
    let tabHandles = ""

    for (let i = 0; i < nOfHangouts; i++) {
        if (i == 0) {
            tabHandles += `<input type="radio" name="hangoutMenu" id="tab${i}" checked="checked" onclick="Teacher.Course.activateTab('hangout-tab-${i}')" />
                     <label for="tab${i}">Hangout ${i + 1}</label>`
        } else {
            tabHandles += `<input type="radio" name="hangoutMenu" id="tab${i}" onclick="Teacher.Course.activateTab('hangout-tab-${i}')" />
                     <label for="tab${i}">Hangout ${i + 1}</label>`
        }
    }

    tabHandleContainer.innerHTML = tabHandles
    return
}

function _addTabs(hangouts, students){
    /// #if DEBUG
    // console.log(students)
    /// #endif

    let tabs = ""
    for (let i = 0; i < hangouts.length; i++){
        tabs += `<div id="hangout-tab-${i}" class="groupUsersContainer" style="display: ${i === 0 ? "block" : "none"}"><table class="groupUsersTable" width="100%">`

        for (let j = 0; j < students.length; j++){

            let courseIndex = findIndexOfObjectInArrayByProperty(students[j].xpEvents, "course", Teacher.Course.selectedCourse._id)
            let event = students[j].xpEvents[courseIndex]
            // console.log(`hangout: ${i}`)
            // console.log(event)

            tabs += `
                <tr class="user${j}" style="height: 30px; display: block;">
                    <td class="userNameTr">
                        <p class="userName" name="user${j}">${students[j].name || students[j].mainEmail}</p>
                    </td>
                    <td class="userButtons">
                        <input data-student="${students[j]._id}" value="${event && event.presence[i] ? event.presence[i] : 0}" data-btn="presence" data-maxvalue="${skillMaxP.presence}" class="hangoutXpButton ${event && event.presence[i] === skillMaxP.presence ? "buttonSelected" : ""}" name="user${j}" type="button" title="${instructions.presence}" onclick="Teacher.Course.XP.buttonClicked(this, ${i})" />
                        <input data-student="${students[j]._id}" value="${event && event.ponctuality[i] ? event.ponctuality[i] : 0}" data-btn="ponctuality" data-maxvalue="${skillMaxP.ponctuality}" class="hangoutXpButton ${event && event.ponctuality[i] === skillMaxP.ponctuality ? "buttonSelected" : ""}" name="user${j}" type="button" title="${instructions.ponctuality}" onclick="Teacher.Course.XP.buttonClicked(this, ${i})" />
                        <input data-student="${students[j]._id}" value="${event && event.participation[i] ? event.participation[i] : 0}" data-btn="participation" class="xpInputSlider" name="user${j}" title="${instructions.participation}" type="range" max="${skillMaxP.participation}" oninput="Teacher.Course.XP.sliderMoved(this, ${i})" onchange="Teacher.Course.XP.sliderDroped(this, ${i})" />
                        <input data-student="${students[j]._id}" value="${event && event.oral_expr[i] ? event.oral_expr[i] : 0}" data-btn="oral_expr" class="xpInputSlider" name="user${j}" title="${instructions.oral_expr}" type="range" max="${skillMaxP.oral_expr}" oninput="Teacher.Course.XP.sliderMoved(this, ${i})" onchange="Teacher.Course.XP.sliderDroped(this, ${i})" />
                        <input data-student="${students[j]._id}" value="${event && event.hangout_skill[i] ? event.hangout_skill[i] : 0}" data-btn="hangout_skill" class="xpInputSlider" name="user${j}" title="${instructions.hangout_skill}" type="range" max="${skillMaxP.hangout_skill}" oninput="Teacher.Course.XP.sliderMoved(this, ${i})" onchange="Teacher.Course.XP.sliderDroped(this, ${i})" />
                        <input data-student="${students[j]._id}" value="${event && event.listening[i] ? event.listening[i] : 0}" data-btn="listening" class="xpInputSlider" name="user${j}" title="${instructions.listening}" type="range" max="${skillMaxP.listening}" oninput="Teacher.Course.XP.sliderMoved(this, ${i})" onchange="Teacher.Course.XP.sliderDroped(this, ${i})" />
                        <input data-student="${students[j]._id}" value="${isHangoutPerfect(event, i) ? "1" : "0"}" data-btn="h_all" class="allButton ${isHangoutPerfect(event, i) ? "buttonSelected" : ""}" name="user${j}" onclick="Teacher.Course.XP.hangoutAll(this.value, this.getAttribute('data-student'), ${i}, this.getAttribute('data-btn'))" type="button" title="${instructions.h_all}">
                        <input data-student="${students[j]._id}" value="${event && event.mission_accomp[i] ? event.mission_accomp[i] : 0}" data-btn="mission_accomp" data-maxvalue="${skillMaxP.mission_accomp}" class="missionXpButton ${event && event.mission_accomp[i] === skillMaxP.mission_accomp ? "buttonSelected" : ""}" name="user${j}" type="button" title="${instructions.mission_accomp}" onclick="Teacher.Course.XP.buttonClicked(this, ${i})">
                        <input data-student="${students[j]._id}" value="${event && event.writing[i] ? event.writing[i] : 0}" data-btn="writing" class="xpInputSlider" name="user${j}" title="${instructions.writing}" type="range" max="${skillMaxP.writing}" oninput="Teacher.Course.XP.sliderMoved(this, ${i})" onchange="Teacher.Course.XP.sliderDroped(this, ${i})" />
                        <input data-student="${students[j]._id}" value="${event && event.mission_skill[i] ? event.mission_skill[i] : 0}" data-btn="mission_skill" class="xpInputSlider" name="user${j}" title="${instructions.mission_skill}" type="range" max="${skillMaxP.mission_skill}" oninput="Teacher.Course.XP.sliderMoved(this, ${i})" onchange="Teacher.Course.XP.sliderDroped(this, ${i})" />
                        <input data-student="${students[j]._id}" value="${isMissionPerfect(event, i) ? "1" : "0"}" data-btn="m_all" class="allButton ${isMissionPerfect(event, i) ? "buttonSelected" : ""}" name="user${j}" type="button" title="${instructions.m_all}" onclick="Teacher.Course.XP.missionAll(this.value, this.getAttribute('data-student'), ${i}, this.getAttribute('data-btn'))">
                    </td>
                    <td class="saveButton">
                        <p name="user${j}" data-student="${students[j]._id}" class="userTotalXp">${calculateHangoutTotalXP(students[j].xpEvents[courseIndex], i)}</p>
                        <p data-student="${students[j]._id}" value="" class="userXp total-xp-user-${students[j]._id}" name="user${j}">${students[j].xp}</p>
                    </td>
                </tr>`
        }

        tabs += "</table></div>"
    }

    tabContainer.innerHTML = tabs
}

function addHangoutTabs (course){
    _addHandles(course.hangouts.length)
    _addTabs(course.hangouts, course.students)
}

export { addHangoutTabs }