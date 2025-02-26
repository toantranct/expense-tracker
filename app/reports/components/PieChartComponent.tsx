import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FFC658",
  "#FF6E76",
  "#A0522D",
  "#8B008B",
  "#556B2F",
  "#483D8B",
]

export default function PieChartComponent({ data, title }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <text x={200} y={20} textAnchor="middle" dominantBaseline="middle" fontSize={18} fontWeight="bold">
          {title}
        </text>
        <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="amount">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => `${value.toLocaleString()}₫`}
          contentStyle={{ borderRadius: "8px", border: "none" }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

