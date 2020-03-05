import React from 'react';
import './App.css';
import Grid from './Components/Grid.js'
import SnackMessage from "./Components/SnackMessage";
import InputForm from "./Components/InputForm";
import {RoverTeam} from "./Classes/Rover";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCover: true,
            roverTeam: new RoverTeam(),
            gridSize: [0,0],
            roverIndex: 0,
            roverActiveInterval: undefined,
            messages: []
        };

        this.setAppData = this.setAppData.bind(this);
        this.addMessage = this.addMessage.bind(this);
        this.resetRovers = this.resetRovers.bind(this);
        this.startRovers = this.startRovers.bind(this);
        this.removeMessage = this.removeMessage.bind(this);
    }

    addMessage = (message) => {
        this.state.messages.push(message);
        this.setState({
            messages: this.state.messages
        });
    };

    removeMessage = (event) => {
        this.state.messages.splice(event, 1);
        this.setState({
            messages:  this.state.messages
        });
    };

    setAppData = (showCover, roverTeam, gridSize) => {
        this.setState({
            showCover: showCover,
            roverTeam: roverTeam,
            gridSize: gridSize
        });

        this.startRovers();
    };

    resetRovers = () => {
        if(this.state.roverActiveInterval !== undefined){
            clearInterval(this.state.roverActiveInterval);
        }

        const roverTeam = new RoverTeam();
        this.setState({
            roverActiveInterval: undefined,
            showCover: true,
            roverTeam: roverTeam,
            gridSize: [0,0],
            roverIndex: 0
        });
    };

    startRovers = () => {
        //Interval here to make rover move visually for each command
        const roverActiveInterval = setInterval(() => {
            this.state.roverTeam.rovers[this.state.roverIndex].runNextCommand();

            //Update rovers here so UI can update
            this.setState({
                roverTeam: this.state.roverTeam
            });

            if(this.state.roverTeam.rovers[this.state.roverIndex].commandsComplete){
                this.addMessage("Rover " + (this.state.roverIndex + 1) + " has stopped on: " + this.state.roverTeam.rovers[this.state.roverIndex].getPosition());
                if(this.state.roverIndex < this.state.roverTeam.rovers.length - 1){
                    this.setState({
                        roverIndex: this.state.roverIndex + 1
                    });
                }else{
                    clearInterval(roverActiveInterval);
                    this.setState({
                        roverActiveInterval: undefined
                    });

                }
            }
        }, 2000);

        this.setState({
            roverActiveInterval: roverActiveInterval
        })
    };

    render() {
        return (
            <div className="App">
                <div data-testid="inputCover" className={this.state.showCover ? "cover": "cover hidden"}>
                    <h1> MARS ROVER </h1>
                    <InputForm setAppData={this.setAppData}/>
                </div>

            {!this.state.showCover &&
                <button className="openForm button" onClick={this.resetRovers}>
                    Edit Commands
                </button>
            }
                <Grid showCover={this.state.showCover} roverTeam={this.state.roverTeam} gridSize={this.state.gridSize}/>
                <div className="messageContainer">
                    {this.state.messages.map((value, index) => {
                        return <SnackMessage key={"message-" + index} index={index} text={value} onClose={this.removeMessage}/>
                    })}
                </div>
            </div>
        )
    }
}

export default App;
