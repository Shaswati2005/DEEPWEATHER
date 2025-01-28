import React from 'react'
import Image from 'next/image';
interface CardsProps{
    name:string;
    image:string;
    data:number;
    background:string;
    place:string;
}

const Cards:React.FC<CardsProps> = (props) => {
  return (
    <div className='flex flex-col items-center w-[400px] border rounded-xl p-2 bg-blue-500 hover:bg-blue-700 border-y-4 border-x-2'>
       <Image src={props.image} alt={props.name} width={250} height={250}  className='hover:scale-110 transition-all'/>

       <div className='flex flex-col gap-7'>
       <div className='text-8xl font-bold items-center hover:scale-105 transition-all'>
        {props.data}
       </div>

       <div className='font-thin text-sm hover:scale-105 transition-all'>
        {props.place}
       </div>

       </div>

       

    </div>
  )
}

export default Cards