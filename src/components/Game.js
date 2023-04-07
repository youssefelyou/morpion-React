import React from "react";
import Board from "board";
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameMode: 'player-vs-player',
        };
    }

    handleNewGameClick() {
        this.setState({
            gameMode: this.state.gameMode,
        });
    }

    handleGameModeChange(event) {
        this.setState({ gameMode: event.target.value });
    }

    render() {
        return (
            <div className="game">
                <div className="game-mode">
                    <label>
                        Game Mode:
                        <select
                            value={this.state.gameMode}
                            onChange={(event) => this.handleGameModeChange(event)}
                        >
                            <option value="player-vs-player">Player vs. Player</option>
                            <option value="player-vs-computer">Player vs. Computer</option>
                        </select>
                    </label>
                </div>
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>
                        <button onClick={() => this.handleNewGameClick()}>New Game</button>
                    </div>
                </div>
            </div>
        );
    }
}