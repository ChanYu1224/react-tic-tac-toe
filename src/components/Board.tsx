import React, { ReactNode, useState } from "react";

import Square from "./Square";



function calculateWinner(squares): {
    winner: string | null,
    line: Array<number> | null,
} {
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

    // 勝敗判定
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                winner: squares[a],
                line: lines[i],
            };
        }
    }

    // 勝負が確定しなければnullを返す
    return {
        winner: null,
        line: null,
    };
}


type BoardProps = {
    xIsNext: boolean,
    squares: Array<string | null>,
    onPlay: (nextSquares: Array<string>, position: number) => void,
};

export default function Board({xIsNext, squares, onPlay}: BoardProps) {
    function handleClick(i: number) {
        const { winner } = calculateWinner(squares);
        if (squares[i] || winner) return;

        const nextSquares = squares.slice();
        if(xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }

        onPlay(nextSquares, i);
    };

    const { winner, line } = calculateWinner(squares);
    // winnerの反映
    let statusMessage;
    if (winner) {
        statusMessage = "Winner: "+ winner;

    } else {
        statusMessage = "NextPlayer: " + (xIsNext ? "X" : "O")
    }

    // highlightマップ
    const isHighlighted = Array(9).fill(false);
    if (line) {
        for( const index of line ) {
            isHighlighted[index] = true;
        }
    }
    
    // boardの動的生成
    const boardElement = Array(3).fill(Array(3).fill(0)).map((row: Array<number>, rowIndex: number) => {
        const rowElement = row.map((col: number, colIndex: number): ReactNode => {
            const index = rowIndex * 3 + colIndex;
            return <Square
                key={index}
                value={squares[index]}
                onSquareClick={() => handleClick(index)}
                isHighlighted={isHighlighted[index]}
            />;
        })
        return <div key={rowIndex} className="board-row">{rowElement}</div>;
    })

    return (
        <>
            <div className="status">{statusMessage}</div>
            {boardElement}
        </>
    )
}

