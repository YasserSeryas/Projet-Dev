function connectdb(){
    const mysql =require('mysql');
    const db = mysql.createConnection({

    host: "localhost",
 
    user: "root",
 
    password: "root",

    database : "mabddjs",
 
  });
  var pseudo = process.argv[2];
  db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
   db.query("CREATE DATABASE mabddjs", function (err, result) {
        if (err){
            console.log("La base de données MySQL existe déjà");
            sql ="INSERT INTO `game`(`pseudo`) VALUES (?)"
            db.query(sql,pseudo);
        
        

        
           
            db.query("SELECT * From game", function(err,result){
               
                console.log(result);
               
            })
        } else {
            console.log("Base de données créée !");
        }
        console.log("Bienvenue " + pseudo);
    
      });
  });
} 