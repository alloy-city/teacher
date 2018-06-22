import { post } from '../http'

function grantXpToUserForMission(answerId) {
    
    let body = {
        answerId: answerId,
        multiplier: document.getElementById(`multiplier-${answerId}`).valueAsNumber
    }

    post(body, "xp/open-mission-entry", res => {
        /// #if DEBUG
        console.log(res);
        /// #endif
        
        $('#' + answerId).remove();

        let n = Number($('#open-mission-assessment-counter').text())
        n--
        if (n == 0) $('#open-mission-assessment-counter').text('')
        else $('#open-mission-assessment-counter').text(n);
        
        if (res.status == "previous success") {
            /// #if DEBUG
            console.log(res.msg);
            /// #endif
        } else if (res.status == "success") {
            /// #if DEBUG
            console.log(res.msg);
            /// #endif
        }
    })
}

export { grantXpToUserForMission }