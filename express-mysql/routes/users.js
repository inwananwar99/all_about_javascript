const express = require('express')

const router = express.Router()
const userControllers = require('../controllers/users')

//get all user
router.get('/', userControllers.getAllUsers)
//create new user
router.post('/', userControllers.createNewUser)
//update user
router.patch('/:userId', userControllers.updateUser)
//delete user
router.delete('/:userId', userControllers.deleteUser)


module.exports = router