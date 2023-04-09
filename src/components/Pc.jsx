import React, { useEffect, useState } from "react";
import Board from "./Board";
import "../pc.css";

export default function Pc() {
    const [values, setValues] = useState(Array(9).fill(null));
    const [win, setwin] = useState(null);
    const matrix = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    useEffect(() => {
        const compTurn =
            values.filter((val) => val !== null).length % 2 === 1;
        const matrixThatAre = (a, b, c) => {
            return matrix.filter((valIndexes) => {
                const valValues = valIndexes.map((index) => values[index]);
                return (
                    JSON.stringify([a, b, c].sort()) === JSON.stringify(valValues.sort())
                );
            });
        };
        const emptyIndexes = values
            .map((val, index) => (val === null ? index : null))
            .filter((val) => val !== null);
        const playerWon = matrixThatAre("x", "x", "x").length > 0;
        const computerWon = matrixThatAre("o", "o", "o").length > 0;
        if (playerWon) {
            setwin("x");
        }
        if (computerWon) {
            setwin("o");
        }
        const putComputerAt = (index) => {
            let newvalues = values;
            newvalues[index] = "o";
            setValues([...newvalues]);
        };
        if (compTurn) {
            const winingmatrix = matrixThatAre("o", "o", null);
            if (winingmatrix.length > 0) {
                const winIndex = winingmatrix[0].filter(
                    (index) => values[index] === null
                )[0];
                putComputerAt(winIndex);
                return;
            }

            const matrixToBlock = matrixThatAre("x", "x", null);
            if (matrixToBlock.length > 0) {
                const blockIndex = matrixToBlock[0].filter(
                    (index) => values[index] === null
                )[0];
                putComputerAt(blockIndex);
                return;
            }

            const matrixToContinue = matrixThatAre("o", null, null);
            if (matrixToContinue.length > 0) {
                putComputerAt(
                    matrixToContinue[0].filter((index) => values[index] === null)[0]
                );
                return;
            }

            const randomIndex =
                emptyIndexes[Math.ceil(Math.random() * emptyIndexes.length)];
            putComputerAt(randomIndex);
        }
    }, [values]);

    function handleComputerMove(index) {
        const isPlayerTurn =
            values.filter((val) => val !== null).length % 2 === 0;
        if (isPlayerTurn) {
            let newvalues = values;
            newvalues[index] = "x";
            setValues([...newvalues]);
        }
    }
    const newGame = () => {
        setValues(Array(9).fill(null));
        setwin(null);
    };
    return (
        <div>
            <Board squares={values} onClick={handleComputerMove} />

            {win ? (
                <>
                    <h3>{win} is the win </h3>
                    <button className="btn" onClick={newGame}>
                        New Game{" "}
                    </button>
                </>
            ) : (
                <>
                    <h3>Draw</h3>
                    <button className="btn" onClick={newGame}>
                        {" "}
                        New Game{" "}
                    </button>
                </>
            )}
        </div>
    );
}
