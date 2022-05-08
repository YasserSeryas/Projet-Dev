import * as readline from 'node:readline-promises'; //lecture saisie du clavier
import { GameController, turn } from "./gameController";
import { Grid, tab } from "./grid";
var rl = readline.createInterface(process.stdin, process.stdout);
export class Game {
  grid: Grid;
  constructor(public end: boolean, public nbTour: number) {}

  public play() {
    this.grid = new Grid();
    this.grid.buildGrid();

    while (!this.end) {
      let position: boolean = false;

      while (!position) {
        console.log("Où placez-vous votre morpion ?");
        var inputLine = parseInt(readline.question("Line : "));
        console.log(""); //insérer une valeur sur la ligne voulu
        var inputColumn = parseInt(readline.question("Column : "));
        console.log(""); //insérer une valeur sur la colonne voulu
        position = GameController.verifyPosition(inputColumn, inputLine, tab);

        if (!position) {
          console.log("----------------------------");
          console.log("Choisir une position valide");
          console.log("----------------------------");
        }
      }

      this.nbTour--;
      this.grid.tab[inputLine - 1][inputColumn - 1] = turn; //valeur que le joueur numéro 1 saisie, -1 --> car tableau commence indice 0
      GameController.switchPlayer();
      this.grid.buildGrid(); //on réexécute le tableau pour mettre à jour les valeur
      this.end = GameController.victoryCondition();

      if (this.end) {
        if (turn === 1) {
          console.log("Joueur O vous avez gagné !");
        }

        if (turn === 2) {
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
