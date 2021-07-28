const express = require('express')
const UserController = require('../controllers/UserController')
const UserMediator = require('../mediators/UserMediator')
const { body } = require("express-validator");

const router = express.Router()
console.log("Hello")
// router.get('/', UserController.Login)
router.post("/register", UserMediator.Register);

router.post("/login", UserMediator.Login);

router.get("/get_church_data",UserMediator.Get_Church_Data);

router.get("/get_church_adopt_services",UserMediator.Get_Church_Adopt_Services);

router.post("/add_prayer_requests", UserMediator.Post_Prayer_Request);

router.get("/get_prayer_requests", UserMediator.Get_Prayer_Requests);

router.get("/get_presentations", UserMediator.Get_Presentations);

router.get("/add_presentations", UserMediator.Add_Presentations);


module.exports = router;