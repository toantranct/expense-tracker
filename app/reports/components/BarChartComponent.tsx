import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

export default function BarChartComponent({ data, title }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <text x={200} y={20} textAnchor="middle" dominantBaseline="middle" fontSize={18} fontWeight="bold">
          {title}
        </text>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip
          formatter={(value: number) => `${value.toLocaleString()}₫`}
          contentStyle={{ borderRadius: "8px", border: "none" }}
        />
        <Legend />
        <Bar dataKey="expense" name="Chi tiêu" fill="#f44336" />
        <Bar dataKey="income" name="Thu nhập" fill="#4caf50" />
      </BarChart>
    </ResponsiveContainer>
  )
}

