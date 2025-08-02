import React from 'react'
import Header from '../Components/Header/Header'
import DoctorSidebar from '../Components/Doctor/Sidebar/DoctorSidebar'
import { Outlet } from 'react-router-dom'

const DoctorDashboard = () => {
  return (
   <>
    <div className='flex h-screen overflow-hidden'> {/* Full viewport height */}
      <div className="w-72 shrink-0">
        <DoctorSidebar />
      </div>

      {/* Main Content Area */}
      <div className='flex flex-col flex-1 h-full overflow-hidden'>
        <Header />
        <div className='flex-1 overflow-y-auto p-6'> {/* Scrollable content */}
          <Outlet />
        </div>
      </div>
    </div>
   </>
  )
}

export default DoctorDashboard