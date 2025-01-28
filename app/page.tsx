"use client"

import Image from "next/image";
import { useState, useEffect  } from "react";
import Display from "@/components/Display";
import Button from "@/components/Button";
import Cards from "@/components/Cards";
import Day1 from "@/components/Day1";
//import { time } from "console";



//interface GeocodingResult {
 // lat: number;
 // lon: number;
  //display_name?: string; // Optional display name
//}



interface WeatherData {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }


export default function Home() {


  const [longitude, setLongitude] = useState<number>(84.54);
  const [latitude, setLatitude] = useState<number>(22.12);
  const [temp, setTemp] = useState<number>(0);
  const [wind,setWind] = useState<number>(0);
  const [humidity,setHumidity] = useState<number>(0);
  const [weather,setWeather] = useState<string>("rain");
  const [pressure,setPressure] = useState<number>(0);
  const [variable,setVariable] = useState<string>('humidity');
  const [value,setValue] = useState<number>(0);
  const [visibility,setVisibility] = useState<number>(0);
  const [timestamp,setTimestamp] = useState<number>(0);
  //const [day,setDay] = useState<string>("mon day");
  const [days_weather, setDays_weather] = useState<WeatherData[]>([]);
  const [forecast,setForecast] = useState([]);
  //const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState<string | null>(null);




 const [address,setAddress] = useState<string>("Rourkela");

 async function search() {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${address}&format=json&limit=1`);
  const result = await response.json();
  console.log(result);
  const k = parseFloat(result[0].lat);
  const l = parseFloat(result[0].lon);

  //setLatitude(k);
  //setLongitude(l);
  console.log(k);
  console.log(l);
  setLongitude(l);
  setLatitude(k);
  
}
  






  
  const fetchWeather = async () => {
    try {
      console.log(longitude);
      console.log(latitude);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${longitude}&lon=${latitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      );

      const response2 = await fetch(
       ` https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      )

      const res2= await response2.json(); 
      setDays_weather(res2.list);
      setForecast(res2.list);
      console.log(weather);

      
      


      const res = await response.json();


      
      setTemp(res.main.temp);
      setWeather(res.weather.main);
      setWind(res.wind.speed);
      setHumidity(res.main.humidity);
      setPressure(res.main.pressure);
      setVisibility(res.visibility);

      
    } catch (error:any) {
      console.log(error.message);
    }
  };

useEffect(()=>{fetchWeather()},[longitude,latitude])
useEffect(()=>{
  const list: WeatherData[] = days_weather;
          
          const uniqueDays = new Set<string>();
          
          const filteredList = list.filter((item) => {
            const day = item.dt_txt.split(" ")[0]; // Extract the date (YYYY-MM-DD)
            if (!uniqueDays.has(day)) {
              uniqueDays.add(day); // Add the day to the Set
              return true; // Keep the item
            }
            return false; // Skip duplicates
          });
          
          setDays_weather(filteredList);
          console.log(filteredList);
          


},[forecast])

const changeVariable= (name:string, value:number)=>{
  setVariable(name);
  setValue(value);
}

const unixToDateTimeParts = (timestamp: number) => {
  try {
    const date = new Date(timestamp * 1000);
    const dayName = date.toLocaleString('default', { weekday: 'long' }); // Full day name
    //const dayOfMonth = date.toLocaleString('default', { day: '2-digit' });
    //const month = date.toLocaleString('default', { month: 'long' }); // Full month name
    //const year = date.getFullYear();
    setTimestamp(timestamp);
    return dayName;
  } catch (e:any) {
    console.log(e);
    return "monday";
  }
};


    

    useEffect(() => { unixToDateTimeParts(timestamp) }, [timestamp]);
    
    

  return (

    
    
    <div className="flex flex-col px-3 lg:px-10 py-2 lg:py-5 items-center justify-start m-3 "
    >
      <div >
              <div className='bg-white opacity-80 text-blue-800 border border-white rounded-md flex flex-row items-center w-[300px] lg:w-[500px] px-5 py-2 gap-3 justify-center'>
                  <button onClick={search}>
                    submit
                  
                  </button>
                  <Image src={'/search.svg'} alt='' width={35} height={35}/>
                  
                  <input  onChange={(e)=>{setAddress(e.target.value)}} type="text" placeholder='enter place' className='border border-black w-[150px] lg:w-[400px] text-black rounded-lg p-2' />
              </div>
      </div>
      <div className=" flex flex-col lg:flex-row items-start lg:justify-between w-full gap-10 justify-start px-4 lg:px-8 py-5 ">
        <Display place={address} date={`${timestamp}`} day="asdfa" temperature={temp} humidity={humidity} windSpeed={wind} />
        
         <div className="flex flex-col gap-2 items-center justify-between h-[300px]  lg:h-[400px] ">
          <Button image="/humidity.svg" name="humidity" click={()=>{changeVariable('humidity',humidity)}}/>
          <Button image="/wind.svg" name="wind speed" click={()=>{changeVariable('wind',wind)}} />
          <Button image="/barometer.svg" name="Pressure" click={()=>{changeVariable('barometer',pressure)}}/>
          <Button image="/extreme.svg" name="visibility" click={()=>{changeVariable('extreme',visibility)}}/>


         </div>



         <Cards name={variable} image={`/${variable}.svg`} data={value} place="sera" background="/bg1.png"/>
      </div>

          
          <div className=" flex flex-row w-full justify-evenly flex-wrap p-4 m-2 items-start gap-2 ">
          {days_weather.map((item, index) => (
          
       
          <Day1 key={index} day={unixToDateTimeParts(item.dt)} temperature={item.main.temp} windSpeed={item.wind.speed} humidity={item.main.humidity}/>
      
    ))}

    

          </div>

          <Image src={'/animated/sun.png'} alt="sun" width={800} height={800} className="sun -z-30" />

          <Image src={'/animated/cloud.png'} alt="cloud" width={400} height={400} className="cloud1 -z-20"/>
          <Image src={'/animated/cloud.png'} alt="cloud" width={500} height={500} className="cloud2 -z-20"/>


          <Image src={'/animated/cloud.png'} alt="cloud" width={550} height={550} className="cloud3 -z-20"/>

          <Image src={'/animated/cloud.png'} alt="cloud" width={450} height={450} className="cloud4 -z-20"/>




          


      

      
       
    </div>

  );
}