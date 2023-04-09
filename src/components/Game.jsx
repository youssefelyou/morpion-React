import React, { useState } from "react";
import Board from "./Board";
import "../game.css";
import ComputerPlayer from "./Pc";

export default function Game(props) {
    const [turn, setTurn] = useState("x");
    const [values, setValues] = useState(Array(9).fill(""));
    const [win, setWin] = useState();
    const [gameMode, setGameMode] = useState(null);
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
    const checkwinner = (square) => {
        for (let i in matrix) {
            const [a, b, c] = matrix[i];
            if (square[a] && square[a] === square[b] && square[a] === square[c]) {
                setWin(square[a]);
                return square[a];
            }
        }
        return null;
    };

    function onClick(x) {
        // alert('click '+ x)
        if (values[x] !== "") {
            alert("!!!");
            return;
        }
        let square = [...values];
        if (turn === "x") {
            square[x] = "x";
            setTurn("o");
        } else {
            square[x] = "o";
            setTurn("x");
        }
        // console.log(square)
        checkwinner(square);
        setValues(square);
    }

    const newGame = () => {
        setValues(Array(9).fill(""));
        setWin(null);
    };

    return (
        <div>
            <div className="game-info">
                {gameMode ? (
                    gameMode === "play-vs-computer" ? (
                        <div>
                            <ComputerPlayer />
                            You play against PC
                        </div>
                    ) : (
                        <div>
                            <Board squares={values} onClick={onClick} />
                            You play against a friend
                            {win ? (
                                <>
                                    <h3> {win} won the game </h3>
                                    <button className="btn" onClick={newGame}>
                                        New Game{" "}
                                    </button>
                                </>
                            ) : (
                                win === null && (
                                    <>
                                        <h3>Draw</h3>
                                        <button className="btn" onClick={newGame}>
                                            {" "}
                                            New Game{" "}
                                        </button>
                                    </>
                                )
                            )}
                        </div>
                    )
                ) : (
                    <div className="me">
                        <button className="btn"  onClick={() => setGameMode("play-vs-computer")}>
                            Play Vs Pc

                        </button>
                        <br/><br/><br/><br/>
                        <button  className="btn" onClick={() => setGameMode("play-vs-friend")}>
                            Play vs Friend
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
