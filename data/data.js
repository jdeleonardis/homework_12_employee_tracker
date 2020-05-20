const connection = require("./connection");


class Data {
    constructor (connection){
        this.connection = connection;
        console.log("MySQL connected")
    };

}

module.exports = new Data(connection);