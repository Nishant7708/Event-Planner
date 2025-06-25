import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./MyRsvps.css";

export default function MyRsvps() {
  const { token } = useAuth();
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchRsvps = async () => {
      try {
        const res = await axios.get("http://localhost:5000/rsvp/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRsvps(res.data.rsvps);
        setFeedback("");
      } catch {
        setFeedback(" Failed to load RSVP history");
      } finally {
        setLoading(false);
      }
    };

    fetchRsvps();
  }, [token]);

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="rsvp-container">
      <h2>My RSVP History</h2>

      {feedback && <p className="error-msg">{feedback}</p>}

      {rsvps.length === 0 && !feedback ? (
        <p className="no-rsvp">You haven’t RSVPed to any events yet.</p>
      ) : (
        <ul className="rsvp-list">
          {rsvps.map(({ event, status }) => (
            <li key={event._id} className="rsvp-item">
              <div className="rsvp-event">
                <h3>{event.title}</h3>
                <p>{event.date} — {event.location}</p>
              </div>
              <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
