import { Statistic } from 'antd'
import React from 'react'
import { DashboardButton, ButtonSpace } from './style'

const DashboardBox = ({ title, value, icon, color }) => {
  return (
    <DashboardButton style={{
        width: '100%', // Đảm bảo chiếm toàn bộ chiều rộng
        backgroundImage: `linear-gradient(to right, ${color[0]}, ${color[1]})`
    }}>
      <ButtonSpace align='center' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Statistic 
            title={<span style={{ fontWeight: 'bold' }}>{title}</span>} // Làm đậm title
            value={value} 
            valueStyle={{
              color: '#ffffff',
              fontSize: 25,
            }} 
          />
        </div>
        <div style={{ marginLeft: 'auto' }}>
          {icon}
        </div>
      </ButtonSpace>
    </DashboardButton>
  )
}

export default DashboardBox;
