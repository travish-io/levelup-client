import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createGame, getGameTypes } from "./GameManager.js";

export const GameForm = () => {
  const [gameTypes, setGameTypes] = useState([]);

  /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
  const [currentGame, setCurrentGame] = useState({
    skillLevel: 1,
    numberOfPlayers: 0,
    title: "",
    maker: "",
    gameTypeId: 0,
  });
  const history = useHistory();

  useEffect(() => {
    getGameTypes().then((data) => setGameTypes(data));
  }, []);

  const changeGameState = (event) => {
    const newGameState = { ...currentGame };
    newGameState[event.target.name] = event.target.value;
    setCurrentGame(newGameState);
  };

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Register New Game</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="form-control"
            value={currentGame.title}
            onChange={changeGameState}
          />
        </div>

        <div className="form-group">
          <label htmlFor="numberOfPlayers">Number Of Players </label>
          <input
            type="text"
            name="numberOfPlayers"
            required
            className="form-control"
            value={currentGame.numberOfPlayers}
            onChange={changeGameState}
          />
        </div>

        <div className="form-group">
          <label htmlFor="skillLevel">Skill Level </label>
          <input
            type="text"
            name="skillLevel"
            required
            className="form-control"
            value={currentGame.skillLevel}
            onChange={changeGameState}
          />
        </div>

        <div className="form-group">
          <label htmlFor="maker">Maker </label>
          <input
            type="text"
            name="maker"
            required
            className="form-control"
            value={currentGame.maker}
            onChange={changeGameState}
          />
        </div>

        <div className="form-group">
          <label htmlFor="gameTypes">Game Type </label>
          <select onChange={changeGameState} name="gameTypeId">
            {gameTypes.map((types) => {
              return <option value={types.id}>{types.label}</option>;
            })}
          </select>
        </div>
      </fieldset>

      <button
        type="submit"
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault();

          const game = {
            maker: currentGame.maker,
            title: currentGame.title,
            numberOfPlayers: parseInt(currentGame.numberOfPlayers),
            skillLevel: parseInt(currentGame.skillLevel),
            gameTypeId: parseInt(currentGame.gameTypeId),
          };

          // Send POST request to your API
          createGame(game).then(() => history.push("/games"));
        }}
        className="btn btn-primary"
      >
        Create
      </button>
    </form>
  );
};
