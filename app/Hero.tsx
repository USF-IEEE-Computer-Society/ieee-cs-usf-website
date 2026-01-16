'use client'

import Image from 'next/image'
import StatCard from '@/components/StatCard'
import { heroStats } from './heroData'
import heroImg from "../public/hero.png"

export default function Hero() {

    return (
        <div className='w-full flex justify-center'>
        <div className='pt-2 md:pt-10 pb-10 w-full max-w-[1500px] flex flex-col md:flex-row'>
  
          <div className='p-5 pl-3 pr-3 md:pl-1 md:pr-10 flex flex-col justify-center'>
  
            <div className='mb-5 md:mb-10'>
              <h1 className='font-bold text-ieeeDark text-2xl md:text-5xl mb-6'>IEEE Computer Society at USF</h1>
              <p className='font-medium text-md md:text-xl'>Premier tech student organization on USF campus</p>
  
            </div>
  
            <div className='flex flex-row gap-3 text-xl'>
              {heroStats.map((stat, index) => (
                <StatCard
                  key={index}
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                  showPlus={stat.showPlus}
                />
              ))}
            </div>
  
  
          </div>
  
          <div className='flex justify-center'>
            <Image 
              src={heroImg}
              alt="TechX"
              className='w-95 md:w-[700px] rounded-xl shadow-xl'
            />
          </div>
  
        </div>
      </div>
    )
}