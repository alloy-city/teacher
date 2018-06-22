function calculateHangoutTotalXP(xpEvent, hangout){
    let total = 0

    if (xpEvent){
        total += xpEvent.presence[hangout] || 0
        total += xpEvent.ponctuality[hangout] || 0
        total += xpEvent.participation[hangout] || 0
        total += xpEvent.oral_expr[hangout] || 0
        total += xpEvent.hangout_skill[hangout] || 0
        total += xpEvent.listening[hangout] || 0
        total += xpEvent.mission_accomp[hangout] || 0
        total += xpEvent.writing[hangout] || 0
        total += xpEvent.mission_skill[hangout] || 0
    }

    return total
}

export { calculateHangoutTotalXP }