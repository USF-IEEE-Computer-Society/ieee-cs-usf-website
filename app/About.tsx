'use client'

export default function About() {
    return (
        <div className='w-full flex flex-col items-center'>
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
            </div>*/}

            <div className='w-full flex justify-center bg-white'>
                <div className='pt-16 pb-16 w-full max-w-[1500px] px-4'>
                    <h2 className="text-4xl font-semibold text-ieeeDark text-center mb-4">About us</h2>
                    <p className="text-center text-gray-600 mb-10 max-w-4xl mx-auto">
                        We are a student branch chapter of IEEE Computer Society at University of South Florida (Tampa, Florida).
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
                        <div className="bg-white rounded-xl p-6 shadow-md flex-1">
                            <h3 className="text-2xl font-semibold text-ieeeDark mb-3">Career Preparation</h3>
                            <p className="text-gray-700 mb-3">
                                We organize <strong>13+ professional development events and workshops</strong> per semester. Our goal is to provide career preparation including certifications, resume building, interview skills, and soft skills development.
                            </p>
                            <p className="text-gray-700">
                                Featuring talks and panels by interns, researchers, engineers, and companies from the IEEE Computer Society professional network with dynamic Q&A.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-md flex-1">
                            <h3 className="text-2xl font-semibold text-ieeeDark mb-3">Hands-on Workshops</h3>
                            <p className="text-gray-700 mb-3">
                                Our workshops focus on <strong>hands-on</strong> hardware exploration and learning software tools used in professional software development.
                            </p>
                            <p className="text-gray-700 italic">
                                We will not teach you things that are as easy or entertaining to learn by watching YouTube.
                            </p>
                        </div>


                        <div className="bg-white rounded-xl p-6 shadow-md flex-1">
                            <h3 className="text-2xl font-semibold text-ieeeDark mb-3">Giveaways & Swag</h3>
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