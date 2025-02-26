import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface LineChartData {
  month: string
  expense: number
  income: number
}

export default function LineChartComponent({ data, title }: { data: LineChartData[]; title: string }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
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
        <Line type="monotone" dataKey="expense" name="Chi tiêu" stroke="#f44336" />
        <Line type="monotone" dataKey="income" name="Thu nhập" stroke="#4caf50" />
      </LineChart>
    </ResponsiveContainer>
  )
}

