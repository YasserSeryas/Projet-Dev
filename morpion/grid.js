var line1=[0,0,0] 
var line2=[0,0,0] 
var line3=[0,0,0] 
    
export var tab=[line1,line2,line3]; // tableau à double dimension

export function grid(tab)
{
    for(var i=0; i < tab.length; i++) //accès aux lignes 1, 2, 3
    {
        var design ="";
    
        for(var j=0; j < tab[i].length; j++) // | | --> à chaque case (0)
        {

            if (tab[i][j] === 0) //condition qui vérifie si des valeur on été saisie, si 0 valeur saisie --> on ajoute pas de X ni de O
            {
                design +="| |"; //concaténation
            }
            else if (tab[i][j] === 1) //condition qui vérifie si des valeur on été saisie, joueur 1 à saisie une valeur --> on ajoute X à la position donnée 
            {
                design +="|X|";
            }

            else if (tab[i][j] === 2) 
            {
                design +="|O|";
            }

        }

        console.log(design);

    }
}
