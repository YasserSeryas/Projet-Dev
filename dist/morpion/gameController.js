"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = exports.turn = void 0;
const grid_1 = require("./grid");
exports.turn = 1;
class GameController {
    static switchPlayer() {
        if (exports.turn === 1) {
            exports.turn = 2;
        }
        else {
            exports.turn = 1;
        }
    }
    static victoryCondition() {
        if (grid_1.tab[0][0] === 1 && grid_1.tab[1][0] === 1 && grid_1.tab[2][0] === 1)
            return true; //vertical gauche
        if (grid_1.tab[0][1] === 1 && grid_1.tab[1][1] === 1 && grid_1.tab[2][1] === 1)
            return true; //vertical milieu
        if (grid_1.tab[0][2] === 1 && grid_1.tab[1][2] === 1 && grid_1.tab[2][2] === 1)
            return true; //vertical droit
        if (grid_1.tab[0][0] === 1 && grid_1.tab[0][1] === 1 && grid_1.tab[0][2] === 1)
            return true; //horizontal haut
        if (grid_1.tab[1][0] === 1 && grid_1.tab[1][1] === 1 && grid_1.tab[1][2] === 1)
            return true; //horizontal milieu
        if (grid_1.tab[2][0] === 1 && grid_1.tab[2][1] === 1 && grid_1.tab[2][2] === 1)
            return true; //horizontal bas
        if (grid_1.tab[0][0] === 1 && grid_1.tab[1][1] === 1 && grid_1.tab[2][2] === 1)
            return true; //diagonal gauche-droite
        if (grid_1.tab[0][2] === 1 && grid_1.tab[1][1] === 1 && grid_1.tab[2][0] === 1)
            return true; //diagonal droite-gauche
        //Conditions pour le joueur 0
        if (grid_1.tab[0][0] === 2 && grid_1.tab[1][0] === 2 && grid_1.tab[2][0] === 2)
            return true;
        if (grid_1.tab[0][1] === 2 && grid_1.tab[1][1] === 2 && grid_1.tab[2][1] === 2)
            return true;
        if (grid_1.tab[0][2] === 2 && grid_1.tab[1][2] === 2 && grid_1.tab[2][2] === 2)
            return true;
        if (grid_1.tab[0][0] === 2 && grid_1.tab[0][1] === 2 && grid_1.tab[0][2] === 2)
            return true;
        if (grid_1.tab[1][0] === 2 && grid_1.tab[1][1] === 2 && grid_1.tab[1][2] === 2)
            return true;
        if (grid_1.tab[2][0] === 2 && grid_1.tab[2][1] === 2 && grid_1.tab[2][2] === 2)
            return true;
        if (grid_1.tab[0][0] === 2 && grid_1.tab[1][1] === 2 && grid_1.tab[2][2] === 2)
            return true;
        if (grid_1.tab[0][2] === 2 && grid_1.tab[1][1] === 2 && grid_1.tab[2][0] === 2)
            return true;
        return false;
    }
    static verifyPosition(inputColumn, inputLine, tab) {
        if (inputLine >= 0 && inputLine <= 3)
            if (inputColumn >= 0 && inputColumn <= 3)
                if (tab[inputLine - 1][inputColumn - 1] === 0) {
                    //condition qui verifie si la saisie de la ligne est faite entre 1 et 3
                    //condition qui verifie si la saisie de la colonne est faite entre 1 et 3
                    //verifie si il y a un emplacement sur la position saisie
                    return true;
                }
                else {
                    return false;
                }
    }
}
exports.GameController = GameController;
//# sourceMappingURL=gameController.js.map