import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Events.css";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/events/readAll");
        setEvents(res.data.events);
      } catch (err) {
        setError(" Failed to load events. Please try again later.");
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="events-container">
      <h2>Upcoming Events</h2>

      {error && <p className="error-msg">{error}</p>}

      <div className="events-grid">
        {events.map(event => (
          <div className="event-card" key={event._id}>
            <h3>{event.title}</h3>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Time:</strong> {event.startTime} - {event.endTime}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <Link to={`/events/${event._id}`} className="view-link">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
