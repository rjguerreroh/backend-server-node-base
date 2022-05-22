const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // Connect to database
        this.connectDB();

        // Middlewares
        this.middlewares();

        // My application routes
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares(){
        // public directory
        this.app.use( cors() );
        this.app.use( express.static('public') );

        // Read and Parse of body
        this.app.use( express.json() );
    }

    routes(){
        this.app.use(this.usersPath, require('../routes/user'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Server on port ${this.port}`);
        });
    }
}

module.exports = Server;