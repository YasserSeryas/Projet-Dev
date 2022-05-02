const { connect } = require('http2');

// grid      
var ligne1=[0,0,0] 
var ligne2=[0,0,0] 
var ligne3=[0,0,0] 
    
 var tab=[ligne1,ligne2,ligne3];

 function grid(tab)
{
    for(var i=0; i < tab.length; i++) //accès aux lignes 1, 2, 3
    {
        var design ="";
    
        for(var j=0; j < tab[i].length; j++) // | | --> à chaque case (0)
        {

            design +="| |";

        }

        console.log(design);

    }
} 
/////game 
function game()
{
    grid(tab);
}
// Databased function 
function connectdb(){
    const mysql =require('mysql');
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
            sql ="INSERT INTO `game`(`pseudo`) VALUES (?)"
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
    const mysql =require('mysql');
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
const http = require('http').createServer();
const io = require('socket.io')(http);
const port = 3000
var connectionsLimit = 2;

http.listen(port, ()=>console.log(`Serveur en ecoute sur le port : ${port}`));
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
var socket = require('socket.io-client')(server);
const repl = require('repl');
const chalk = require('chalk');
const { use } = require('express/lib/application');
// var username=null;

socket.on('connect',()=>{
   connectdb();
    console.log(chalk.red('# Le jeu a commencé #'))
    
    game();
    // username = process.argv[3]
})

socket.on('disconnect',function(){
    
    socket.emit('disconnect');

})
socket.on('message',data => {
    console.log(chalk.green(data.split('\n')[0]));
    console.log("à vous de jouer");
    game();
   
})
repl.start({
    prompt:'',
    eval:(data) =>{
        socket.send(data)
        console.log("Attendez votre tour");
        game();
        if(data.split('\n')[0]==0){
        
            socket.emit('disconnect');
        }
    }
})
 }