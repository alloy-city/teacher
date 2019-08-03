class Course {
    constructor(_id, title, description, level, theme, price, hangouts, students, teachers) {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.level = level;
        this.theme = theme;
        this.price = price;
        this.hangouts = hangouts;
        this.students = students;
        this.teachers = teachers;
    }
}

export { Course }
