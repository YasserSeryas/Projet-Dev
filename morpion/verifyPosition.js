export function verifyPosition(inputColumn, inputLine, tab)
{
    if (inputLine >=0 && inputLine <=3) //condition qui verifie si la saisie de la ligne est faite entre 1 et 3
    if (inputColumn >=0 && inputColumn <=3) //condition qui verifie si la saisie de la colonne est faite entre 1 et 3
    if (tab[inputLine-1][inputColumn-1]===0) //verifie si il y a un emplacement sur la position saisie
    {
        return true;
    }else{
        return false;
    }

}