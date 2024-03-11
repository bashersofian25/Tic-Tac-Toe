// write as little global code as possible
// use the IIFE (module pattern) when needing only one instance
// be careful as where each piece of logic should reside.

// game status object -> one instance
// board object -> one instance, maybe using composition with the status object
// player object -> two instances 
// avoid working on the DOM until the game is working
// make it work in the console first
// take your time, this project is a practice for code structuring

const createPlayer = (name, isX) => {
    const playerName = name;
    const symbol = isX;

    return {playerName, symbol};
};
const game = (function () {
    
    const boardContent  = [[null,null,null],
    [null,null,null],
    [null,null,null]];
    const firstPlayer = createPlayer(undefined, true);
    const secondPlayer = createPlayer(undefined, false);

    const setFirstPlayerName = (playerName) => {
        firstPlayer.playerName = playerName;
    };

    const setSecondPlayerName = (playerName) => {
        secondPlayer.playerName = playerName;
    };

    const resetGame = () => {
        for(let i = 0; i<3; i++){
            for(let j = 0; j<3; j++){
                boardContent[i][j] = null;
            }
        }
        setFirstPlayerName(undefined);
        setSecondPlayerName(undefined);

        gameStatus.playerInTurn.playerName = undefined;
        gameStatus.winner = undefined;
        
    };

    const printBoardAndStatus = () => {
        console.log(boardContent);
        console.log(game);
        // console.log(gameStatus);
        // console.log(firstPlayer);
        // console.log(secondPlayer);
    };
    const gameStatus = (function() {
        let winner = undefined;
        const playerInTurn = createPlayer(undefined, undefined);


        const changeTurn = () => {
 
            if(playerInTurn.playerName == firstPlayer.playerName){
                playerInTurn.playerName = secondPlayer.playerName;
                playerInTurn.symbol = secondPlayer.symbol;
            }else{
                playerInTurn.playerName = firstPlayer.playerName;
                playerInTurn.symbol = firstPlayer.symbol;
            }
        };

        const checkState = () => {
            // here decide the winner if any
            let isOver = false;
            let winnerSymbol = null;
            if(boardContent[1][1] == boardContent[2][2] &&
                 boardContent[2][2] == boardContent[0][0]
                 && boardContent[2][2] !== null){
                isOver = true;
                winnerSymbol = boardContent[1][1];
            }
            if(boardContent[1][1] == boardContent[0][2] &&
                 boardContent[0][2] == boardContent[2][0]
                 && boardContent[0][2] !== null){
                isOver = true;
                winnerSymbol = boardContent[1][1];
            }
            for (let i = 0; i<3; i++){
                if(boardContent[i][1] == boardContent[i][2] &&
                     boardContent[i][2] == boardContent[i][0]
                     && boardContent[i][2] !== null){
                    isOver = true;
                    winnerSymbol = boardContent[i][2];
                    break;
                }else if(boardContent[1][i] == boardContent[2][i] &&
                     boardContent[2][i] == boardContent[0][i]
                     && boardContent[2][i] !== null){
                    isOver = true;
                    winnerSymbol = boardContent[2][i];
                    break;
                }
            }
            return {isOver, winnerSymbol};
        };

        return {winner, playerInTurn, changeTurn, checkState};
    })();

    const playTurn = (a, b) => {
        gameStatus.changeTurn();
        boardContent[a][b] = gameStatus.playerInTurn.symbol? "x":"o";
        const gameResult = gameStatus.checkState();
        if(gameResult.isOver){
            console.log(gameResult.winnerSymbol);
            resetGame();
        }
    };

    return {resetGame, gameStatus, boardContent,
         setFirstPlayerName, setSecondPlayerName,
          printBoardAndStatus, playTurn};
})();

game.setFirstPlayerName('basheer');
game.setSecondPlayerName('mohammad');



game.printBoardAndStatus();
game.playTurn(1, 1);
game.playTurn(2, 2);
game.playTurn(1, 2);
game.playTurn(2, 0);
console.log(game);