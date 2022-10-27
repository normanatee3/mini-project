// import express
const express = require('express')
// import controller
const userController = require('../../controllers/api/userController')
// create router
const router = express.Router()
// use router to redirect
router.route('/').post(userController.createUser)
router.route('/:id').get(userController.getUser)
router.route('/login').post(userController.login);

module.exports = router