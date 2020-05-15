import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getEventsData, setSelectedEvent } from '../redux/eventsReducer';
import Header from './Header';

export default function EventPage() {
  const history = useHistory();
  const eventsData = useSelector((state) => state.events.eventsData);
  const dispatch = useDispatch();

  function handleKeyPress(e, event) {
    if (e.key === 'Enter') {
      dispatch(setSelectedEvent(event));
      history.push('/tour-dates');
    }
  }

  function handleClick(event) {
    dispatch(setSelectedEvent(event));
    history.push('/tour-dates');
  }

  useEffect(() => {
    dispatch(getEventsData());
  }, [dispatch]);

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
            onClick={() => handleClick(event)}
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
