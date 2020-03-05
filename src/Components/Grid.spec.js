import React from 'react';
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Grid from './Grid';
import {RoverEngine, RoverTeam} from "../Classes/Rover.js";

describe('The grid component', ()=> {
    const testData = () => {
        const maxGrid = [5,5];

        return {
            maxGrid
        }
    };

    it('renders 5 rows and 5 columns without regression', ()=>{
        const {maxGrid} = testData();
        const roverTeam = new RoverTeam();
        const {container} = render(
            <Grid showCover="false" roverTeam={roverTeam} gridSize={maxGrid}/>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('displays a rover on 1 2 N', ()=>{
        const {maxGrid} = testData();
        const roverTeam = new RoverTeam();
        roverTeam.rovers.push(new RoverEngine([1, 2], "N", "M", maxGrid, roverTeam));

        const {container} = render(
            <Grid showCover="false" roverTeam={roverTeam} gridSize={maxGrid}/>
        );

        expect(container.firstChild).toMatchSnapshot();
    });
});