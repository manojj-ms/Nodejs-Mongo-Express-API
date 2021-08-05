const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConfig = require("./app/config/db.config");

const app = express();

// const http = require('http').Server(app);
// const io = require('socket.io')(http, {
//     cors: {
//         origin: "http://localhost:8081",
//         methods: ["GET", "POST"],
//         credentials: true,
//         allowEIO4: true
//     },
//     transport: ['websocket']
// });

// io.on('connection', (socket) => {
//     console.log('A user connected');
//     //Whenever someone disconnects this piece of code executed
//     socket.on('disconnect', function () {
//         console.log('A user disconnected');
//     });
// });

var corsOptions = {
    origin: ["https://clever-joliot-683051.netlify.app", "http://localhost:3000"]
};
app.use(cors(corsOptions));


const db = require("./app/models");
const Role = require('./app/models/role.model')


db.mongoose
    .connect(`mongodb+srv://mongodbuser:Manoj1234@cluster0.gfbn0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });


// const corsOptions = {
//     origin: 'http://localhost:8081',
//     credentials: true,            //access-control-allow-credentials:true
//     optionSuccessStatus: 200
// }

// app.use(cors(corsOptions));

// io.on('connection', (socket) => {
//     socket.emit("Welcome", "Hello! from the server!");
// });


function initial() {
    Role.collection.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

        }
    });
}

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to MERN-API application." });
});

require("./app/routes/tutorial.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});