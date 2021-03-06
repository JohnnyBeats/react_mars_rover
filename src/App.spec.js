import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe("App", () => {
  window.alert = jest.fn();

  it('renders according to spec with game mode choices available', () => {
    const {container} = render(<App/>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders according to spec with cover and form visible single payer', () => {
    const {container, getByTestId} = render(<App/>);
    const singlePlayerButton = getByTestId('SinglePlayer');

    fireEvent.click(singlePlayerButton);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders according to spec with waiting for players multiplayer', () => {
    const {container, getByTestId} = render(<App/>);
    const multiplayerButton = getByTestId('Multiplayer');

    fireEvent.click(multiplayerButton);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe("Input Form", () => {

    it('Renders with form visible', () => {
      const {getByTestId} = render(<App/>);

      const singlePlayerButton = getByTestId('SinglePlayer');

      fireEvent.click(singlePlayerButton);

      expect(getByTestId("inputForm")).toBeVisible();
    });

    it('loads rover grid with correct input', async () => {
      const {container, getByTestId, getAllByTestId, findByText} = render(<App/>);
      const singlePlayerButton = getByTestId('SinglePlayer');

      fireEvent.click(singlePlayerButton);

      const startButton = getByTestId('startButton');
      const commandsInput = getByTestId('commandsInput');

      fireEvent.change(commandsInput, {
        target: {
          value: ('5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM\n')
        }
      });

      // Click button
      fireEvent.click(startButton);
      window.alert.mockClear();

      // Wait for page to update with query text
      const maxCell = await findByText(/5,5/);
      expect(maxCell).toBeTruthy();

      //Check that we have two rovers
      const rovers = await getAllByTestId("rover");
      expect(rovers).toHaveLength(2);

      expect(container.firstChild).toMatchSnapshot();
    });

  });

});
