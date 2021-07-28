let UserMediator = function() {};
const UserController = require('../controllers/UserController')


//Login Function
UserMediator.Register = async(req, res) => {
    try {
        if (
            req.body.email != null && req.body.email != ""
            && req.body.password != null && req.body.password != ''
            && req.body.user_type != null && req.body.password != ""
        ) {
            let Result = await UserController.Register(req.body);
            res.json(Result);
        } else {
            throw { sucess: false, msg: "All feilds required" };
        }
    } catch (error) {
        console.log(error)
        if (!res.headersSent) {
            res.json(error);
        }
    }
}

UserMediator.Login = async(req, res) => {
    try {
        if (
            req.body.email != null && req.body.password != null
            && req.body.email != '' && req.body.password != ''
        ) {
            let Result = await UserController.Login(req.body);
            res.json(Result);
        } else {
            throw { sucess: false, msg: "All feilds required" };
        }
    } catch (error) {
        console.log(error)
        if (!res.headersSent) {
            res.json(error);
        }
    }
}

UserMediator.Get_Church_Data = async(req, res) => {
    try {
        let Result = await UserController.Get_Church_Data(req.body);
        res.json(Result);
    } catch (error) {
        console.log(error)
        if (!res.headersSent) {
            res.json(error);
        }
    }
}

UserMediator.Get_Church_Adopt_Services = async(req, res) => {
    try {
        let Result = await UserController.Get_Church_Adopt_Services(req.body);
        res.json(Result);
    } catch (error) {
        console.log(error)
        if (!res.headersSent) {
            res.json(error);
        }
    }
}

UserMediator.Post_Prayer_Request = async(req, res) => {
    try {
        if (
            req.body.name != null && req.body.name != ''
            && req.body.email != null && req.body.email != ''
            && req.body.phone != null && req.body.phone != ''
            && req.body.to_whom != null && req.body.to_whom != ''
            && req.body.request != null && req.body.request != ''

        ) {
            let Result = await UserController.Post_Prayer_Request(req.body);
            res.json(Result);
        } else {
            throw { sucess: false, msg: "All feilds required" };
        }
    } catch (error) {
        console.log(error)
        if (!res.headersSent) {
            res.json(error);
        }
    }
}

UserMediator.Get_Prayer_Requests = async(req, res) => {
    try {
        let Result = await UserController.Get_Prayer_Requests(req.body);
        res.json(Result);
    } catch (error) {
        console.log(error)
        if (!res.headersSent) {
            res.json(error);
        }
    }
}

UserMediator.Get_Presentations = async(req, res) => {
    try {
        let Result = await UserController.Get_Presentations(req.body);
        res.json(Result);
    } catch (error) {
        console.log(error)
        if (!res.headersSent) {
            res.json(error);
        }
    }
}

UserMediator.Add_Presentations = async(req, res) => {
    try {
        if (
            req.body.media != null && req.body.media != ""
            && req.body.id != null && req.body.id != ""
        ) {
            let Result = await UserController.Add_Presentations(req.body);
            res.json(Result);
        } else {
            throw { sucess: false, msg: "All feilds required" };
        }
    } catch (error) {
        console.log(error)
        if (!res.headersSent) {
            res.json(error);
        }
    }
}
module.exports = UserMediator;


