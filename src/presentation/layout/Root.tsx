import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Root() {
  return (
    <div className='w-full flex flex-col items-center min-h-screen py-5 bg-black overflow-auto'>
      <div className='w-11/12 flex flex-col items-center'>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default Root