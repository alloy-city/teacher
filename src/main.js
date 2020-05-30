import * as Live from './live'
import { logout } from './auth/logout'
import * as Student from './student'
import * as Course from './course'
import * as Mission from './mission'
import * as Lesson from './lesson'
import * as Product from './product'

window.Teacher = {
    Live,
    Course,
    Student,
    logout,
    Mission,
    Lesson,
    Product
}
