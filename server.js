const express = require('express');
const cors = require("cors");
const http = require('http');
const WebSocket = require('ws');

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
  };
  
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const path = __dirname+'/views/'
app.use(express.static(path));

//const server = http.createServer(app);
//const wss = new WebSocket.Server({ server });

// WebSocket connection handler
/*
wss.on('connection', function connection(ws) {
    console.log('WebSocket connected');

    ws.on('message', function incoming(message) {
        console.log('Received:', message);
        // Echo the message back to the client
        ws.send(`Echo: ${message}`);
    });

    ws.on('close', function close() {
        console.log('WebSocket disconnected');
    });
});
*/

// DATABASE
const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

db.sequelize.sync({ force: true }).then(() => {
console.log("Drop and re-sync db.");
});

// Define your Express routes here
app.get('/', (req, res) => {
    //res.send('Hola from Express!');
    res.sendFile(path + 'index.html');
    res.json({ message: "Welcome to bezkoder application." });
});

// Setup routes
require("./app/routes/tutorial.routes")(app);

// Start the HTTP server
const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});