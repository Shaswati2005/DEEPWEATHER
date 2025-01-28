import React from 'react'
import Image from 'next/image';

interface ButtonProps{
    image:string;
    name:string;
    click:(name:string )=>void;

}

const bg= ['/cloudy.svg','/rainy.svg','/snowy.svg','/thunder.svg']

const Button:React.FC<ButtonProps> = (props) => {
  return (
    <button  onClick={()=>{
      props.click(props.name)
    }} className='flex flex-row m-1 w-[150x] lg:w-[270px] lg:flex-row bg-blue-500  border border-white rounded-xl hover:scale-105 transition-all items-center px-4 hover:bg-blue-600 '>
       <Image src={props.image} alt={props.name} width={50} height={50} />
        <h1 className='text-sm lg:text-2xl fonnt-thin lg:font-medium '>{props.name}</h1>
    </button>
  )
}

export default Button