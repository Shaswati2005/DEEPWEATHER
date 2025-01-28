import React from 'react'
import Image from 'next/image';


interface DisplayProps{
    place:string;
    date:string;
    day:string;
    temperature:number;
    windSpeed:number;
    humidity:number;
  

    


}


const Display:React.FC<DisplayProps> = (props) => {
  return (
    <div className='border rounded-xl border-white border-y-4 border-x-2 bg-blue-500 hover:bg-blue-700 hover:cursor-pointer transition-all flex flex-col   gap-10 px-5 py-5 m-3  w-[300px] h-[300px]  lg:h-[400px] lg:w-[400px] '>
        <div  className='flex flex-col items-start  '>
        <div className='text-sm font-thin text-white shadow-lg'>{props.place}</div>
        <div className='text-sm font-thin text-white shadow-lg'>{props.date}</div>
        </div>
        <div className='h-full flex flex-col items-center justify-between'>
            <div>

            </div>
        <div className='text-6xl font-bold text-white shadow-lg hover:scale-105 transition-all'>{props.temperature}</div>
        <div className='flex flex-row  gap-10'>
            <div className='flex flex-row gap-2 items-center hover:scale-105 transition-all'>
              <Image src={'/humidity.svg'} alt='humidity' width={80} height={80}/>
              {props.humidity} </div>
            <div  className='flex flex-row gap-2 items-center hover:scale-105 transition-all'>
            <Image src={'/wind.svg'} alt='wind' width={80} height={80}/>
              {props.windSpeed} km/ph </div>
        </div>
        </div>

    </div>
  )
}

export default Display