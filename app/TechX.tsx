'use client'

import { Users, MicVocal, Building2 } from 'lucide-react'
import Image from 'next/image'

import FadeInSection from '@/components/FadeInSection'


// Import all techx images for the mosaic background
const techxImages = [
    '/assets/techx/IMG_0241.jpg',
    '/assets/techx/IMG_0298.jpg',
    '/assets/techx/IMG_2203.jpg',
    '/assets/techx/IMG_2363.jpg',
    '/assets/techx/IMG_2445.jpg',
    '/assets/techx/IMG_2478.jpg',

    '/assets/techx/IMG_8358.jpg',
    '/assets/techx/IMG_8514.jpg',
    '/assets/techx/IMG_8547.jpg',
    '/assets/techx/USF_CS_TechX_2025-02.jpg',
    '/assets/techx/USF_CS_TechX_2025-05.jpg',
    '/assets/techx/USF_CS_TechX_2025-06.jpg',

    '/assets/techx/USF_CS_TechX_2025-09.jpg',
    '/assets/techx/USF_CS_TechX_2025-10.jpg',
    '/assets/techx/USF_CS_TechX_2025-13.jpg',
    '/assets/techx/USF_CS_TechX_2025-16.jpg',
    '/assets/techx/USF_CS_TechX_2025-18.jpg',
    '/assets/techx/USF_CS_TechX_2025-19.jpg',
    // '/assets/techx/USF_CS_TechX_2025-24.jpg',
    // '/assets/techx/USF_CS_TechX_2025-26.jpg',
    // '/assets/techx/USF_CS_TechX_2025-31.jpg',
    // '/assets/techx/USF_CS_TechX_2025-34.jpg',
    // '/assets/techx/USF_CS_TechX_2025-37.jpg',
    // '/assets/techx/USF_CS_TechX_2025-44.jpg',
    // '/assets/techx/USF_CS_TechX_2025-53.jpg',
    // '/assets/techx/USF_CS_TechX_2025-57.jpg',
    // '/assets/techx/USF_CS_TechX_2025-61.jpg',
    // '/assets/techx/USF_CS_TechX_2025-74.jpg',
    // '/assets/techx/USF_CS_TechX_2025-76.jpg',
    // '/assets/techx/USF_CS_TechX_2025-82.jpg',
]

export default function TechX() {
    return (
        <div className='w-full flex flex-col items-center'>
            <div className='w-full flex justify-center relative overflow-hidden bg-black'>
                {/* Mosaic Background */}
                <div className='absolute inset-0 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-0 opacity-30'>
                    {techxImages.map((src, index) => (
                        <div key={index} className='aspect-square overflow-hidden relative'>
                            <Image 
                                src={src} 
                                alt="" 
                                fill
                                className='object-cover'
                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
                            />
                        </div>
                    ))}
                </div>
                
                <div className='pt-16 pb-16 w-full max-w-[1300px] pl-4 pr-4 relative z-10'>
                    <h2 className="text-[2.5rem] font-semibold text-ieeeDark text-center mb-4">TechX</h2>
                    <p className="text-center text-ieeeDark mb-8 max-w-4xl mx-auto">
                        Our flagship annual conference
                    </p>
                    <p className="text-center text-2xl text-ieeeDark font-semibold mb-10 max-w-4xl mx-auto">
                        TechX AI Conference 2025 Recap
                    </p>
                    <div className='flex flex-col md:flex-row gap-5'>
                        <div className="flex justify-center mb-12">
                            <div className="size-auto flex flex-row gap-1.5 md:gap-0.5 justify-center md:justify-start">
                                <div className="flex flex-col gap-1.5">
                                    <div className="size-[100px] md:size-[150px] bg-ieeeDark/75 text-white rounded-full flex items-center justify-center shadow-md">
                                        <div className="text-center">
                                            <h1 className="text-5xl md:text-6xl font-bold">11</h1>
                                            <h1 className="font-base">talks</h1>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <div className="size-[90px] md:size-[110px] bg-ieeeDarkblue/75 text-white rounded-full flex items-center justify-center shadow-md">
                                            <div className="text-center">
                                                <h1 className="text-3xl md:text-5xl font-bold">9</h1>
                                                <h1 className="font-base text-xs md:text-sm">companies</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="size-[150px] md:size-[200px] bg-ieeeBlue/75 text-white rounded-full flex items-center justify-center mt-[35px] md:mt-[50px] shadow-md">
                                    <div className="text-center">
                                        <h1 className="text-6xl md:text-7xl font-bold">336</h1>
                                        <h1 className="font-base">attendees</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Info Blocks */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl md:h-[250px]">
                            {/* Talks Block */}
                            <FadeInSection>
                                <div className="bg-white/10 rounded-xl p-6 shadow-md border border-gray-200 ">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-ieeeDark/10 rounded-md">
                                            <MicVocal className="text-ieeeDark" strokeWidth={1.5} size={28} />
                                        </div>
                                        <h3 className="text-xl font-semibold text-ieeeDark">Industry Talks</h3>
                                    </div>
                                    <p className="text-white text-sm leading-relaxed">
                                        11 presentations from AI leaders at <span className="font-medium">Microsoft</span>, <span className="font-medium">JP Morgan</span>, <span className="font-medium">Verizon</span>, <span className="font-medium">Intel</span>, including &quot;Careers in Tech&quot; panel discussion.
                                    </p>
                                </div>
                            </FadeInSection>

                            {/* Attendees Block */}
                            <FadeInSection>
                                <div className="bg-white/10 rounded-xl p-6 shadow-md border border-gray-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-ieeeBlue/10 rounded-md">
                                            <Users className="text-ieeeBlue" strokeWidth={1.5} size={28} />
                                        </div>
                                        <h3 className="text-xl font-semibold text-ieeeDark">Attendance</h3>
                                    </div>
                                    <p className="text-white text-sm leading-relaxed">
                                        <span className="font-medium">336 attendees</span> from <span className="font-medium">500+ registrations</span>, representing 9 educational institutions with <span className="font-medium">40% being professionals</span> from the Tampa Bay area.
                                    </p>
                                </div>
                            </FadeInSection>

                            {/* Companies Block */}
                            <FadeInSection>
                                <div className="bg-white/10 rounded-xl p-6 shadow-md border border-gray-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-ieeeDarkblue/10 rounded-md">
                                            <Building2 className="text-ieeeDarkblue" strokeWidth={1.5} size={28} />
                                        </div>
                                        <h3 className="text-xl font-semibold text-ieeeDark">Career Fair</h3>
                                    </div>
                                    <p className="text-white text-sm leading-relaxed">
                                        5 hours of career fair with <span className="font-medium">9 companies</span>: Verizon, Uber AI, ICode, ISACA, USF IT, IronEagleX, Tampa Devs, and more.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>

                    </div>

                    <div className="text-center mt-5">
                        <a 
                            href="https://www.techxflorida.com/2025/report" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-white hover:underline font-medium mt-3 inline-block bg-ieeeDark/80 px-4 py-2 rounded-lg"
                        >
                            Learn more about TechX Florida 2025 →
                        </a>
                    </div>

                </div>
            </div>
        </div>
    )
}