import React, { useState } from "react";

import Board from "./Board";


export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [positionHistory, setPositionHistory] = useState([null]);
    const [currentMove, setCurrentMove] = useState(0);
    const [isSortAscending, setIsSortAscending] = useState(false);

    const currentSquares: Array<string | null> = history[currentMove];
    const xIsNext = currentMove % 2 == 0;

    function handlePlay(nextSquares: Array<string | null>, nextPosition: number) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        const nextPositionHistory = [...positionHistory.slice(0, currentMove + 1), nextPosition]
        setHistory(nextHistory);
        setPositionHistory(nextPositionHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function calcSortButtonMessage() {
        return isSortAscending ? "Sort to Descend" : " Sort to Ascend";
    }

    function handleSortButton() {
        setIsSortAscending(!isSortAscending);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    // 過去の手の一覧
    const moves = history.map((squares, move) => {
        let description: string;

        const row: number = Math.floor(positionHistory[move] / 3) + 1;
        const col: number = positionHistory[move] % 3 + 1;

        if (move === currentMove) {
            description = `You are at move #${move}`;
        } else if (move > 0) {
            description = `Go to move #${move} (${row}, ${col})`;
        } else {
            description = "Go to game start";
        }

        if (move === currentMove) {
            return (
                <li key={move}>
                    <p>{description}</p>
                </li>
            )
        } else {
            return (
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>{description}</button>
                </li>
            );
        }
    });

    // 昇順と降順の制御
    let movesList;
    if (isSortAscending) {
        movesList = (
            <ol reversed>{moves.reverse()}</ol>
        );
    } else {
        movesList = (
            <ol>{moves}</ol>
        )
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <button onClick={handleSortButton}>{calcSortButtonMessage()}</button>
                {movesList}
            </div>
        </div>
    );
}