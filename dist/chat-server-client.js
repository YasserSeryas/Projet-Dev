"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//lecture saisie du clavier
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const mysql_1 = __importDefault(require("mysql"));
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const repl_1 = __importDefault(require("repl"));
const game_1 = require("./morpion/game");

// const grid_1 = require("./morpion/grid");
function create_bdd(){
    const db = mysql_1.default.createConnection({
        host: "localhost",
        user: "root",
        password: "root"
      });
     
      db.connect(function(err) {
        if (err) {
            console.log("Erreur de connexion");
        };
        console.log("Connecté à la base de données MySQL!");
       db.query("CREATE DATABASE mabddjs", function (err, result) {
        
            if (err) {
                console.log("base de données existe déja");
      
       
            } else {
                console.log("Base de données créée !");
            };
            
            db.end();
          });
      });
}
function connectdb() {
    
    const db = mysql_1.default.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "mabddjs",
    });
    let pseudo = process.argv[3];
    db.connect(function (err) {
        if (err)
            throw err;
            let sql = "CREATE TABLE IF NOT EXISTS game  ( pseudo Text,date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";
        db.query(sql);
        let sql_3 = "INSERT INTO `game`(`pseudo`) VALUES (?)";
        db.query(sql_3, pseudo);
                // db.query("SELECT * From game", function(err,result){
                //     console.log(result);
                // })
            
            console.log("Bienvenue " + pseudo);
            db.end();
        });
    
}
function delete_data() {
    const db = mysql_1.default.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "mabddjs",
    });
    let pseudo = process.argv[3];
    db.connect(function (err) {
        if (err)
            throw err;
        if (err) {
            console.log("La base de données MySQL existe déjà");
            let sql = "DELETE FROM `game` WHERE pseudo = ?";
            db.query(sql, pseudo);
            db.end();
        }
    });
}
/////////////////////////////// Network /////////////////////////////////////////
// Server
if (process.argv[2] == "server") {
    const http_s = http_1.default.createServer();
    const io = new socket_io_1.Server(http_s);
    const port = 3000;
    let connectionsLimit = 2;
    create_bdd();
    http_s.listen(port, () => console.log(`Serveur en ecoute sur le port : ${port}`));
    io.on('connection', (socket) => {
        // limit the number of connections
        if (io.engine.clientsCount > connectionsLimit) {
            // @ts-ignore
            socket.emit({ message: 'reach the limit of connections' });
            socket.disconnect();
            console.log('Disconnected...');
            return;
        }
        else {
            console.log('connected');
        }
        socket.on('message', (evt) => {
            console.log(evt);
            socket.broadcast.emit('message', evt);
        });
    });
    io.on('disconnect', (evt) => {
        console.log('disconnected');
        delete_data();
    });

}
//Client 
if (process.argv[2] == "client") {
    let server = 'http://localhost:3000';
    let socket = (0, socket_io_client_1.default)(server);
    this.game = new game_1.Game(false, 9).play();
    // let username=null;
    socket.on('connect', () => {
        
        connectdb();
        console.log('# Le jeu a commencé #');
        // username = process.argv[3]
    });
    socket.on('disconnect', function () {
        socket.emit('disconnect');
    });
    socket.on('message', data => {
        console.log(data.split('\n')[0]);
        console.log("à vous de jouer");
        this.game;
        
    });
    repl_1.default.start({
        prompt: '',
        eval: (data) => {
            socket.send(data);
            console.log("Attendez votre tour");
            this.game;
        
        
        }
    });
}
//# sourceMappingURL=chat-server-client.js.map