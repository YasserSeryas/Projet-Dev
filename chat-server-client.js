
import readline from "node:readline/promises"; //lecture saisie du clavier
import http from "http";
import {Server,Socket} from "socket.io";
import mysql from "mysql";
import { grid, tab } from './morpion/grid.js'; //importation de la grille et du tableau dans le fichier grid.js
import { switchPlayer, turn } from './morpion/switchPlayer.js';
import { verifyPosition } from "./morpion/verifyPosition.js";
import { victoryCondition } from "./morpion/victoryCondition.js";
import client from "socket.io-client";
// var socket = require('socket.io-client')(server);
import repl from "repl";
// const repl = require('repl');
// const chalk = require('chalk');
import chalk from "chalk";
// const { use } = require('express/lib/application');
var rl = readline.createInterface(process.stdin, process.stdout);
/////game 
let end = false;
let nbtour= 9;

async function game()
{
    grid(tab); // éxecution de la grille

    while(!end)
    {
        let position = false;
        
        while(!position)
        {
            console.log("Où placez-vous votre morpion ?");
            var inputLine = parseInt(await rl.question("Line : ")); //insérer une valeur sur la ligne voulu
            console.log("");
            var inputColumn = parseInt(await rl.question("Column : "))
            console.log("");; //insérer une valeur sur la colonne voulu
            position = verifyPosition(inputColumn, inputLine, tab);

            if(!position)
            {
                console.log("----------------------------")
                console.log("Choisir une position valide");
                console.log("----------------------------")
            }
        }

        nbtour--;
        tab[inputLine-1][inputColumn-1] = turn; //valeur que le joueur numéro 1 saisie, -1 --> car tableau commence indice 0 
        switchPlayer();
        grid(tab); //on réexécute le tableau pour mettre à jour les valeur
        end = victoryCondition();

        if(end)
        {
            if(turn===1)
            {
                console.log("Joueur O vous avez gagné !");
            }

            if(turn===2)
            {
                console.log("Joueur X vous avez gagné !");
            }
            return;
        }

        if(nbtour==0)
        {
            console.log("Egalité !");
            return;
        }
    }
}
 


// Databased function 
function connectdb(){
    const db = mysql.createConnection({

    host: "localhost",
 
    user: "root",
 
    password: "root",

    database : "mabddjs",
 
  });
  var pseudo = process.argv[3];
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
  var pseudo = process.argv[3];
  db.connect(function(err) {
    if (err) throw err;
    if (err){
        console.log("La base de données MySQL existe déjà");
        sql ="DELETE FROM `game` WHERE pseudo = ?";
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
var connectionsLimit = 2;

http_s.listen(port, ()=>console.log(`Serveur en ecoute sur le port : ${port}`));
io.on('connection', (socket) => {
    // limit the number of connections
    if (io.engine.clientsCount > connectionsLimit) {
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
var server = 'http://localhost:3000';
var socket = client(server);

// var username=null;

socket.on('connect',()=>{
   connectdb();
    console.log(chalk.red('# Le jeu a commencé #'))
    
   grid(tab);
    // username = process.argv[3]
})

socket.on('disconnect',function(){
    
    socket.emit('disconnect');

})
socket.on('message',data => {
    console.log(chalk.green(data.split('\n')[0]));
    console.log("à vous de jouer");
    grid(tab);
    game();
   
})
repl.start({
    prompt:'',
    eval:(data) =>{
        socket.send(data)
        console.log("Attendez votre tour");
        grid(tab);
        if(data.split('\n')[0]==0){
        
            socket.emit('disconnect');
        }
    }
})
 }