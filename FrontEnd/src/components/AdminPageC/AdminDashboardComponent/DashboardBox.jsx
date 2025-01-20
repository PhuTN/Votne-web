import { Statistic } from 'antd'
import React from 'react'
import { DashboardButton, ButtonSpace } from './style'

const DashboardBox = ({ title, value, icon, color }) => {
  return (
    <DashboardButton style={{
        width: '100%', // Đảm bảo chiếm toàn bộ chiều rộng
        backgroundImage: `linear-gradient(to right, ${color[0]}, ${color[1]})`
    }}>
      <ButtonSpace align='center' style={{  }}>
        <div >
          <Statistic title={title} value={value} valueStyle={{
              color: '#ffffff',
              fontSize: 25,
          }}  />
           {/* <div style={{  }}>
          {icon}
        </div> */}
        </div>
        <div style={{  }}>
          {icon}
        </div>
       
      </ButtonSpace>
    </DashboardButton>
  )
}

export default DashboardBox;
