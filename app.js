const express = require('express')
const mongoose = require('mongoose');
var mongourl = 'mongodb://localhost:27017/foodApp';
const bodyParser = require("body-parser");
const CookieParser = require("cookie-parser");

const routers = require('./routes/routes');

const mongoConnection = async () => {
    let db = null;
    try {
        await mongoose.createConnection(mongourl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
        console.log("Connected with MongoDB")
    } catch (err) {
        (db) && db.close();
        console.log('MongoError at ::', err)
        throw err;
    }
}
// mongoConnection();
const app = express();

app.set('view options', {
    layout: true
});
app.set('layout', 'container');
app.set('views', __dirname + '/dist/api_dist');
app.set('view engine', 'html');
app.use(bodyParser.text({ limit: '50mb' }))
app.use(bodyParser.raw({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit: '100000000000' }));
app.use(CookieParser());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});


// require('dotenv').config()


app.use('/admin', routers )

// app.get('/',(req,res) => {
//     res.send("Hello");
// })

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=> {
    console.log("Listening on Port 3000")
})
