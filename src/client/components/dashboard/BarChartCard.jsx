import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Mon", sales: 300 },
  { name: "Tue", sales: 500 },
  { name: "Wed", sales: 700 },
  { name: "Thu", sales: 400 },
  { name: "Fri", sales: 900 },
];

const BarChartCard = () => {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
        height: "350px",
      }}
    >
      <h3 style={{ marginBottom: "20px" }}>Weekly Sales</h3>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartCard;
