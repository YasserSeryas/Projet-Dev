import { tab } from "./grid";
export let turn = 1;

export class GameController {
  public static switchPlayer() {
    if (turn === 1) {
      turn = 2;
    } else {
      turn = 1;
    }
  }

  public static victoryCondition() {
    if (tab[0][0] === 1 && tab[1][0] === 1 && tab[2][0] === 1) return true; //vertical gauche
    if (tab[0][1] === 1 && tab[1][1] === 1 && tab[2][1] === 1) return true; //vertical milieu
    if (tab[0][2] === 1 && tab[1][2] === 1 && tab[2][2] === 1) return true; //vertical droit

    if (tab[0][0] === 1 && tab[0][1] === 1 && tab[0][2] === 1) return true; //horizontal haut
    if (tab[1][0] === 1 && tab[1][1] === 1 && tab[1][2] === 1) return true; //horizontal milieu
    if (tab[2][0] === 1 && tab[2][1] === 1 && tab[2][2] === 1) return true; //horizontal bas

    if (tab[0][0] === 1 && tab[1][1] === 1 && tab[2][2] === 1) return true; //diagonal gauche-droite
    if (tab[0][2] === 1 && tab[1][1] === 1 && tab[2][0] === 1) return true; //diagonal droite-gauche

    //Conditions pour le joueur 0

    if (tab[0][0] === 2 && tab[1][0] === 2 && tab[2][0] === 2) return true;
    if (tab[0][1] === 2 && tab[1][1] === 2 && tab[2][1] === 2) return true;
    if (tab[0][2] === 2 && tab[1][2] === 2 && tab[2][2] === 2) return true;

    if (tab[0][0] === 2 && tab[0][1] === 2 && tab[0][2] === 2) return true;
    if (tab[1][0] === 2 && tab[1][1] === 2 && tab[1][2] === 2) return true;
    if (tab[2][0] === 2 && tab[2][1] === 2 && tab[2][2] === 2) return true;

    if (tab[0][0] === 2 && tab[1][1] === 2 && tab[2][2] === 2) return true;
    if (tab[0][2] === 2 && tab[1][1] === 2 && tab[2][0] === 2) return true;

    return false;
  }

  public static verifyPosition(
    inputColumn: number,
    inputLine: number,
    tab: any
  ) {
    if (inputLine >= 0 && inputLine <= 3)
      if (inputColumn >= 0 && inputColumn <= 3)
        if (tab[inputLine - 1][inputColumn - 1] === 0) {
          //condition qui verifie si la saisie de la ligne est faite entre 1 et 3
          //condition qui verifie si la saisie de la colonne est faite entre 1 et 3
          //verifie si il y a un emplacement sur la position saisie
          return true;
        } else {
          return false;
        }
  }
}
