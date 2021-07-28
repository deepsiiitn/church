const { validationResult } = require("express-validator");
let ErrorHandler = function() {};
var bcrypt = require('bcrypt-nodejs');
const Counters = require('../model/counters');


//Functions
ErrorHandler.generateSequenceNumber = (collection_name) => {
    return new Promise((resolve, reject) => {
        setImmediate(async () => {
            try {
                const data = await Counters.findOneAndUpdate(
                    { collection_name: collection_name }, 
                    { $inc: { seq_no: 1 } },
                    { new: true, upsert: true });

                resolve(data.seq_no);
            } catch (error) {
                reject(await ErrorHandler.Common_Error_Handler(error));
            }
        });
    });
}

ErrorHandler.Common_Error_Handler = (error) => {
    return new Promise((resolve, reject) => {
        setImmediate(async () => {

            try {
                console.error("Common_Error_Handler------->", error);
                if (error.sucess == null || error.sucess == undefined) {
                    if (error instanceof SyntaxError) {
                        resolve({ sucess: false, msg: "Server Error", extras: { msg: "Server Error" } });
                    } else {
                        resolve({ success: false, msg: "Database Error", extras: { msg: "Server Error" } });
                    }
                } else {
                    resolve(error);
                }
            } catch (error) {
                console.error('Something Error Handler--->', error);
            }
        });
    });
};

module.exports = ErrorHandler;