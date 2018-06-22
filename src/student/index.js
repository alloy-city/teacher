import { searchUsers } from './search'
import { getStudentDetails } from './get-details'
import { getRecentUsers } from './recent'
import { getDebtUsers } from './get-debt-users'
import { showStudentDetails } from './show-details'
import { showUsersResult } from './show-results'
import { User } from './user'

let wait = false

$("#searchBox").keyup(function () {
	let search = $('#searchBox').val()
	if (search.length > 2) {
		if (!wait){
			searchUsers(search)
			wait = true
		} else {
			setTimeout(() => {
				wait = false
			}, 1000)
		}
	}
});

getRecentUsers()

let selected = new User("", "")

export {
	searchUsers,
	getStudentDetails,
	getRecentUsers,
	getDebtUsers,
	showStudentDetails,
	showUsersResult,
	selected
}