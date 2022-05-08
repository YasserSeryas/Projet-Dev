"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const readline = __importStar(require("node:readline/promises"));
const node_process_1 = require("node:process");
const gameController_1 = require("./gameController");
const grid_1 = require("./grid");
const rl = readline.createInterface({ input: node_process_1.stdin, output: node_process_1.stdout, prompt: '>' });
class Game {
    constructor(end, nbTour) {
        this.end = end;
        this.nbTour = nbTour;
    }
    async play() {
        this.grid = new grid_1.Grid();
        this.grid.buildGrid();
        while (!this.end) {
            let position = false;
            while (!position) {
                console.log("Où placez-vous votre morpion ?");
                var inputLine =   await rl.question('Line:', (answer) => {
                    inputLine = parseInt(answer);
                    rl.close();
                });;
              
                var inputColumn=await rl.question("Column : ", (answer) => {
                    inputColumn = parseInt(answer);
                    rl.close();
                });;
                 //insérer une valeur sur la colonne voulu
                position = gameController_1.GameController.verifyPosition(inputColumn, inputLine, grid_1.tab);
                if (!position) {
                    console.log("----------------------------");
                    console.log("Choisir une position valide");
                    console.log("----------------------------");
                }
            }
            this.nbTour--;
            this.grid.tab[inputLine - 1][inputColumn - 1] = gameController_1.turn; //valeur que le joueur numéro 1 saisie, -1 --> car tableau commence indice 0
            gameController_1.GameController.switchPlayer();
            this.grid.buildGrid(); //on réexécute le tableau pour mettre à jour les valeur
            this.end = gameController_1.GameController.victoryCondition();
            if (this.end) {
                if (gameController_1.turn === 1) {
                    console.log("Joueur O vous avez gagné !");
                }
                if (gameController_1.turn === 2) {
                    console.log("Joueur X vous avez gagné !");
                }
                return;
            }
            if (this.nbTour == 0) {
                console.log("Egalité !");
                return;
            }
        }
    }
}
exports.Game = Game;
//# sourceMappingURL=game.js.map