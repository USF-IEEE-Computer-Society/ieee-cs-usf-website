'use client'

export default function About() {
    return (
        <div className='w-full flex flex-col items-center'>
            <div className='w-full flex justify-center bg-gray-100/50'>
                <div className='pt-10 pb-5 md:pb-10 w-full max-w-[1500px] px-4'>
                    <h2 className="text-[2.5rem] font-semibold text-ieeeDark text-center mb-4">About us</h2>
                    <p className="text-center text-gray-600 mb-10 max-w-4xl mx-auto">
                        We are a student branch chapter of IEEE Computer Society at the University of South Florida (Tampa, Florida).
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
                        <div className="bg-white rounded-xl p-8 shadow-md flex-1">
                            <h3 className="text-2xl font-semibold text-ieeeDark mb-3">Career Preparation</h3>
                            <p className="text-gray-700 mb-3">
                                We organize <strong>13+ professional development events and workshops</strong> per semester. Our goal is to provide career preparation including certifications, resume building, interview skills, and soft skills development.
                            </p>
                            <p className="text-gray-700">
                                Featuring talks and panels by interns, researchers, engineers, and companies from the IEEE Computer Society professional network with dynamic Q&A.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-md flex-1">
                            <h3 className="text-2xl font-semibold text-ieeeDark mb-3">Hands-on Workshops</h3>
                            <p className="text-gray-700 mb-3">
                                Our workshops focus on <strong>hands-on</strong> hardware exploration and learning software tools used in professional software development.
                            </p>
                            <p className="text-gray-700 italic">
                                We will not teach you things that are as easy or entertaining to learn by watching YouTube.
                            </p>
                        </div>


                        <div className="bg-white rounded-xl p-8 shadow-md flex-1">
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