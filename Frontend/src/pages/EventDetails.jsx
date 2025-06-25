import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./EventDetails.css";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [rsvpStatus, setRsvpStatus] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/events/read/${id}`);
        setEvent(res.data.event);
      } catch {
        setFeedback(" Failed to fetch event");
      }
    };

    const fetchRSVP = async () => {
      try {
        const res = await axios.get("http://localhost:5000/rsvp/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const myRSVP = res.data.rsvps.find((r) => r.event._id === id);
        if (myRSVP) setRsvpStatus(myRSVP.status);
      } catch {
        console.error("RSVP fetch failed");
      }
    };

    Promise.all([fetchEvent(), fetchRSVP()]).then(() => setLoading(false));
  }, [id, token]);

  useEffect(() => {
    if (feedback) {
      const timeout = setTimeout(() => setFeedback(""), 3000);
      return () => clearTimeout(timeout);
    }
  }, [feedback]);

  const handleRSVP = async () => {
    if (!rsvpStatus) return setFeedback(" Please select an RSVP option");

    const today = new Date();
    const eventDate = new Date(event.date);

    if (eventDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
      return setFeedback(" Cannot RSVP to past events.");
    }

    try {
      await axios.post(
        "http://localhost:5000/rsvp",
        {
          eventId: id,
          status: rsvpStatus,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFeedback(" RSVP submitted successfully!");
    } catch (err) {
      setFeedback(err.response?.data?.message || " RSVP failed.");
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (!event) return <p className="error">Event not found</p>;

  return (
    <div className="event-details-container">
      <h2>{event.title}</h2>
      <p>
        <b>Description:</b> {event.description}
      </p>
      <p>
        <b>Date:</b> {event.date}
      </p>
      <p>
        <b>Time:</b> {event.startTime} - {event.endTime}
      </p>
      <p>
        <b>Location:</b> {event.location}
      </p>

      <div className="rsvp-section">
        <h3>RSVP</h3>
        {["Going", "Maybe", "Declined"].map((option) => (
          <label key={option} className="rsvp-option">
            <input
              type="radio"
              value={option}
              checked={rsvpStatus === option}
              onChange={(e) => setRsvpStatus(e.target.value)}
            />{" "}
            {option}
          </label>
        ))}

        <button className="rsvp-button" onClick={handleRSVP}>
          Submit RSVP
        </button>

        {feedback && (
          <p
            className={`feedback ${
              feedback.startsWith("") ? "success" : "error"
            }`}
          >
            {feedback}
          </p>
        )}
      </div>
    </div>
  );
}
