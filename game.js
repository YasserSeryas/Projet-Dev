import readline from "readline-sync"; //lecture saisie du clavier

import { grid, tab } from './morpion/grid.js'; //importation de la grille et du tableau dans le fichier grid.js
import { switchPlayer, turn } from './morpion/switchPlayer.js';
import { verifyPosition } from "./morpion/verifyPosition.js";
import { victoryCondition } from "./morpion/victoryCondition.js";

let end = false;
let nbtour= 9;

function game()
{
    grid(tab); // éxecution de la grille

    while(!end)
    {
        let position = false;
        
        while(!position)
        {
            console.log("Où placez-vous votre morpion ?");
            var inputLine = parseInt(readline.question("Line : ")); //insérer une valeur sur la ligne voulu
            var inputColumn = parseInt(readline.question("Column : ")); //insérer une valeur sur la colonne voulu
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

game(); //exécution du jeux en entier