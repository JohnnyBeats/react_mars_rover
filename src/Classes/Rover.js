import DirectionEnum from "./DirectionEnum";
import CommandEnum from "./CommandEnum";

export class RoverEngine{
    constructor(coordinates, direction, commands, maxGrid, roverTeam){
        this.coordinates = coordinates;
        this.direction = direction;
        this.maxGrid = maxGrid;
        this.commands = commands;
        this.roverTeam = roverTeam || new RoverTeam();
        this.commandIndex = -1;
        this.commandsComplete = false;
        this.degreesRotation = 0;
        this.isActive = false;

        switch (direction) {
            case DirectionEnum.NORTH:
                this.degreesRotation = 0;
                break;
            case DirectionEnum.EAST:
                this.degreesRotation = 90;
                break;
            case DirectionEnum.SOUTH:
                this.degreesRotation = 180;
                break;
            case DirectionEnum.WEST:
                this.degreesRotation = 270;
                break;
            default:
                this.degreesRotation = 0;
                break;
        }

    }

    fellowRoverParking = (coordinates) => {
        return (this.roverTeam.getFellowRovers(this).filter(rover =>
            rover.coordinates[0] === coordinates[0] && rover.coordinates[1] === coordinates[1]).length > 0
        );
    };

    // Assumption - Grid numbers will never be negative and can't go over grid max size, if command is to cross grid it will ignore and run next command
    processCommand = (command) => {
        const moveCoordinates = [this.coordinates[0], this.coordinates[1]];

        switch (command) {
            case CommandEnum.MOVE:
                if(this.direction === DirectionEnum.NORTH && this.coordinates[1] < this.maxGrid[1]){
                    moveCoordinates[1] = moveCoordinates[1] + 1;
                }else if(this.direction === DirectionEnum.EAST && moveCoordinates[0] < this.maxGrid[0]){
                    moveCoordinates[0] = moveCoordinates[0] + 1;
                }else if(this.direction === DirectionEnum.SOUTH && moveCoordinates[1] > 0){
                    moveCoordinates[1] = moveCoordinates[1] - 1;
                }else if(this.direction === DirectionEnum.WEST && moveCoordinates[0] > 0){
                    moveCoordinates[0] = moveCoordinates[0] - 1;
                }
                break;
            case CommandEnum.LEFT:
                if(this.direction === DirectionEnum.NORTH){
                    this.direction = DirectionEnum.WEST;
                }else if(this.direction === DirectionEnum.EAST){
                    this.direction = DirectionEnum.NORTH;
                }else if(this.direction === DirectionEnum.SOUTH){
                    this.direction = DirectionEnum.EAST;
                }else if(this.direction === DirectionEnum.WEST){
                    this.direction = DirectionEnum.SOUTH;
                }
                this.degreesRotation = this.degreesRotation - 90;
                break;
            case CommandEnum.RIGHT:
                if(this.direction === DirectionEnum.NORTH){
                    this.direction = DirectionEnum.EAST;
                }else if(this.direction === DirectionEnum.EAST){
                    this.direction = DirectionEnum.SOUTH;
                }else if(this.direction === DirectionEnum.SOUTH){
                    this.direction = DirectionEnum.WEST;
                }else if(this.direction === DirectionEnum.WEST){
                    this.direction = DirectionEnum.NORTH;
                }

                this.degreesRotation = this.degreesRotation + 90;

                break;
            default:
                if(this.commandIndex < this.commands.length){
                    this.runNextCommand();
                }else{
                    this.commandsComplete = true;
                    this.isActive = false;
                }
        }

        if(moveCoordinates[0] !== this.coordinates[0] || moveCoordinates[1] !== this.coordinates[1]){
            //Can't be on the same block with another rover
            if(!this.fellowRoverParking(moveCoordinates)){
                this.coordinates = moveCoordinates;
            }
        }

    };

    runNextCommand = () => {
        if(!this.commandsComplete){
            this.isActive = true;
            this.commandIndex++;
            const command = this.commands[this.commandIndex];
            this.processCommand(command);
        }
    };

    getDirection = () => {
        return this.direction;
    };

    getPosition = () => {
        return this.coordinates[0] + " " +  this.coordinates[1] + " " + this.direction;
    };

    checkPosition = (positionCoordinates) => {
        return this.coordinates[0] === positionCoordinates[0] && this.coordinates[1] === positionCoordinates[1];
    };
}

export class RoverEngineMultiplayer extends RoverEngine{
    constructor(coordinates, direction, commands, maxGrid, roverTeam, id, name){
        super(coordinates, direction, commands, maxGrid, roverTeam);
        this.id = id;
        this.name = name;
    }
}

export class RoverTeam{
    constructor(){
        this.rovers = [];
    }

    getFellowRovers = (rover) => {
       return this.rovers.filter(fellow => rover !== fellow)
    }
}

export default {RoverEngine, RoverEngineMultiplayer, RoverTeam};