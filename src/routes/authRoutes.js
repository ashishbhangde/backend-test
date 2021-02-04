import express from 'express'
const router = express.Router()

const AuthController = require('./../controllers/AuthController')
const UserController = require('./../controllers/UserController')

router.post('/register/add_new_user',   UserController.addNewUser)
router.post('/accounts/login',   UserController.login)
router.post('/create_new_register_student',   UserController.userRegistration)
router.post('/get_students_data',   UserController.getStudents)
router.post('/delete_student_by_id',   UserController.DeleteStudentById)

export default router