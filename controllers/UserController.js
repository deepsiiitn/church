
const { validationResult } = require("express-validator");
let UserController = function () { };
var bcrypt = require('bcrypt-nodejs');


//Requried Files
const ErrorHandler = require("./ErrorHandler");


//Import Modals

const Admin = require("../model/User");
const Church = require("../model/church_lists");
const Prayer_Requests = require("../model/prayer_requests");
const Presentations = require("../model/presentations");



//Functions
UserController.Register = async (req, res) => {

    try {
        let email_check = await Admin.findOne({ "email": req.email });
        if (email_check == null) {
            let Data = {
                id: await ErrorHandler.generateSequenceNumber("Users"),
                name: req.name,
                email: req.email,
                password: req.password,
                user_type: req.user_type
            };
            let Save = await Admin.create(Data);
            console.log(Save);
            return ({ success: true, msg: "Registered Successfully" });
        } else {
            return ({ success: false, msg: "Email Already Exists" });
        }

    } catch (error) {
        return ({ success: false, msg: "User not registered Successfully" });
    }

}

UserController.Login = async (req, res) => {
    let match = {
        email: req.email,
        password: req.password
    }
    let Result = await Admin.find(match);
    if (Result == null) {
        return ({ success: false, msg: "Email or Password Incorrect" })
    } else {
        return ({ success: true, msg: "Succesfully Logged in" })
    }
    // try {
    //     const validatedResult = validationResult(req);
    //     if (!validatedResult.isEmpty()) {
    //         return res.status(422).json({ errors: validatedResult.errors });
    //     }

    //     const admin = await Admin.findOne({ email: req.body.email });

    //     if (!admin) {
    //         return res.status(422).json({ error: [{ email: "Email Not Found" }] });
    //     }

    //     const isEqual = await bcrypt.compare(req.body.password, admin.password);

    //     if (!isEqual) {
    //       return res
    //         .status(422)
    //         .json({ error: [{ password: "Password does not match!" }] });
    //     }




    // } catch (error) {

    // }
}

UserController.Get_Church_Data = async (req, res) => {
    let Result = await Church.find({});
    return ({ success: true, data: Result })
}

UserController.Get_Church_Adopt_Services = async (req, res) => {
    let viewOptions = {
        id: 1,
        church_name: 1,
        needs: 1,
        about: 1,
        is_adopt: 1,
        location: 1,
        timing: 1,
        church_image: 1,
        _id: 0
    }

    let Result = await Church.find({}, viewOptions);
    return ({ success: true, data: Result })
}

UserController.Post_Prayer_Request = async (req, res) => {
    try {
        let Data = {
            id: await ErrorHandler.generateSequenceNumber("prayer_requests"),
            name: req.name,
            email: req.email,
            phone: req.phone,
            to_whom: req.to_whom,
            request: req.request
        }
        console.log(Data);

        let Save = await Prayer_Requests.create(Data);
        console.log(Save);
        return ({ success: true, msg: "Registered Successfully" });
    } catch (error) {
        return ({ success: false, msg: "User not registered Successfully" });
    }

}

UserController.Get_Prayer_Requests = async (req, res) => {
    let Result = await Prayer_Requests.find({});
    return ({ success: true, data: Result })
}

UserController.Add_Presentations = async (req, res) => {
    try {
        let church = await Church.findOne({ "id": req.id });
        if (church != null) {
            console.log(church,"Result")
        }
        let Data = {
            id: await ErrorHandler.generateSequenceNumber("prayer_requests"),
            church_id: req.id,
            media: req.media
        }

        let Save = await Presentations.create(Data);
        // console.log(Save);
        return ({ success: true, msg: "Posted Successfully" });
    } catch (error) {
        return ({ success: false, msg: "Something Went Wrong" });
    }

}

UserController.Get_Presentations = async (req, res) => {
    let aggregateQuery = [
        {
            $lookup: {
                from: "church_list",
                localField: "church_id",
                foreignField: "id",
                as: "church_data"
            }
        },
        {
            $unwind: "$church_data"
        },
        {
            $project: {
                "church_name": "$church_data.church_name",
                "church_image": "$church_data.church_image",
                "media": 1,
                "id": 1
            }
        }
    ]
    let Result = await Presentations.aggregate( aggregateQuery );

    return ({ success: true, data: Result })
}


module.exports = UserController;