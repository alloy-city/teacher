/*
function saveXps(modId, userId, xp, column, hangout){
  console.log(modId, userId, xp, column, hangout);
  $.post('../php/process_user_points.php', {
    module: modId,
    student: userId,
    column: column,
    xp: xp,
    hangout: hangout
  }, function(data){
    console.log(data);
    if (data == 1) {
      console.log("notify student.");
      eclassSocket.emit('instruction', { to: [userId], from: Auth.userData.id, type: "update-xp"});
    };
  });
}
*/