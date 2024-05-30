import React, { useState } from "react";


type SquareInput = {
    value?: string,
    onSquareClick: () => void;
    isHighlighted?: boolean,
};


export default function Square({ value, onSquareClick, isHighlighted }: SquareInput) {
    return (
        <button className={isHighlighted? "square square-highlight" : "square"} onClick={onSquareClick}>
            {value}
        </button>
    );
}