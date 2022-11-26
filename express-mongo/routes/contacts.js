const express = require('express')

const router = express.Router()
const contactControllers = require('../controllers/contacts')
//get all contact
router.get('/', contactControllers.getAllContacts)
//create new contact
router.post('/', contactControllers.createNewContact)
//update contact
router.patch('/:contactId', contactControllers.updateContact)
//delete contact
router.delete('/:contactId', contactControllers.deleteContact)


module.exports = router