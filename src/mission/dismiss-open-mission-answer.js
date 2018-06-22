import { grantXpToUserForMission } from './grant-xp-to-user-for-mission'
import { post } from '../http'

function dismissOpenMissionAnswer(answerId) {
    /// #if DEBUG
    console.log(answerId);
    /// #endif
    
    post({ "answerId": answerId }, "answer/assess", res => {
        /// #if DEBUG
        console.log(res);
        /// #endif

        if (res == "Done") {
            grantXpToUserForMission(answerId)
        }
    })
}

export { dismissOpenMissionAnswer }