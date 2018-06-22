import { addCoursesButtons } from './add-courses-buttons'
import { addHangoutTabs } from './add-hangout-tabs'

function activateTab(tab) {
    $('.groupUsersContainer').css('display', 'none');
    $('#' + tab).css('display', 'block');
}

if (Auth.userData.name && Auth.userData.name.length > 0) {
    $('#navbar-facilitator-name').html('Salut, <b>' + Auth.userData.name + ' !</b>');
} else {
    $('#navbar-facilitator-name').html(Auth.userData.mainEmail + '</b>');
}

export { addCoursesButtons, addHangoutTabs, activateTab }