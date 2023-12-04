import React from "react";
import { Chart } from "react-google-charts";



export const LineChart = ({chartData}) => {
  const options  = {
    title:"Employees Count Per Month"
  }
  return (
    
    <Chart
      chartType="Line"
      width="100%"
      height="400px"
      data={chartData}
      options={options}
    />
  );
}
