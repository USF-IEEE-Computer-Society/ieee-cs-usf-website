'use client'

import IEEECSUSFlogo from "@/public/ieee_cs_usf_logo_black.png"

export default function Achievements() {
    return (
        <div className='w-full flex flex-col items-center'>
             <div className='w-full flex justify-center bg-gray-100/50'>
                <div className='pt-16 pb-10 w-full max-w-[1500px] px-4'>
                    <h2 className="text-[2.5rem] font-semibold text-ieeeDark text-center mb-8">Achievements</h2>


                    <div className="flex flex-col items-center gap-8">


                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">

                            <div className="max-w-[420px] bg-gray-100/70 rounded-xl p-6 border-l-4 border-ieeeBlue flex flex-col">
                                    <h3 className="text-lg font-semibold text-ieeeDark mb-2">3 USF Awards (2025)</h3>
                                    <p className="text-gray-700">Won "Best Social Media", "Best Workshop Series", and "Best Picture" from University of South Florida College of Engineering Student Council.</p>

                                    <a 
                                href="https://www.ieeecsusf.com/news/ieee-cs-at-usf-wins-three-awards-at-the-usf-engineering-banquet" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-ieeeBlue hover:underline font-medium mt-auto pt-3 inline-block"
                            >
                                View Recap →
                            </a>
                                </div>

                            <div className="max-w-[420px] bg-gray-100/70 rounded-xl p-6 border-l-4 border-ieeeBlue flex flex-col">
                                    <h3 className="text-lg font-semibold text-ieeeDark mb-2">IEEE Recognition</h3>
                                    <p className="text-gray-700">Awarded by IEEE Florida West Coast Section for "Being a National Leader for Total Events and Hosting TechX Conference for 2 years".</p>

                                    
                                    <a 
                                href="https://www.ieeecsusf.com/news/ieee-computer-society-student-branch-celebrates-award-at-florida-west-coast-banquet" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-ieeeBlue hover:underline font-medium mt-auto pt-3 inline-block"
                            >
                                View Recap →
                            </a>
                                </div>




                            <div className="max-w-[420px] bg-gray-100/70 rounded-xl p-6 border-l-4 border-ieeeBlue">
                                <h3 className="text-lg font-semibold text-ieeeDark mb-2">#1 in the United States</h3>
                                <p className="text-gray-700">Highest attendance of events and meetings among all student branch chapters in the US.</p>
                            </div>



                            <div className="max-w-[420px] bg-gray-100/70 rounded-xl p-6 border-l-4 border-ieeeBlue">
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
