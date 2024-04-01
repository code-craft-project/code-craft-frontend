import { Outlet  } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Root() {
  return (
    <div className='min-h-screen py-5 bg-black'>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Root