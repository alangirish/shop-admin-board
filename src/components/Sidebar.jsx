import React from 'react'
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AllInclusiveOutlinedIcon from '@mui/icons-material/AllInclusiveOutlined';

function Sidebar() {
  return (
    <div className='bg-black h-full px-5 py-6 justify-between flex flex-col'>
      <div className='flex flex-col justify-center items-center space-y-6'>
        <button><img src="logo.png" alt="" className='w-auto h-auto'/></button>
        <button className='text-[#939598]'><BoltOutlinedIcon/></button>
        <button className='text-[#939598]'><PhotoOutlinedIcon/></button>
        <button className='text-[#939598]'><AllInclusiveOutlinedIcon/></button>
        <button><img src="tshirt.svg" alt="" className='w-7 h-7'/></button>
      </div>
      <div className='flex flex-col justify-center items-center space-y-6'>
        <button className='text-[#939598]'><SettingsOutlinedIcon/></button>
        <button className='text-[#939598]'><PaymentOutlinedIcon/></button>
        
      </div> 
    </div>
  )
}

export default Sidebar
