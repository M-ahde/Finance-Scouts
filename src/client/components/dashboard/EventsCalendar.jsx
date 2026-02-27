import { useState } from "react";
import Calendar from "react-calendar";
import '@/client/calendar.css';
import { motion } from "framer-motion";

const EventsCalendar = ({ events }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Split events by type
  const eventEvents = events.filter(ev => ev.category === "event");
  const smallEvents = events.filter(ev => ev.category === "workshop");

  // Get events on selected day
  const selectedDayEvents = events.filter(
    ev => new Date(ev.date).toDateString() === selectedDate.toDateString()
  );

  // Tile content for calendar
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayeventEvents = eventEvents.filter(ev =>
        new Date(ev.date).toDateString() === date.toDateString()
      );
      const daySmallEvents = smallEvents.filter(ev =>
        new Date(ev.date).toDateString() === date.toDateString()
      );

      return (
        <div className="flex flex-col items-center mt-1 gap-0.5">
          {/* event events → eventger blocks */}
          {dayeventEvents.map((ev, idx) => (
            <div
              key={`event-${idx}`}
              className="w-full h-3 rounded-md"
              style={{ backgroundColor: ev.color }}
              title={ev.title}
            />
          ))}

          {/* Small events → tiny dots */}
          <div className="flex flex-wrap justify-center gap-0.5">
            {daySmallEvents.map((ev, idx) => (
              <span
                key={`small-${idx}`}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: ev.color }}
                title={ev.title}
              />
            ))}
          </div>
        </div>
      );
    }
  };

  return (
  <div
  style={{
    background: "#ffffff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  }}
>
  <h3
    style={{
      fontSize: "16px",
      fontWeight: "600",
      color: "#334155",
      marginBottom: "10px",
    }}
  >
    Events Calendar
  </h3>

  <div
    style={{
      display: "flex",
      justifyContent: "center",
    }}
  >
    
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileContent={tileContent}
      />
  </div>


  {/* Selected day events */}
  <div style={{ marginTop: "10px" }}>
    <h4
      style={{
        fontSize: "14px",
        fontWeight: "600",
        color: "#475569",
        marginBottom: "10px",
      }}
    >
      Events on {selectedDate.toDateString()}
    </h4>

    {selectedDayEvents.length === 0 && (
      <p style={{ fontSize: "13px", color: "#94a3b8" }}>
        No events today
      </p>
    )}

    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {selectedDayEvents.map((ev, idx) => (
        <motion.div
          key={idx}
          style={{
            padding: "12px",
            borderRadius: "8px",
            background: "#f8fafc",
            borderLeft: `4px solid ${ev.color}`,
            cursor: "pointer",
            transition: "0.3s",
          }}
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: idx * 0.05 }}
        >
          <p
            style={{
              fontWeight: "500",
              color: "#334155",
              marginBottom: "4px",
            }}
          >
            {ev.title}
          </p>

          {ev.time && (
            <p
              style={{
                fontSize: "12px",
                color: "#64748b",
              }}
            >
              {ev.time}
            </p>
          )}

          {ev.category && (
            <span
              style={{
                fontSize: "11px",
                fontWeight: "600",
                padding: "4px 8px",
                borderRadius: "20px",
                marginTop: "6px",
                display: "inline-block",
                background: ev.color,
                color: "#fff",
              }}
            >
              {ev.category === "event" ? "Event" : "Workshop"}
            </span>
          )}
        </motion.div>
      ))}
    </div>
  </div>
</div>

  );
};

export default EventsCalendar;
