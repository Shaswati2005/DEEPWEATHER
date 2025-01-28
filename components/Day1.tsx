import React from 'react'
import Image from 'next/image';
interface Day1Props{
    day:string;
    temperature:number;
    windSpeed:number;
    humidity:number;

    


}


const Day1:React.FC<Day1Props> = (props) => {
  return (
    <div className='flex flex-col gap-5 w-[150px] h-full justify-between border  hover:bg-blue-700 border-white hover:scale-105 transition-all rounded-xl p-2'>
        <div className='text-sm font-extralight flex items-start'>
            {props.day}
        </div>
        <div className='flex flex-col items-center gap-3 '>

        <div className='flex items-center text-3xl font-semibold text-white '>
            
            {props.temperature}
        </div>
        <div className='flex flex-row w-full justify-evenly px-2'>
            <div className='flex flex-row gap-1'>
            <Image src={'/wind.svg'} alt='temp' width={30} height={30}/>
                {props.windSpeed}
            </div>
            <div className='flex flex-row gap-1'>
            <Image src={'/humidity.svg'} alt='temp' width={30} height={30}/>
                {props.humidity}
            </div>
        </div>
        </div>
                                                                                                                                                                                                                                    
    </div>
  )
}

export default Day1