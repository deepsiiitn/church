const config = require("./config");
let Mongoose = require("mongoose");
Mongoose.Promise = global.Promise;

let MongoURL = 'mongodb://localhost:27017/foodApp';
let options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}

Mongoose.church = Mongoose.createConnection(MongoURL, options);
console.log("connection established with", MongoURL);

module.exports = Mongoose;