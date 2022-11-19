const express = require('express')

const router = express.Router()
const userControllers = require('../controllers/users')

router.get('/', userControllers.getAllUsers)
router.post('/', userControllers.createNewUser)


module.exports = router