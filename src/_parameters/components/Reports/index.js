import React from 'react'
import ConfigReport from './ConfigReport'

const Reports = () => {
  const columns = [
    {
      name: 'Reporte 1',
      id: 1,
    }
  ]
  return (
    <div>
      <ConfigReport columns={columns}></ConfigReport>
    </div>
  )
}

export default Reports;
