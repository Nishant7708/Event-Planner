import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

export default function Dashboard() {
  const { token } = useAuth();
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/events/readAll");
      setEvents(res.data.events);
    } catch {
      setMessage(" Failed to load events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${token}` } };
    setMessage("");

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/events/update/${editingId}`,
          form,
          config
        );
        setMessage(" Event updated");
      } else {
        await axios.post("http://localhost:5000/events/create", form, config);
        setMessage(" Event created");
      }
      setForm({
        title: "",
        description: "",
        date: "",
        startTime: "",
        endTime: "",
        location: "",
      });
      setEditingId(null);
      fetchEvents();
    } catch (err) {
      setMessage(err.response?.data?.message || " Error occurred");
    }
  };

  const handleEdit = (event) => {
    setForm(event);
    setEditingId(event._id);
    setMessage("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this event?")) return;
    try {
      await axios.delete(`http://localhost:5000/events/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(" Event deleted");
      fetchEvents();
    } catch (err) {
      setMessage(err.response?.data?.message || " Delete failed");
    }
  };

  const fetchRSVPSummary = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/rsvp/summary/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const s = res.data.summary;
      setMessage(
        ` RSVP Summary — Going: ${s.Going}, Maybe: ${s.Maybe}, Declined: ${s.Declined}`
      );
    } catch {
      setMessage(" Failed to fetch RSVP summary");
    }
  };

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>

      <form className="event-form" onSubmit={handleSubmit}>
        <h3>{editingId ? "Edit Event" : "Create Event"}</h3>

        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        <input
          type="time"
          value={form.startTime}
          onChange={(e) => setForm({ ...form, startTime: e.target.value })}
          required
        />
        <input
          type="time"
          value={form.endTime}
          onChange={(e) => setForm({ ...form, endTime: e.target.value })}
          required
        />
        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        />

        <button type="submit">{editingId ? "Update" : "Create"}</button>
      </form>

      {message && (
        <p
          className="message"
          style={{ color: message.startsWith("") ? "green" : "red" }}
        >
          {message}
        </p>
      )}

      <h3>All Events</h3>
      <ul className="event-list">
        {events.map((event) => (
          <li key={event._id} className="event-item">
            <div>
              <strong>{event.title}</strong> — {event.date} @ {event.location}
              <br />
              <small>
                {event.startTime} - {event.endTime}
              </small>
            </div>
            <div className="event-buttons">
              <button onClick={() => handleEdit(event)}> Edit</button>
              <button onClick={() => handleDelete(event._id)}> Delete</button>
              <button onClick={() => fetchRSVPSummary(event._id)}>
                {" "}
                RSVP Summary
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
