import {useState} from 'react';


// Square = tlhe game elements
//  {value} indicates that Square compnent can be called a prop called value
// {value} = prop passed in Board ---- <Square value={squares[n]}
function Square({value, onSquareClick}){
  return <button className="square" onClick={onSquareClick}>{value}</button>
  }

  // The game board
function Board({xIsNext, squares, onPlay}) {

  function handleClick(index){
    if(calculateWinner(squares) || squares[index]){
      return;
    }

    const nextSquares = squares.slice();
    // creates shallow copy of currentSquares from Game which initially is 

    if(xIsNext){
      nextSquares[index] = 'X';
    }else{
      nextSquares[index] = 'O';
    }
    onPlay(nextSquares);
    
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner){
    status = "Winner: " + winner;
  }else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return( 
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]}  onSquareClick={()=>{handleClick(0)}}/>
        {/* squares[0 , 1 ,2...] represents the index value of the square pressed */}
        <Square value={squares[1]}  onSquareClick={()=>{handleClick(1)}}/>
        <Square value={squares[2]}  onSquareClick={()=>{handleClick(2)}}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]}  onSquareClick={()=>{handleClick(3)}}/>
        <Square value={squares[4]}  onSquareClick={()=>{handleClick(4)}}/>
        <Square value={squares[5]}  onSquareClick={()=>{handleClick(5)}}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]}  onSquareClick={()=>{handleClick(6)}}/>
        <Square value={squares[7]}  onSquareClick={()=>{handleClick(7)}}/>
        <Square value={squares[8]}  onSquareClick={()=>{handleClick(8)}}/>
      </div>
    </>
  );
}

export default function Game(){
  // States of Games
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  console.log(history);

  const currentSquares = history[currentMove];
  // creates empty array that is filled by X or 0 depending on player moves
  // this will be passed to nextSquares inside the Board by a shallow copy of squares which represents the player moves
  // for example if we press middle left then index is 3, nextSquares = [null, null, null, X or O, null...]

  const xIsNext = currentMove % 2 === 0; 
  // play x if true or O if false by counting the currentMove number

  function handlePlay(nextSquares)
    {
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      console.log("Next History Length: " , nextHistory.length);
      setCurrentMove(nextHistory.length - 1);
      console.log("Current Move: ", currentMove);
     
    }

    function jumpTo(nextMove){
      debugger;
      setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
      let description;
      if (move > 0){
        description = "Go To #" + move;
      }else{
        description = "Go To Game Start";
      }
      return(
        // React Keys
        <li key={move}>
          <button onClick={() => jumpTo(move)}> {description} </button> 
        </li>
      );
    });

  return(
    <>
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
    </>
  )
  }

function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++){
      const [a, b, c] = lines[i];
    // console.log(`A=${a},B=${b},C=${c}`);
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a];
      }
    } return null;
}

