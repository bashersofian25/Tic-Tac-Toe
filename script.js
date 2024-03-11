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
        const resultText = document.querySelector(".Result");
        resultText.innerText = "In Progress"
        gameStatus.playerInTurn.playerName = undefined;
        gameStatus.playerInTurn.symbol = undefined;
        gameStatus.Done = false;
        
    };

    const printBoardAndStatus = () => {
        console.log(boardContent);
        console.log(game);
        // console.log(gameStatus);
        // console.log(firstPlayer);
        // console.log(secondPlayer);
    };
    const gameStatus = (function() {
        let Done = false;
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
            let count = 0;
            for(let i = 0; i<3; i++){
                for(let j = 0; j<3; j++){
                    if(boardContent[i][j] != null){
                        count++;
                    }
                }
            }
            if(count == 9){
                isOver = true;
                winnerSymbol = "draw";
            }


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

        return {playerInTurn, changeTurn, checkState, Done};
    })();

    const playTurn = (a, b) => {
        if(gameStatus.Done){
            console.log("entering")
            return;
        }
        if(boardContent[a][b] != null){
            console.log(game.boardContent)
            return;
        }
        gameStatus.changeTurn();
        boardContent[a][b] = gameStatus.playerInTurn.symbol? "o":"x";
        const gameResult = gameStatus.checkState();
        if(gameResult.isOver){
            gameStatus.Done = true;
            const resultText = document.querySelector(".Result");
            console.log(gameResult.winnerSymbol);
            console.log(gameStatus.Done);
            if(gameResult.winnerSymbol == 'draw'){
                resultText.innerText = "Draw!"
            }else {
                resultText.innerText = `The winner is ${gameResult.winnerSymbol.toUpperCase()}`;
            }


        }
    };

    return {resetGame, gameStatus, boardContent,
         setFirstPlayerName, setSecondPlayerName,
          printBoardAndStatus, playTurn};
})();


const renderBoard = () => {
    const content = document.querySelectorAll('#board div');
    content.forEach(element => {
       element.remove(); 
    });
    const board = document.querySelector('#board');
    for(let i = 0; i<3; i++){
        for(let j = 0; j<3; j++){
            const square = document.createElement('div');
            square.classList.add(`row${i}`);
            square.classList.add(`column${j}`);
            square.addEventListener('click', (e) => {
                const classes = e.target.classList;
                const row = classes[0];
                const column = classes[1];
                const rowNum = Number(row[row.length -1]);
                const colNum = Number(column[column.length -1])
                if(!game.gameStatus.Done && game.boardContent[rowNum][colNum] == null){
                    e.target.classList.add(`${(game.gameStatus.playerInTurn.symbol)?"x":"y"}`);
                }
                game.playTurn(rowNum, colNum);
               
            });
            board.append(square);
        }
    }
}

const restartButton = document.getElementById('restart');
restartButton.addEventListener('click', () => {
    game.resetGame();
    renderBoard();
});

game.setFirstPlayerName('firstPlayer');
game.setSecondPlayerName('secondPlayer');


renderBoard();