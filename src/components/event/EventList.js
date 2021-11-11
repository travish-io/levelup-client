import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getEvents } from "./EventManager";

export const EventList = (props) => {
  const [events, setEvents] = useState([]);
  const history = useHistory();
  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

  return (
    <article className="games">
      <button
        className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          history.push("/events/new");
        }}
      >
        Register New Event
      </button>

      {events.map((game) => {
        return (
          <section key={`game--${game.id}`} className="game">
            <div className="game__title">
              {game.description} by {game.organizer.bio} @ {game.date}{" "}
              {game.time}
            </div>
            <div className="game__title">
              {game.game.title} by {game.game.maker}
            </div>
            <div className="game__players">
              {game.game.number_of_players} players needed
            </div>
            <div className="game__skillLevel">
              Skill level is {game.game.skill_level}
            </div>
          </section>
        );
      })}
    </article>
  );
};
