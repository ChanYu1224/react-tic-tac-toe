import React, { ReactNode, useState } from "react";

import Square from "./Square";



function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [5, 6, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}


type BoardProps = {
    xIsNext: boolean,
    squares: Array<string | null>,
    onPlay: (nextSquares: Array<string | null>) => void,
};

export default function Board({xIsNext, squares, onPlay}: BoardProps) {
    function handleClick(i: number) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }

        const nextSquares = squares.slice();

        if(xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }

        onPlay(nextSquares);
    };

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: "+ winner;
    } else {
        status = "NextPlayer: " + (xIsNext ? "X" : "O")
    }

    const boardElement = Array(3).fill(Array(3).fill(0)).map((row: Array<number>, rowIndex: number) => {
        const rowElement = row.map((col: number, colIndex: number): ReactNode => {
            const index = rowIndex * 3 + colIndex;
            return (
                <Square value={squares[index]} onSquareClick={() => handleClick(index)} />
            )
        })

        return (
            <div className="board-row">
                {rowElement}
            </div>
        );
    })

    return (
        <>
            <div className="status">{status}</div>
            {boardElement}
        </>
    )
}

