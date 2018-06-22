function logout() {
    signOut()
    localStorage.clear()
    location.reload(false)
}

export { logout }