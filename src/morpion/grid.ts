let line1 = [0, 0, 0];
let line2 = [0, 0, 0];
let line3 = [0, 0, 0];

export let tab = [line1, line2, line3]; // tableau à double dimension

export class Grid {
  tab: number[][];

  constructor() {
    this.tab = tab;
  }

  public buildGrid() {
    for (
      let i = 0;
      i < tab.length;
      i++ //accès aux lignes 1, 2, 3
    ) {
      let design = "";

      for (
        let j = 0;
        j < tab[i].length;
        j++ // | | --> à chaque case (0)
      ) {
        if (tab[i][j] === 0) {
          //condition qui vérifie si des valeur on été saisie, si 0 valeur saisie --> on ajoute pas de X ni de O
          design += "| |"; //concaténation
        } else if (tab[i][j] === 1) {
          //condition qui vérifie si des valeur on été saisie, joueur 1 à saisie une valeur --> on ajoute X à la position donnée
          design += "|X|";
        } else if (tab[i][j] === 2) {
          design += "|O|";
        }
      }

      console.log(design);
    }
  }
}
