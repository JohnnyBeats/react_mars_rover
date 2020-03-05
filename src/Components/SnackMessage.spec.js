import React from "react";
import SnackMessage from "./SnackMessage";
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Rover from "./Rover";

describe("The SnackMessage component", () => {
    const testData = () => {
        const index = 0;
        const value = "Test the message!";
        const removeMessage = jest.fn();
        const {container, getByTestId} = render( <SnackMessage key={"message-" + index} index={index} text={value} onClose={removeMessage}/>);

        return {
            container,
            removeMessage,
            getByTestId
        }
    };

    it('renders', ()=>{
        const {container} = testData();
        expect(container.firstChild).toMatchSnapshot();
    });

    it('displays the correct message', ()=>{
        const {getByTestId} = testData();
        const messageText = getByTestId('messageText');

        expect(messageText.innerHTML).toBe("Test the message!");
    });

    it('calls the close snack method once on click', ()=>{
        const {getByTestId, removeMessage} = testData();
        const closeButton = getByTestId('closeButton');

        fireEvent.click(closeButton);

        expect(removeMessage).toBeCalledTimes(1);
    });

});