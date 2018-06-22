function findTotal(hangout, student) {
    let tab = $(`#hangout-tab-${hangout}`)
    let presenceElement = tab.find(`[data-student='${student}'][data-btn='presence']`)
    let ponctualityElement = tab.find(`[data-student='${student}'][data-btn='ponctuality']`)
    let missionAccompElement = tab.find(`[data-student='${student}'][data-btn='mission_accomp']`)

    /// #if DEBUG
    console.log(hangout, student)
    /// #endif

    // var totalTotal = Number($('#' + hangout + ' .userXp[data-student=' + student + ']').attr('value'));

    let presence = 0
    let ponctuality = 0
    let mission_accomp = 0

    if (presenceElement.hasClass('buttonSelected')) presence = 5
    if (ponctualityElement.hasClass('buttonSelected')) ponctuality = 5
    
    let participation = Number(tab.find(`[data-student=${student}][data-btn='participation']`).val())
    let oral_expr = Number(tab.find(`[data-student=${student}][data-btn='oral_expr']`).val())
    let hangout_skill = Number(tab.find(`[data-student=${student}][data-btn='hangout_skill']`).val())
    let listening = Number(tab.find(`[data-student=${student}][data-btn='listening']`).val())
    
    if (missionAccompElement.hasClass('buttonSelected')) mission_accomp = 20
    
    let writing = Number(tab.find(`[data-student=${student}][data-btn='writing']`).val())
    let mission_skill = Number(tab.find(`[data-student=${student}][data-btn='mission_skill']`).val())

    let total = (presence + ponctuality + participation + oral_expr + hangout_skill + listening + mission_accomp + writing + mission_skill)

    $(`#hangout-tab-${hangout} .userTotalXp[data-student=${student}]`).text(total);
    // $('#hangout-tab-' + hangout + ' .userXp[data-student=' + student + ']').text(total + totalTotal);

    return total
}

export { findTotal }