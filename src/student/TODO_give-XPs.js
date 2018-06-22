function giveXPs(id){
    let nXPs = Number(document.getElementById("giveXPs").value)

    if (nXPs){
        console.log("giveStudentXPs", id, nXPs)

        $.ajax({
            type: 'post',
            url: "student/give-XPs.php",
            data: {
                "id": id,
                "nXPs": nXPs
            },
            success: function (res) {
                res = JSON.parse(res)
                console.log(res)
            }
        })
    }
}