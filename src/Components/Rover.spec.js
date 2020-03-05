import React from 'react';
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Rover from "./Rover";
import {RoverEngine, RoverTeam} from "../Classes/Rover";
import DirectionEnum from "../Classes/DirectionEnum";

describe('The rover component', ()=> {
    const testData = () => {
        const maxGrid = [5,5];
        const roverTeam = new RoverTeam();

        roverTeam.rovers.push(new RoverEngine([1, 2], "N", "M", maxGrid, roverTeam));

        return {
            rover: roverTeam.rovers[0]
        }
    };

    it('renders the rover with direction north', ()=>{
        const {rover} = testData();
        const {container} = render(
            <Rover engine={rover}/>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('renders the rover with direction south', ()=>{
        const {rover} = testData();
        rover.direction = DirectionEnum.SOUTH;
        const {container} = render(
            <Rover engine={rover}/>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('renders the rover with direction east', ()=>{
        const {rover} = testData();
        rover.direction = DirectionEnum.EAST;
        const {container} = render(
            <Rover engine={rover}/>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('renders the rover with direction west', ()=>{
        const {rover} = testData();
        rover.direction = DirectionEnum.WEST;
        const {container} = render(
            <Rover engine={rover}/>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('renders the rover as active', ()=>{
        const {rover} = testData();
        rover.runNextCommand();
        const {container} = render(
            <Rover engine={rover}/>
        );

        expect(container.firstChild).toMatchSnapshot();
    });
});