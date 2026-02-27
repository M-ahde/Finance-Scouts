const StatCard = ({ title, value, icon, color }) => {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "12px",
        padding: "20px",
        flex: "1",
        minWidth: "220px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
        transition: "0.3s",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <p style={{ color: "#64748b", fontSize: "14px" }}>{title}</p>
          <h2 style={{ margin: "10px 0" }}>{value}</h2>
        </div>

        <div
          style={{
            background: color,
            color: "#fff",
            padding: "14px",
            borderRadius: "10px",
            margin: "12px 12px"
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
