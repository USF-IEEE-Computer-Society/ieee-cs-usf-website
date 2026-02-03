'use client'

export default function Membership() {
    return (
        <div className='w-full flex flex-col items-center'>
            <div className='w-full flex justify-center bg-gray-100/50'>
                <div className='pt-10 pb-10 w-full max-w-[1500px] px-4'>
                    <h2 className="text-[2.5rem] font-semibold text-ieeeDark text-center mb-4">Membership</h2>
                    <p className="text-center text-gray-600 mb-10 max-w-4xl mx-auto">
                        Join global IEEE Computer Society. <strong>No membership required for our events!</strong>
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 max-w-5xl mx-auto">
                        <div className="flex flex-col gap-6 flex-1">
                            <div className="flex items-start gap-4">
                                <div className="size-2 rounded-full bg-ieeeBlue mt-2 shrink-0"></div>
                                <div>
                                    <h3 className="font-semibold text-ieeeDark text-xl mb-2">Scholarships and Awards</h3>
                                    <p className="text-gray-600 text-sm">Over US$40,000 is available each year across three different scholarship opportunities. Most winners receive US$1,000.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="size-2 rounded-full bg-ieeeBlue mt-2 shrink-0"></div>
                                <div>
                                    <h3 className="font-semibold text-ieeeDark text-xl mb-2">Internship Edge</h3>
                                    <p className="text-gray-600 text-sm">Access to a real network (students, alumni, professionals) + referrals happen through people.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="size-2 rounded-full bg-ieeeBlue mt-2 shrink-0"></div>
                                <div>
                                    <h3 className="font-semibold text-ieeeDark text-xl mb-2">Conference Discounts</h3>
                                    <p className="text-gray-600 text-sm">Reduced rates for IEEE/IEEE CS conferences (and sometimes local events).</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-md px-8 py-8 border border-gray-200">
                            <span className="text-gray-500 text-sm uppercase tracking-wide mb-1">Annual Student Membership</span>
                            <span className="text-7xl font-bold text-ieeeBlue">$40</span>
                            <span className="text-gray-500 text-sm mt-1">per year</span>
                            <a 
                                href="https://www.computer.org/membership/join" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="mt-4 px-6 py-2 bg-ieeeBlue text-white rounded-lg font-medium hover:bg-ieeeBlue/90 transition-colors"
                            >
                                Join Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
