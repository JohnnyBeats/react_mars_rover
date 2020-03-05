import {RoverEngine, RoverTeam} from "./Rover.js";
import DirectionEnum from "./DirectionEnum";

describe("RoverEngine Unit Test", () => {
    const testData = () => {
        const maxGrid = [5,5];
        const engine = new RoverEngine([1, 2], DirectionEnum.NORTH, "LMLMLMLMM", maxGrid);

        return {
            engine,
            maxGrid
        }
    };

    it("retains constructor information", () => {
        const {engine, maxGrid} = testData();

        expect(engine.coordinates[0]).toBe(1);
        expect(engine.coordinates[1]).toBe(2);
        expect(engine.direction).toBe(DirectionEnum.NORTH);
        expect(engine.maxGrid).toBe(maxGrid);
        expect(engine.commands).toBe("LMLMLMLMM");
        expect(engine.commandsComplete).toBe(false);
    });

    it("getPosition functions", () => {
        const {engine} = testData();

        expect(engine.getPosition()).toBe("1 2 N");
    });

    it("positions the rover correctly after all commands", () => {
        const {engine} = testData();

        while(!engine.commandsComplete){
            engine.runNextCommand();
        }

        expect(engine.getPosition()).toBe("1 3 N");
    });

    it("doesn't allow negative index for the rover", () => {
        const {engine} = testData();

        engine.commands = "LLMMMMMMMMMMMMM";

        while(!engine.commandsComplete){
            engine.runNextCommand();
        }

        expect(engine.getPosition()).toBe("1 0 S");
    });

    it("stops on max grid size", () => {
        const {engine} = testData();

        engine.commands = "RMMMMMMMMMMMMMMM";

        while(!engine.commandsComplete){
            engine.runNextCommand();
        }

        expect(engine.getPosition()).toBe("5 2 E");
    });

    it("doesn't collide with other rovers", () => {
        const {engine, maxGrid} = testData();
        const roverTeam = new RoverTeam();
        const engine2 = new RoverEngine([1, 3], DirectionEnum.SOUTH, "MMMM", maxGrid, roverTeam);
        engine.commands = "MMMM";
        engine.roverTeam = roverTeam;

        roverTeam.rovers = [engine, engine2];

        while(!engine.commandsComplete){
            engine.runNextCommand();
        }

        while(!engine2.commandsComplete){
            engine2.runNextCommand();
        }

        expect(engine.getPosition()).toBe("1 2 N");
        expect(engine2.getPosition()).toBe("1 3 S");
    });
});