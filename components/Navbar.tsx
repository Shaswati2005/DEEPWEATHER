import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div>
        <div className='flex flex-row border-white border-y-2 border-x-1 text-white bg-blue-700  h-[50px] border rounded-full shadow-xl hover:cursor-pointer transition-all  items-center justify-between px-2 lg:px-8 mt-3 mx-2 lg:mx-5'>
            <div>
                weather app
            </div>
            <div className=' text-sm lg:text-xl font-thin lg:font-normal flex flex-row items-center justify-between gap-3 lg:gap-[80px]'>
                <Link href={'/'} className='hover:font-bold scale-105 transition-all hover:scale-110'>
                  home
                </Link>
                <Link href={'/map'} className='hover:font-bold scale-105 transition-all hover:scale-110'>
                   map
                </Link>
            </div>

        </div>


    </div>
  )
}

export default Navbar