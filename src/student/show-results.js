function showUsersResult (users) {	
	var markUp = `
				<div class="table-responsive">
					<table id="searchResultTable" class="table table-striped table-hover table-condensed">
						<tr>
							<th>XP</th>
							<th>email</th>
							<th>phone</th>
							<th>CPF</th>
						</tr>
					</table>
				</div>`

	$('#searchResult').html(markUp);

	for (var i = 0; i < users.length; i++) {
		$('#searchResultTable>tbody').append(`
					<tr onClick="Teacher.Student.getStudentDetails('${users[i]._id}')" role="button">
						<td class="teacher-student-xp-${users[i]._id}">${users[i].xp}</td>
						<td>${users[i].mainEmail}</td>
						<td>${users[i].phones[0] || ""}</td>
						<td>${users[i].cpf || ""}</td>
					</tr>`
		);
	}
}

export { showUsersResult }
