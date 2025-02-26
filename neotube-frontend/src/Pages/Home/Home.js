import React from 'react'
import SideNavbar from '../../Component/SideNavbar/SideNavbar'
import HomePage from '../../Component/HomePage/HomePage'
import './Home.css'

const Home = ({sidenavbar}) => {
  return (
    <div className='home'>
      <SideNavbar sidenavbar={sidenavbar}/>
      <HomePage sidenavbar={sidenavbar}/>
    </div>
  )
}

export default Home
