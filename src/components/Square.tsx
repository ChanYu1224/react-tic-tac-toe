import React, { useState } from "react";


type SquareInput = {
    value?: string,
    onSquareClick: () => void;
};


export default function Square({ value, onSquareClick }: SquareInput) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}