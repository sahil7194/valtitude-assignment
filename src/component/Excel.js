import React, { useState } from 'react'
import * as XLSX from 'xlsx';
import { LineChart } from './LineChart';

export const Excel =() => {
    const [chartData,setChartData] = useState([]);

   const onFileChanged = (e) => {
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);
        
        reader.onload = (e) =>{
            const data = e.target.result;
            const workbook = XLSX.read(data,{type:"binary"});
            const sheet1 = workbook.Sheets['Salary_Table'];
            const sheet2 = workbook.Sheets['Transaction Table'];
            const parsedData1 = XLSX.utils.sheet_to_json(sheet1);
            const parsedData2 = XLSX.utils.sheet_to_json(sheet2);

            const updatedData = updateMonthYear(parsedData2);
            const roles = parsedData1.map(item => item.Role);

            roles.unshift("Roles");

            const data2 = (transformDataForLineGraph(updatedData));

            const transformedArray = Object.entries(data2).map(([key, value]) => {
              const arr1 = [];
                arr1.push(key);
                value.map((item)=>{
                  arr1.push(item);
                  return item;
                });
                return arr1;
            });
              transformedArray.unshift(roles);

            setChartData((transformedArray));
        }
    }

    const transformDataForLineGraph = (data) => {
      const transformedData = {};
      data.forEach(item => {
        const { Existing_Count, 'Month-Year': monthYear } = item;
        if (!transformedData[monthYear]) {
          transformedData[monthYear] = [];
        }
        transformedData[monthYear].push(Existing_Count);
      });
      
      return transformedData;
    };

    const updateMonthYear = (data) => {
        return data.map(entry => {
          entry['Month-Year'] = excelSerialToDate(entry['Month-Year'] );
          return entry;
        });
      };
      
    const excelSerialToDate = (serial) =>{

        const MS_PER_DAY = 24 * 60 * 60 * 1000;
        const EPOCH_OFFSET = 25569; 

        const unixMilliseconds = (serial - EPOCH_OFFSET) * MS_PER_DAY;
        const utcDate = new Date(unixMilliseconds);

        const year = utcDate.getFullYear();
        const month = String(utcDate.getMonth() + 1).padStart(2, '0');
        const day = String(utcDate.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-lg text-center">
    <h1 className="text-2xl font-bold sm:text-3xl">Export Excel Data to Line Chart</h1>
  </div>

    <div className="mx-auto mb-0 mt-8 max-w-md space-y-4">
      <div className="relative">
        <input
          type="file"
          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
          placeholder="Enter email"
          onChange={(e) => { onFileChanged(e)}}
        />
      </div>
    </div>
    <div>
    { chartData.length === 0 ? 'Upload file to view chart' : 
         <LineChart chartData={chartData}/>
       }
    </div>
</div>
  )
}
