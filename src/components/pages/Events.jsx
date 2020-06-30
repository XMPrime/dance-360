import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getEventsData, setSelectedEvent } from '../../redux/eventsReducer';
import Header from '../generic/Header';

export default function Events() {
  const [history, dispatch] = [useHistory(), useDispatch()];
  const eventsData = useSelector((state) => state.events.eventsData);

  useEffect(() => {
    dispatch(getEventsData());
  }, [dispatch]);

  function selectEvent(event) {
    dispatch(setSelectedEvent(event));
    history.push('/tour-dates');
  }

  function handleKeyPress(e, event) {
    if (e.key === 'Enter') {
      selectEvent(event);
    }
  }

  return (
    <div className="generic-page">
      <Header title="CHOOSE YOUR EVENT:" />
      <div className="events-container">
        {eventsData.map((event, i) => (
          <div
            key={event.id}
            className="grid-item"
            event_id={event.id}
            season_id={event.current_season_id}
            onClick={() => selectEvent(event)}
            onKeyDown={(e) => handleKeyPress(e, event)}
            role="link"
            tabIndex={i}
          >
            <img
              src={`https://assets.dance360.com/coda/${event.id}.svg`}
              className="grid-group-logo"
              alt={event.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
