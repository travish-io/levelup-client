import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createEvent } from "./EventManager";
import { getGames } from "../game/GameManager";

export const EventForm = () => {
  const history = useHistory();

  const [currentEvent, setEvent] = useState({
    gameId: 0,
    organizerId: parseInt(localStorage.getItem("lu_token")),
    description: "",
    date: "",
    time: "",
  });
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames().then((data) => setGames(data));
  }, []);

  const changeEventState = (event) => {
    const newGameState = { ...currentGame };
    newGameState[event.target.name] = event.target.value;
    setEvent(newGameState);
  };

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Schedule New Event</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="gameId">Game: </label>
          <select
            required
            autoFocus
            name="gameId"
            className="form-control"
            value={currentEvent.gameId}
            onChange={changeEventState}
          >
            <option value="0">Select a game...</option>
            {games.map((game) => (
              <option value={game.id}>{game.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <input
            name="description"
            className="form-control"
            value={currentEvent.description}
            onChange={changeEventState}
            type="text"
            required
          ></input>
        </div>
      </fieldset>

      {/* TODO: Create the rest of the input fields */}

      <button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault();

          // TODO: Call the createEvent function and pass it the event object

          // TODO: Once event is created, redirect user to event list
        }}
        className="btn btn-primary"
      >
        Create Event
      </button>
    </form>
  );
};
