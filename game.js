import readline from "readline-sync"; //lecture saisie du clavier

import {grid, tab} from './morpion/grid.js';

function game()
{
    grid(tab);
    console.log("Où placez-vous votre morpion ?");
    var inputLine = readline.question("Line : ");
    var inputColumn = readline.question("Colonne : ");
}

game();