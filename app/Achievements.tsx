'use client'

import IEEECSUSFlogo from "../public/ieee_cs_usf_logo_black.png"

export default function Achievements() {
    return (
        <div className='w-full flex flex-col items-center'>
             <div className='w-full flex justify-center bg-gray-100/80'>
                <div className='pt-16 pb-16 w-full max-w-[1500px] px-4'>
                    <h2 className="text-4xl font-semibold text-ieeeDark text-center mb-4">Our Achievements</h2>


                    <div className="flex flex-col items-center gap-8">


                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">

                            <div className="max-w-[400px] bg-gray-50 rounded-xl p-6 border-l-4 border-ieeeBlue">
                                <h3 className="text-lg font-semibold text-ieeeDark mb-2">#1 in the United States</h3>
                                <p className="text-gray-700">Highest attendance of events and meetings among all student branch chapters in the US.</p>
                            </div>

                            <div className="max-w-[400px] bg-gray-50 rounded-xl p-6 border-l-4 border-ieeeBlue">
                                <h3 className="text-lg font-semibold text-ieeeDark mb-2">3 USF Awards (2025)</h3>
                                <p className="text-gray-700">Won "Best Social Media", "Best Workshop Series", and "Best Picture" from USF College of Engineering Student Council.</p>
                            </div>

                            <div className="max-w-[400px] bg-gray-50 rounded-xl p-6 border-l-4 border-ieeeBlue">
                                <h3 className="text-lg font-semibold text-ieeeDark mb-2">FWCS Recognition</h3>
                                <p className="text-gray-700">Awarded by IEEE Florida West Coast Section for "Being a National Leader for Total Events and Hosting TechX Conference for 2 years".</p>
                            </div>

                            <div className="max-w-[400px] bg-gray-50 rounded-xl p-6 border-l-4 border-ieeeBlue">
                                <h3 className="text-lg font-semibold text-ieeeDark mb-2">Richard E. Merwin Scholarship</h3>
                                <p className="text-gray-700">Leaders from our chapter received this prestigious IEEE-CS scholarship <strong>4 times</strong>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}