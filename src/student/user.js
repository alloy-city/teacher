class User {
    constructor(_id, email) {
        this._id = _id,
        this.email = email
    }

    setSelected(user) {
        this._id = user._id
        this.email = user.mainEmail
    }
}

export { User }