const ActivityTable = () => {
  const data = [
    { id: 1, user: "John", action: "Created Project", date: "2026-02-10" },
    { id: 2, user: "Anna", action: "Updated Profile", date: "2026-02-11" },
    { id: 3, user: "Mike", action: "Deleted File", date: "2026-02-12" },
  ];

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
      }}
    >
      <h3 style={{ marginBottom: "20px" }}>Recent Activity</h3>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", color: "#64748b" }}>
            <th>User</th>
            <th>Action</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} style={{ borderTop: "1px solid #e2e8f0" }}>
              <td style={{ padding: "10px 0" }}>{item.user}</td>
              <td>{item.action}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTable;
