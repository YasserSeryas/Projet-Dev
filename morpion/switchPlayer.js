export var turn = 1;

export function switchPlayer() // permet de changer de joueur à chaque tour
{
    if(turn === 1)
    {
        turn=2
    }else{
        turn=1
    }

}1