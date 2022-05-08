
//lecture saisie du clavier
import http from 'http'
import {Server, Socket} from "socket.io";
import mysql from "mysql";
import client from "socket.io-client";
import repl from "repl";
import {Game} from "./morpion/game";

function connectdb(){
    const db = mysql.createConnection({

    host: "localhost",
 
    user: "root",
 
    password: "root",

    database : "mabddjs",
 
  });
  let pseudo = process.argv[3];
  db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
   db.query("CREATE DATABASE mabddjs", function (err, result) {
        if (err){
            console.log("La base de données MySQL existe déjà");
            let sql ="INSERT INTO `game`(`pseudo`) VALUES (?)";
            db.query(sql,pseudo);       
            // db.query("SELECT * From game", function(err,result){
               
            //     console.log(result);
               
            // })
        } else {
            console.log("Base de données créée !");
        }
        console.log("Bienvenue " + pseudo);
        db.end();
      });
  });
} 
function delete_data(){
    const db = mysql.createConnection({

    host: "localhost",
 
    user: "root",
 
    password: "root",

    database : "mabddjs",
 
  });
  let pseudo = process.argv[3];
  db.connect(function(err) {
    if (err) throw err;
    if (err){
        console.log("La base de données MySQL existe déjà");
        let sql ="DELETE FROM `game` WHERE pseudo = ?";
        db.query(sql,pseudo);
        db.end();
    }

});
}

/////////////////////////////// Network /////////////////////////////////////////
if (process.argv[2]=="server") {

const http_s = http.createServer();
const io = new Server(http_s);
const port = 3000
let connectionsLimit = 2;

http_s.listen(port, ()=>console.log(`Serveur en ecoute sur le port : ${port}`));
io.on('connection', (socket) => {
    // limit the number of connections
    if (io.engine.clientsCount > connectionsLimit) {
    // @ts-ignore
        socket.emit( { message: 'reach the limit of connections' })
        socket.disconnect()
        console.log('Disconnected...')
        return
      }else {
          console.log('connected')
         
         
      }
    socket.on('message',(evt)=>{
        
        console.log(evt)
        socket.broadcast.emit('message',evt)
       
    })

})
io.on('disconnect', (evt) => {
    console.log('disconnected')
    delete_data();
})}
 if (process.argv[2]=="client") {
let server = 'http://localhost:3000';
let socket = client(server);

// let username=null;

socket.on('connect',()=>{
   connectdb();
    console.log('# Le jeu a commencé #');
    
   
    // username = process.argv[3]
})

socket.on('disconnect',function(){
    
    socket.emit('disconnect');

})
socket.on('message',data => {
    console.log(data.split('\n')[0]);
    console.log("à vous de jouer");
   
    new Game(false, 9).play();
   
})
repl.start({
    prompt:'',
    eval:(data) =>{
        socket.send(data)
        console.log("Attendez votre tour");
        
      
    }
})}