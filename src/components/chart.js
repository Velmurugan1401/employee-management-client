import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const PieChartComponent = React.memo(function PieChartComponent({ datas }) {
  var data = [
    { name: "Sick Leave", value: datas['totalsickLeave'] ? datas['totalsickLeave'] : 0 },
    { name: "Casual Leave", value: datas['totalCasualLeave'] ? datas['totalCasualLeave'] : 0 },
    { name: "Earned Leave", value: datas['totalEarnedLeave'] ? datas['totalEarnedLeave'] : 0 },
  ];
  // Colors for each slice
  const COLORS = ["#4472C4", "#ED7D31", "#f8d210"];

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Leaves</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend payload={
          data.map(
            (item, index) => ({
              id: item.name,
              type: "square",
              value: <span className="charttext">{item.name}</span>,
              color: COLORS[index % COLORS.length]
            })
          )
        } layout="horizontal" align="center" verticalAlign="bottom" />
        <Tooltip />
      </PieChart>
    </div>
  );
});

export default PieChartComponent;