'use client'

import CountUp from 'react-countup'
import IEEElogo from "@/app/(site)/assets/ieee-logo.png"
import IEEECSlogo from "@/app/(site)/assets/csociety_logo.webp"

export default function WhatIsIEEECS() {
    return (
        <div className='w-full flex justify-center bg-gray-100/50'>
            <div className='pt-10 pb-5 md:pb-10 w-full max-w-[1500px] px-4'>
                <h2 className="text-[2.5rem] font-semibold text-ieeeDark text-center mb-4">What is IEEE Computer Society?</h2>
                <p className="text-center text-gray-600 mb-10 max-w-5xl mx-auto">
                    Pronounced as the <strong>I Triple E</strong> Computer Society.
                </p>

                <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <div className="w-full md:w-[450px] h-auto flex flex-col bg-white shadow-md border border-gray-100 rounded-lg p-6">
                        <div className="flex justify-center p-3">
                            <img src={IEEElogo.src} alt="IEEE Logo" width={220} />
                        </div>
                        <div className="p-3 flex flex-col flex-1">
                            <p className="text-gray-700">
                                IEEE is a global organization with broad engineering and technology focus (electronics, computing, power, robotics, etc.). IEEE stands for Institute of Electrical and Electronics Engineers.
                            </p>
                            <a 
                                href="https://www.ieee.org/about" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-ieeeBlue hover:underline font-medium mt-auto pt-3 inline-block"
                            >
                                Learn more about IEEE →
                            </a>
                        </div>
                    </div>

                    <div className="w-full md:w-[450px] h-auto flex flex-col bg-white shadow-md border border-gray-100 rounded-lg p-6">
                        <div className="flex justify-center p-3">
                            <img src={IEEECSlogo.src} alt="IEEE Computer Society Logo" width={220} />
                        </div>
                        <div className="p-3 flex flex-col flex-1">
                            {/* <h3 className="text-xl font-semibold text-ieeeDark mb-3">IEEE Computer Society</h3> */}
                            <p className="text-gray-700 mb-3">
                                IEEE Computer Society is a technical society of IEEE dedicated to computing: hardware, software, standards and people.
                            </p>
                            <p className="text-gray-700">
                                <strong>370,000+</strong> community members worldwide
                            </p>
                            <a 
                                href="https://www.computer.org/about" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-ieeeBlue hover:underline font-medium mt-auto pt-3 inline-block"
                            >
                                Learn more about IEEE Computer Society →
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
