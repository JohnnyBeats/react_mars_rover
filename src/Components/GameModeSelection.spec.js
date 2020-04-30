import React from 'react';
import {fireEvent, render} from "@testing-library/react";
import GameModeSelection from "./GameModeSelection";

describe('The GameModeSelection component', ()=> {
    const setup = () => {
        const setGameModeMock = jest.fn();
        const utils = render(<GameModeSelection setGameMode={setGameModeMock}/>);
        const MultiplayerButton = utils.getByTestId('Multiplayer');
        const SinglePlayerButton = utils.getByTestId('SinglePlayer');

        return {
            MultiplayerButton,
            SinglePlayerButton,
            setGameModeMock,
            ...utils,
        }
    };

    it('renders two mode buttons without regression', ()=>{
        const {container} = setup();

        expect(container.firstChild).toMatchSnapshot();
    });

    it('calls setGameMode once on multiplayer click with value Multiplayer', ()=>{
        const {MultiplayerButton, setGameModeMock} = setup();

        fireEvent.click(MultiplayerButton);

        expect(setGameModeMock).toHaveBeenCalledTimes(1);

        expect(setGameModeMock).toHaveBeenCalledWith("Multiplayer");
    });

    it('calls setGameMode once on single player click with value SinglePlayer', ()=>{
        const {SinglePlayerButton, setGameModeMock} = setup();

        fireEvent.click(SinglePlayerButton);

        expect(setGameModeMock).toHaveBeenCalledTimes(1);
        expect(setGameModeMock).toHaveBeenCalledWith("SinglePlayer");
    });
});