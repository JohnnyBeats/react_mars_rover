import React from "react";
import GameModeEnum from "../Classes/GameModeEnum";

class GameModeSelection extends React.Component {
    constructor(props) {
        super(props);
        this.setGameMode = this.setGameMode.bind(this);
    }

    setGameMode(event) {
        this.props.setGameMode(event.target.value);
    }

    render() {
        return(
            <div className="gameModeSelection">
                <button data-testid="Multiplayer" className="gameMode button" value={GameModeEnum.MULTIPLAYER} onClick={this.setGameMode}>
                    Multiplayer
                </button>
                <br/>
                <br/>
                <button data-testid="SinglePlayer" className="gameMode button" value={GameModeEnum.SINGLE_PLAYER} onClick={this.setGameMode}>
                    Single Player
                </button>
            </div>
        )
    }
}

export default GameModeSelection;