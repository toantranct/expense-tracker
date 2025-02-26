import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface PieChartData {
  name: string;
  value: number;
  color: string;
}

interface PieChartComponentProps {
  data: PieChartData[];
  title: string;
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({ data, title }) => {
  // Filter out any items with zero or invalid values
  const validData = data.filter(item => item.value > 0);
  
  // Calculate the total sum for the percentage
  const total = validData.reduce((sum, item) => sum + item.value, 0);

  // If there's no valid data, show a message
  if (validData.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p className="text-gray-500">Không có dữ liệu để hiển thị</p>
      </div>
    );
  }

  // Custom tooltip to show value and percentage
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / total) * 100).toFixed(1);
      
      return (
        <div className="bg-white p-2 border rounded shadow">
          <p className="font-semibold">{data.name}</p>
          <p>{data.value.toLocaleString()}₫ ({percentage}%)</p>
        </div>
      );
    }
    return null;
  };

  // Format the data labels with percentages
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
    // Don't show labels for very small slices
    if (percent < 0.05) return null;
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Custom Legend that shows the value
  const renderCustomLegend = (props: any) => {
    const { payload } = props;
    
    return (
      <ul className="flex flex-wrap justify-center mt-4">
        {payload.map((entry: any, index: number) => {
          const item = data.find(d => d.name === entry.value);
          const percentage = item ? ((item.value / total) * 100).toFixed(1) : '0';
          
          return (
            <li key={`item-${index}`} className="flex items-center mx-2 mb-2">
              <div 
                className="w-3 h-3 mr-1" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs">
                {entry.value}: {percentage}%
              </span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="h-full w-full">
      <h3 className="text-sm text-center text-gray-500 mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={validData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius="80%"
            fill="#8884d8"
            dataKey="value"
            isAnimationActive={true}
          >
            {validData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || `#${Math.floor(Math.random()*16777215).toString(16)}`} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            content={renderCustomLegend}
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;