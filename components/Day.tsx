import React from 'react'
import Day1 from './Day1'

interface dayProps{
  day:string;



}

const Day:React.FC<dayProps>= (props) => {
  return (
    <div className='flex flex-col lg:flex-row  gap-2 border border-white rounded-lg   h-[200px] lg:h-[200px] p-10 w-[300px] lg:w-full'>
        <div>
          props.day

            <Day1 day={props.day} temperature={25} humidity={30.5} windSpeed={0.25} />

        </div>




    </div>
  )
}

export default Day