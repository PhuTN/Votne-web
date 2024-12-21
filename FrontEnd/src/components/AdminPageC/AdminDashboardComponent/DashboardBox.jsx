import { Statistic } from 'antd'
import React from 'react'
import { DashboardButton, ButtonSpace } from './style'

const DashboardBox = ({ title, value, icon, color }) => {
  return (
    <DashboardButton style={{
        width: '100%', // Đảm bảo chiếm toàn bộ chiều rộng
        backgroundImage: `linear-gradient(to right, ${color[0]}, ${color[1]})`
    }}>
      <ButtonSpace size={50} align='center' style={{ justifyContent: 'space-between' }}>
        <div style={{ textAlign: 'left' }}>
          <Statistic title={title} value={value} valueStyle={{
              color: '#ffffff',
              fontSize: 30,
          }} />
        </div>
        <div style={{ marginLeft: 'auto' }}>
          {icon}
        </div>
      </ButtonSpace>
    </DashboardButton>
  )
}

export default DashboardBox;
