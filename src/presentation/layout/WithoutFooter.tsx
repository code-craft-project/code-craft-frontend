import { Outlet  } from 'react-router-dom'
import Navbar from '../components/Navbar'

function WithoutFooter() {
  return (
    <div className='min-h-screen py-5 bg-black'>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default WithoutFooter