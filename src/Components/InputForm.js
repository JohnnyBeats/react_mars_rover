import React from "react";
import DirectionEnum from "../Classes/DirectionEnum";
import CommandEnum from "../Classes/CommandEnum";
import {RoverEngine, RoverTeam} from "../Classes/Rover.js";

class InputForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            valid: false,
            maxGrid: [],
            roverTeam: undefined
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.setAppData = this.setAppData.bind(this);
        this.validate = this.validate.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    validate(input, callBack){
        const inputParts = input.trim().split('\n');
        const roverTeam = new RoverTeam();
        let valid;
        let roverCount = 0;

        const testCoordinateArray = (testArray) => {
            return (testArray.length === 2 &&
                typeof testArray[0] === "number" && !Number.isNaN(testArray[0]) && testArray[0] >= 0  &&
                typeof testArray[1] === "number" && !Number.isNaN(testArray[1]) && testArray[1] >= 0);
        };

        //First input should be grid size
        const maxGridInput = inputParts[0].trim().split(' ').map(n=>+n);
        valid = testCoordinateArray(maxGridInput);

        if(!valid){
            valid = false;
            alert("Validation Failed: You need to specify the grid size.");
        }

        if(valid){
            if(!(roverCount < inputParts.length - 2)){
                valid = false;
                alert("Validation Failed: You need to have at least one rover.");
            }

            //next we should get collections of rower position and commands
            while(roverCount < inputParts.length - 2 && valid){
                roverCount++;
                //Position
                const position = inputParts[roverCount].trim().split(' ',2).map(n=>+n);
                const direction = inputParts[roverCount].trim().split(' ',3)[2];
                valid = (testCoordinateArray(position) &&
                    direction !== undefined && direction.length === 1 &&
                    (direction === DirectionEnum.NORTH || direction === DirectionEnum.EAST || direction === DirectionEnum.SOUTH || direction === DirectionEnum.WEST)
                );

                if(!valid){
                    alert("Validation Failed: Some of your rover positions are not correct. Please check that you have this format # # [N,E,S,W] and that all numbers are positive.");
                    break;
                }

                //Commands
                roverCount++;
                const commands = inputParts[roverCount].replace(/ /g,'');
                const commandsArray = commands.split('');
                const validCommandsArray = commandsArray.filter((command) => {
                    return command === CommandEnum.MOVE || command === CommandEnum.RIGHT || command === CommandEnum.LEFT;
                });

                valid = (commandsArray.length === validCommandsArray.length);

                if(!valid){
                    alert("Validation Failed: Looks like some commands are not in [L,R,M].");
                    break;
                }

                //Check that no rovers start on the same position
                const roversOnSamePosition = roverTeam.rovers.filter((rover) => {
                    return rover.coordinates[0] === position[0] && rover.coordinates[1] === position[1];
                });

                if(roversOnSamePosition.length > 0){
                    valid = false;
                    alert("Validation Failed: You can't have two rovers on the same position.");
                }

                if(valid){
                    roverTeam.rovers.push(
                        new RoverEngine(position, direction, commands, maxGridInput, roverTeam)
                    );
                }
            }
        }

        this.setState({
            maxGrid: maxGridInput,
            roverTeam: roverTeam,
            valid: valid
        }, callBack);
    }

    setAppData(event) {
        const waitForStatePromise = () => {
            if(this.state.valid){
                this.props.setAppData(
                    false,
                    this.state.roverTeam,
                    this.state.maxGrid
                );
            }
        };

        this.validate(this.state.input, waitForStatePromise);
    }

    render() {
        return(
            <form data-testid="inputForm" >
                <textarea placeholder={'5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM\n'} data-testid="commandsInput"  name="input" value={this.state.input} onChange={this.handleInputChange} />
                <br/>
                <input data-testid="startButton"  type="button" value="Start Rovers" onClick={this.setAppData}/>
            </form>
        )
    }
}

export default InputForm;