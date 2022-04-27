if (process.argv[2]=="server") {
const http = require('http').createServer();
const io = require('socket.io')(http);
const port = 3000

http.listen(port, ()=>console.log(`Serveur en ecoute sur le port : ${port}`));
io.on('connection', (socket) => {
    console.log('connected')
    socket.on('message',(evt)=>{
        console.log(evt)
        socket.broadcast.emit('message',evt)
       
    })
})
io.on('disconnect', (evt) => {
    console.log('disconnected')
})}
 if (process.argv[2]=="client") {
var server = 'http://localhost:3000';
var socket = require('socket.io-client')(server);
const repl = require('repl');
const chalk = require('chalk');
const { use } = require('express/lib/application');
// var username=null;

socket.on('connect',()=>{
    console.log(chalk.red('# Le chat a commencé #'))
    // username = process.argv[3]
})
socket.on('disconnect',function(){
    socket.emit('disconnect');

})
socket.on('message',data => {
    console.log(chalk.green(data.split('\n')[0]));
    console.log("à vous de jouer");
})
repl.start({
    prompt:'',
    eval:(data) =>{
        socket.send(data)
        console.log("Bien reçu attendez s\' il vous plait votre tour");
    }
})
 }