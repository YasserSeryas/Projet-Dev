var readline = require("readline-sync"); //lecture saisie du clavier

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

console.log(grid(tab));