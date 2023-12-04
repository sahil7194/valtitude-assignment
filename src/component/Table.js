import React from 'react'
import { Table } from 'antd'; 
export const HrsSystem = () => {

    const dataSource = [ 
        { key: '1', username: 'Gourav', age: 10 }, 
        { key: '2', username: 'Kartik', age: 20 }, 
        { key: '3', username: 'Madhu', age: 30 }, 
        { key: '4', username: 'Karu', age: 40 }, 
        { key: '5', username: 'Dinesh', age: 50 }, 
    ]; 

    const columns = [ 
        { 
            title: 'Username', 
            dataIndex: 'username', 
            key: 'username', 
        }, 
        { 
            title: 'Age', 
            dataIndex: 'age', 
            key: 'age', 
        }, 
    ]; 

  return (
    <div style={{ 
        display: 'block', width: 700, padding: 30 
    }}> 
        <h4>ReactJS Ant-Design Table Component</h4> 
        <Table dataSource={dataSource} columns={columns} /> 
    </div> 
  )
}
