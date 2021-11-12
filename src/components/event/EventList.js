import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getEvents, joinEvent, leaveEvent } from "./EventManager";

export const EventList = (props) => {
  const [events, setEvents] = useState([]);
  const history = useHistory();

  const eventFetcher = () => {
    getEvents().then((data) => setEvents(data));
  };

  useEffect(() => {
    eventFetcher();
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

      {events.map((event) => {
        return (
          <section key={event.id} className="registration">
            <div className="registration__game">{event.game.title}</div>
            <div>{event.description}</div>
            <div>
              {event.date} @ {event.time}
            </div>
            {event.joined ? (
              <button
                className="btn btn-3"
                onClick={() => leaveEvent(event.id).then(() => eventFetcher())}
              >
                Leave
              </button>
            ) : (
              <button
                className="btn btn-2"
                onClick={() => joinEvent(event.id).then(() => eventFetcher())}
              >
                Join
              </button>
            )}
          </section>
        );
      })}
    </article>
  );
};
