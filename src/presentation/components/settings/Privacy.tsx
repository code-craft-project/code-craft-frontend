import { Icon } from '@iconify/react/dist/iconify.js'

function Privacy() {

  return (
    <div className="flex flex-col gap-8 py-5 md:px-20 w-full md:w-4/5">
      <div>
          <h1 className="font-semibold text-2xl">Change Password</h1>
          <h1 className="font-medium text-sm opacity-75">To change your password, please fill in the fields below. Your password must contain at least 8 characters, it must also include at least one upper case letter, one lower case letter, one number and one special character.</h1>
      </div>
      <div className='w-full gap-3 flex flex-col  items-start'>
        <h1>Current Password</h1>
        <div className="flex mb-5 px-5 border-1.5 x rounded-xl justify-start items-center w-full md:w-96 ">
            <Icon icon="mdi:password"  style={{color: "white"}} />                        
            <input type="text" className=" w-full md:w-5/6 outline-none bg-transparent placeholder:text-white placeholder:opacity-75 px-3 py-2 text-sm" placeholder="Current Password" />
        </div>
      </div>
      <div className='w-full gap-3 flex flex-col items-start'>
        <h1>New Password</h1>
        <div className="flex mb-5 px-5 border-1.5 x rounded-xl justify-start items-center w-full md:w-96">
            <Icon icon="mdi:password"  style={{color: "white"}} />                        
            <input type="text" className=" w-full md:w-5/6 outline-none bg-transparent  placeholder:text-white placeholder:opacity-75 px-3 py-2 text-sm" placeholder="New Password" />
        </div>
      </div>
      <div className='w-full gap-3 flex flex-col items-start'>
        <h1>Confirm Password</h1>
        <div className="flex mb-5 px-5 border-1.5 x rounded-xl justify-start items-center w-full md:w-96 ">
            <Icon icon="mdi:password"  style={{color: "white"}} />                        
            <input type="text" className=" w-full md:w-5/6 outline-none bg-transparent placeholder:text-white placeholder:opacity-75 px-3 py-2 text-sm" placeholder="Confirm Password" />
        </div>
      </div>
      <button className='px-5 py-1 w-full md:w-96 bg-primary-yellow rounded-lg font-semibold active:scale-105 transition-all hover:bg-opacity-85 cursor-pointer'>Confirm</button>
    </div>
  )
}

export default Privacy