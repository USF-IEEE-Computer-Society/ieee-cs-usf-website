'use client'

export default function TechX() {
    return (
        <div className='w-full flex flex-col items-center'>
             <div className='w-full flex justify-center bg-gray-100/80'>
                <div className='pt-16 pb-16 w-full max-w-[1300px] pl-4 pr-4'>
                    <h2 className="text-4xl font-semibold text-ieeeDark text-center mb-4">TechX</h2>
                    <p className="text-center text-gray-600 mb-8 max-w-4xl mx-auto">
                        Our flagship annual conference held at the University of South Florida
                    </p>
                    <p className="text-center text-2xl text-ieeeDark font-semibold mb-10 max-w-4xl mx-auto">
                        TechX Florida 2025 Recap
                    </p>


                        <div className="flex flex-row">

                            <div className="size-auto flex flex-row gap-1.5 md:gap-0.5 justify-center md:justify-start">
                                <div className="flex flex-col gap-1.5">

                                    <div className="size-[100px] md:size-[150px] bg-ieeeDark text-white rounded-full flex items-center justify-center">
                                        <div className="text-center">
                                            <h1 className="text-5xl md:text-6xl font-bold">10</h1>
                                            <h1 className="font-base">speakers</h1>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <div className="size-[90px] md:size-[110px] bg-ieeeDarkblue text-white rounded-full flex items-center justify-center">
                                            <div className="text-center">
                                                <h1 className="text-3xl md:text-5xl font-bold">9</h1>
                                                <h1 className="font-base text-xs md:text-sm">companies</h1>
                                            </div>
                                        </div>


                                    </div>

                                </div>

                                <div className="size-[150px] md:size-[200px] bg-ieeeBlue text-white rounded-full flex items-center justify-center mt-[35px] md:mt-[50px]">
                                    <div className="text-center">
                                        <h1 className="text-6xl md:text-7xl font-bold">336</h1>
                                        <h1 className="font-base">attendees</h1>
                                    </div>
                                </div>

                            </div>
                            <div>
                                <h1>TBD</h1>
                            </div>

                        </div>




                </div>
            </div>
        </div>
    )
}