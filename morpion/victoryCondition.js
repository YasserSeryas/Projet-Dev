import { tab } from "./grid.js";

export function victoryCondition()
{
    for(var i=0; i < tab.length; i++) //accès aux lignes 1, 2, 3
    {
        for(var j=0; j < tab[i].length; j++) // | | --> à chaque case (0)
        {
            //Conditions pour le joueur X

            if(tab[0][0]===1 && tab[1][0]===1 && tab[2][0] ===1 ) return true;
            if(tab[0][1]===1 && tab[1][1]===1 && tab[2][1] ===1 ) return true;
            if(tab[0][2]===1 && tab[1][2]===1 && tab[2][2] ===1 ) return true;

            if(tab[0][0]===1 && tab[0][1]===1 && tab[0][3] ===1 ) return true;
            if(tab[1][0]===1 && tab[1][1]===1 && tab[1][2] ===1 ) return true;
            if(tab[2][0]===1 && tab[2][1]===1 && tab[2][2] ===1 ) return true;

            if(tab[0][0]===1 && tab[1][1]===1 && tab[2][2] ===1 ) return true;
            if(tab[2][2]===1 && tab[1][1]===1 && tab[0][0] ===1 ) return true;

            //Conditions pour le joueur 0

            if(tab[0][0]===2 && tab[1][0]===2 && tab[2][0] ===2 ) return true;
            if(tab[0][1]===2 && tab[1][1]===2 && tab[2][1] ===2 ) return true;
            if(tab[0][2]===2 && tab[1][2]===2 && tab[2][2] ===2 ) return true;

            if(tab[0][0]===2 && tab[0][1]===2 && tab[0][3] ===2 ) return true;
            if(tab[1][0]===2 && tab[1][1]===2 && tab[1][2] ===2 ) return true;
            if(tab[2][0]===2 && tab[2][1]===2 && tab[2][2] ===2 ) return true;

            if(tab[0][0]===2 && tab[1][1]===2 && tab[2][2] ===2 ) return true;
            if(tab[2][2]===2 && tab[1][1]===2 && tab[0][0] ===2 ) return true;

        }
    }
}
