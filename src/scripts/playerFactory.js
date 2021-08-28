import gameBoardFactory from "./gameBoardFactory";

const playerFactory = () => {
    const gameboard = gameBoardFactory()
    const hasTurn 

    const changeHasTurn = () =>{
        hasTurn = !hasTurn
    }

    const attack = (x,y,gameboard) => {
        return gameboard.recieveAttack(x,y,gameboard)
    }

export {hasTurn, changeHasTurn}
};

export default playerFactory;
