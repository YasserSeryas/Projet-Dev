import { tab } from "./grid.js";

export function victoryCondition()
{
    //Conditions pour le joueur X

    if(tab[0][0]===1 && tab[1][0]===1 && tab[2][0] ===1 ) return true; //vertical gauche 
    if(tab[0][1]===1 && tab[1][1]===1 && tab[2][1] ===1 ) return true; //vertical milieu
    if(tab[0][2]===1 && tab[1][2]===1 && tab[2][2] ===1 ) return true; //vertical droit

    if(tab[0][0]===1 && tab[0][1]===1 && tab[0][2] ===1 ) return true; //horizontal haut 
    if(tab[1][0]===1 && tab[1][1]===1 && tab[1][2] ===1 ) return true; //horizontal milieu 
    if(tab[2][0]===1 && tab[2][1]===1 && tab[2][2] ===1 ) return true; //horizontal bas

    if(tab[0][0]===1 && tab[1][1]===1 && tab[2][2] ===1 ) return true; //diagonal gauche-droite
    if(tab[0][2]===1 && tab[1][1]===1 && tab[2][0] ===1 ) return true; //diagonal droite-gauche

    //Conditions pour le joueur 0

    if(tab[0][0]===2 && tab[1][0]===2 && tab[2][0] ===2 ) return true; 
    if(tab[0][1]===2 && tab[1][1]===2 && tab[2][1] ===2 ) return true;
    if(tab[0][2]===2 && tab[1][2]===2 && tab[2][2] ===2 ) return true;

    if(tab[0][0]===2 && tab[0][1]===2 && tab[0][2] ===2 ) return true;
    if(tab[1][0]===2 && tab[1][1]===2 && tab[1][2] ===2 ) return true;
    if(tab[2][0]===2 && tab[2][1]===2 && tab[2][2] ===2 ) return true;

    if(tab[0][0]===2 && tab[1][1]===2 && tab[2][2] ===2 ) return true;
    if(tab[0][2]===2 && tab[1][1]===2 && tab[2][0] ===2 ) return true;

    return false;
}
