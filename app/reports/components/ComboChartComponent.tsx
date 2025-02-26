import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface DataItem {
  month: string
  expense: number
  income: number
}

export default function ComboChartComponent({ data, title }: { data: DataItem[]; title: string }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data}>
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
        <Line type="monotone" dataKey="income" name="Thu nhập" stroke="#4caf50" />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

