let config = function() {};



if (process.env.NODE_ENV === "production") {
    config.hostname = '';
    config.base_url = "";
    config.MongoURL = ``;
} 

if (process.env.NODE_ENV === "devlopment") {
    console.log('Development Settings')
    config.MongoURL = `mongodb://localhost:27017/foodApp`;
    config.base_url = "http://localhost:3000/";
    console.log("Config Done")
}


module.exports = config;