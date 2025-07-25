import React, { useState } from "react";
import styles from "./Board.module.css";
import Square from "../Square/Square";
import { calculateWinner } from "../../utils";

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [wins, setWins] = useState({ X: 0, O: 0 });

  const renderSquare = (i) => {
    return <Square value={squares[i]} onClickFunc={() => handleClick(i)} />;
  };

  const handleClick = (i) => {
    const squaresCopy = squares.slice();
    if (calculateWinner(squaresCopy) || squaresCopy[i]) {
      return;
    }
    squaresCopy[i] = xIsNext ? "X" : "O";
    setSquares(squaresCopy);
    setXIsNext(!xIsNext);
    const winner = calculateWinner(squaresCopy);
    if (winner) {
      setWins((prev) => ({
        ...prev,
        [winner]: prev[winner] + 1,
      }));
    }
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const winner = calculateWinner(squares);
  const isDraw = squares.every((square) => square !== null) && !winner;

  return (
    <>
      <div className={styles.board}>
        <h2 className={styles.title}>Tic Tac Toe</h2>

        <p className={styles.winsCount}>
          Wins : <br /> X - {wins.X} <br /> O - {wins.O}
        </p>

        <button className={styles.restart_button} onClick={handleRestart}>
          Restart
        </button>
        <div className={styles.board_row}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className={styles.board_row}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className={styles.board_row}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <div className={styles.status}>
          {winner
            ? `Winner: ${winner}`
            : isDraw
            ? "It's a draw!"
            : `Next player: ${xIsNext ? "X" : "O"}`}
        </div>
      </div>
    </>
  );
};

export default Board;
