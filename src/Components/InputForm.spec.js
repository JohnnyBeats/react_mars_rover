import {fireEvent, render} from "@testing-library/react";
import React from "react";
import InputForm from "./InputForm";

describe("Input Form Validation", () => {
    const setup = () => {
        const setAppDataMock = jest.fn();
        const utils = render(<InputForm setAppData={setAppDataMock}/>);
        const startButton = utils.getByTestId('startButton');
        const commandsInput = utils.getByTestId('commandsInput');

        return {
            startButton,
            commandsInput,
            setAppDataMock,
            ...utils,
        }
    };

    beforeEach(() => {
        window.alert = jest.fn();
        window.alert.mockClear();
    });

    it('requires input', async () => {
        const {startButton, setAppDataMock} = setup();

        fireEvent.click(startButton);
        //if the callback is fired it means that validation failed to block input
        expect(setAppDataMock).toHaveBeenCalledTimes(0);
    });

    it('requires a grid size', async () => {
        const {commandsInput, startButton} = setup();

        fireEvent.change(commandsInput, {
            target: {
                value: ('')
            }
        });

        fireEvent.click(startButton);
        expect(window.alert).toBeCalledWith("Validation Failed: You need to specify the grid size.");
    });

    it('requires at least one rover', async () => {
        const {commandsInput, startButton} = setup();

        fireEvent.change(commandsInput, {
            target: {
                value: ('5 5')
            }
        });

        fireEvent.click(startButton);
        expect(window.alert).toBeCalledWith("Validation Failed: You need to have at least one rover.");
    });

    it('requires rover commands that are in [L,R,M]', async () => {
        const {commandsInput, startButton} = setup();

        fireEvent.change(commandsInput, {
            target: {
                value: ('5 5\n1 2 N\nABC\n')
            }
        });

        fireEvent.click(startButton);
        expect(window.alert).toBeCalledWith("Validation Failed: Looks like some commands are not in [L,R,M].");
    });

    it('requires rover position in format # # [N,E,S,W]', async () => {
        const {commandsInput, startButton} = setup();

        fireEvent.change(commandsInput, {
            target: {
                value: ('5 5\n1 2 N\nLMLMLMLMM\n3 3\nMMRMMRMRRM\n')
            }
        });

        fireEvent.click(startButton);
        expect(window.alert).toBeCalledWith("Validation Failed: Some of your rover positions are not correct. Please check that you have this format # # [N,E,S,W] and that all numbers are positive.");
    });

    it('requires rover coordinates to be a positive number', async () => {
        const {commandsInput, startButton} = setup();

        fireEvent.change(commandsInput, {
            target: {
                value: ('5 5\n1 -2 N\nLMLMLMLMM\n3 -3E\nMMRMMRMRRM\n')
            }
        });

        fireEvent.click(startButton);
        expect(window.alert).toBeCalledWith("Validation Failed: Some of your rover positions are not correct. Please check that you have this format # # [N,E,S,W] and that all numbers are positive.");
    });

    it('requires rover positions to be unique', async () => {
        const {commandsInput, startButton} = setup();

        fireEvent.change(commandsInput, {
            target: {
                value: ('5 5\n1 2 N\nLMLMLMLMM\n1 2 N\nLMLMLMLMM')
            }
        });

        fireEvent.click(startButton);
        expect(window.alert).toBeCalledWith("Validation Failed: You can't have two rovers on the same position.");
    });
});