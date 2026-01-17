'use client'

import IEEElogo from "./assets/ieee-logo.png"
import IEEECSlogo from "./assets/csociety_logo.webp"
import IEEECSUSFlogo from "../public/ieee_cs_usf_logo_black.png"

export default function About() {
    return (
        <div className='w-full flex flex-col items-center'>
            {/* Section 1: IEEE & IEEE Computer Society */}
            <div className='w-full flex justify-center bg-gray-100/50'>
                <div className='pt-16 pb-8 w-full max-w-[1500px] px-4'>
                    <h2 className="text-4xl font-semibold text-ieeeDark text-center mb-4">What is IEEE Computer Society?</h2>
                    <p className="text-center text-gray-600 mb-10 max-w-5xl mx-auto">
                        Our organization is pronounced as the <strong>I Triple E</strong> Computer Society.
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <div className="w-full md:w-[450px] h-auto flex flex-col bg-white rounded-xl p-6 shadow-sm">
                            <div className="flex justify-center p-3">
                                <img src={IEEElogo.src} alt="IEEE Logo" width={220} />
                            </div>
                            <div className="p-3">
                                <h3 className="text-xl font-semibold text-ieeeDark mb-3">IEEE</h3>
                                <p className="text-gray-700">
                                    IEEE is a global organization with broad engineering and technology focus (electronics, computing, power, robotics, etc.). IEEE stands for <strong>Institute of Electrical and Electronics Engineers</strong>.
                                </p>
                                <a 
                                    href="https://www.ieee.org/about" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-ieeeBlue hover:underline font-medium mt-3 inline-block"
                                >
                                    Learn more about IEEE →
                                </a>
                            </div>
                        </div>

                        <div className="w-full md:w-[450px] h-auto flex flex-col bg-white rounded-xl p-6 shadow-sm">
                            <div className="flex justify-center p-3">
                                <img src={IEEECSlogo.src} alt="IEEE Computer Society Logo" width={220} />
                            </div>
                            <div className="p-3">
                                <h3 className="text-xl font-semibold text-ieeeDark mb-3">IEEE Computer Society</h3>
                                <p className="text-gray-700 mb-3">
                                    IEEE Computer Society is a technical society of IEEE dedicated to computing: hardware, software, standards and people.
                                </p>
                                <ul className="text-gray-700 space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-ieeeBlue font-bold">•</span>
                                        <span><strong>370,000+</strong> community members worldwide</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-ieeeBlue font-bold">•</span>
                                        <span>Largest Global Community of Computer Scientists and Engineers</span>
                                    </li>
                                </ul>
                                <a 
                                    href="https://www.computer.org/about" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-ieeeBlue hover:underline font-medium mt-3 inline-block"
                                >
                                    Learn more about IEEE Computer Society →
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Section 2: IEEE Computer Society at USF */}
            {/* <div className='w-full flex justify-center bg-white'>
                <div className='pt-16 pb-16 w-full max-w-[1500px] px-4'>
                    <h2 className="text-4xl font-semibold text-ieeeDark text-center mb-4">Who is IEEE Computer Society at USF?</h2>
                    <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
                        We are a student branch chapter at USF directly affiliated with the IEEE Computer Society Florida West Coast Section (FWCS).
                    </p>

                    <div className="flex flex-col items-center gap-8">
                        <div className="flex justify-center">
                            <img src={IEEECSUSFlogo.src} alt="IEEE Computer Society USF Logo" width={200} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
                            <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-ieeeBlue">
                                <h3 className="text-lg font-semibold text-ieeeDark mb-2">#1 in the United States</h3>
                                <p className="text-gray-700">Highest attendance of events and meetings among all student branch chapters in the US.</p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-ieeeBlue">
                                <h3 className="text-lg font-semibold text-ieeeDark mb-2">3 USF Awards (2025)</h3>
                                <p className="text-gray-700">Won "Best Social Media", "Best Workshop Series", and "Best Picture" from USF College of Engineering Student Council.</p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-ieeeBlue">
                                <h3 className="text-lg font-semibold text-ieeeDark mb-2">FWCS Recognition</h3>
                                <p className="text-gray-700">Awarded for "Being a National Leader for Total Events and Hosting TechX Conference for 2 years".</p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-ieeeBlue md:col-span-2 lg:col-span-3 lg:max-w-md lg:mx-auto">
                                <h3 className="text-lg font-semibold text-ieeeDark mb-2">Richard E. Merwin Scholarship</h3>
                                <p className="text-gray-700">Leaders from our chapter received this prestigious IEEE-CS scholarship <strong>4 times</strong>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3: About us */}
            <div className='w-full flex justify-center bg-white'>
                <div className='pt-16 pb-16 w-full max-w-[1500px] px-4'>
                    <h2 className="text-4xl font-semibold text-ieeeDark text-center mb-4">About us</h2>
                    <p className="text-center text-gray-600 mb-10 max-w-4xl mx-auto">
                        We are a student branch chapter of IEEE Computer Society at University of South Florida (Tampa, Florida).
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h3 className="text-xl font-semibold text-ieeeDark mb-3">Career Preparation</h3>
                            <p className="text-gray-700 mb-3">
                                We organize <strong>13+ professional development events and workshops</strong> per semester. Our goal is to provide career preparation including certifications, resume building, interview skills, and soft skills development.
                            </p>
                            <p className="text-gray-700">
                                Featuring talks and panels by interns, researchers, engineers, and companies from the IEEE Computer Society professional network with dynamic Q&A.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h3 className="text-xl font-semibold text-ieeeDark mb-3">Hands-on Workshops</h3>
                            <p className="text-gray-700 mb-3">
                                Our workshops focus on hands-on hardware exploration and learning software tools used in professional software development.
                            </p>
                            <p className="text-gray-700 italic">
                                We will not teach you things that are as easy or entertaining to learn by watching YouTube.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h3 className="text-xl font-semibold text-ieeeDark mb-3">TechX Florida Conference</h3>
                            <p className="text-gray-700 mb-3">
                                Our biggest annual event supported by the TechX initiative of IEEE-CS Students & Young Professionals.
                            </p>
                            <p className="text-gray-700">
                                <strong>TechX Florida 2025</strong> themed on Artificial Intelligence brought together <strong>336 attendees</strong> across 9 universities and industry.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h3 className="text-xl font-semibold text-ieeeDark mb-3">Giveaways & Swag</h3>
                            <p className="text-gray-700 mb-3">
                                At our events we give away tons of food, cat stickers, and IEEE Computer Society merch!
                            </p>
                            <p className="text-gray-700">
                                We gave away more than <strong>$9,000</strong> of Internet of Things (IoT) circuits in the last 2 years.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}