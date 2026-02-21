"use client"

import moment from 'moment'

import Image from "next/image"
import Link from "next/link"

interface EventVenue {
    name: string;
    isOnline: boolean;
}

interface Props {
    id: number;
    bullsconnect_id: string;
    title: string;
    originalURL: string | null;
    eventURL: string | null;
    description: string | null;
    photoUrl: string | null;
    startTime: string | null;
    endTime: string | null;
    venue: EventVenue | null;
    tags: string[] | null;
    rsvpCount: number | null;
}

export default function Event({
    id,
    bullsconnect_id,
    title,
    originalURL,
    eventURL,
    description,
    photoUrl,
    startTime,
    endTime,
    venue,
    tags,
    rsvpCount
}: Props) {
    const eventUrl = originalURL || eventURL || '#';
    
    const STOCK_IMAGE_LINK = "https://bullsconnect.usf.edu/upload/usf/2022/r3_image_upload_2821985_MicrosoftTeamsimage_12_316221455.png"

    let imageSrc = photoUrl;
    if (imageSrc == STOCK_IMAGE_LINK) { //exception to not display stock image 
        imageSrc = null
    }

    if (imageSrc == "https://bullsconnect.usf.edu/images/groups/professional-02.png") { //special exception for leetcode event with ecouncil not posting flyer
        imageSrc = null
    }
    
    return (
        <div className={`w-[350px] h-auto bg-gray-50 rounded-sm shadow-md flex flex-col gap-6 items-center justify-center ${imageSrc ? '' : 'p-5'}`}>
            {imageSrc ? (
                <Link href={eventUrl} target="_blank" rel="noopener noreferrer">
                    <Image src={imageSrc} width={350} height={50} alt={title} className="cursor-pointer hover:opacity-80 transition-opacity rounded-sm" />
                </Link>
            ) : <div className="flex flex-col">
                    <p className="p-4 w-full bg-gray-100 rounded-md text-center mb-3">No image yet  😭</p>
                    <h1 className="font-medium mb-3">{title}</h1>
                    <div className='mb-5'>
                        <h2>{moment(startTime).format('ddd, MMMM Do')}</h2>
                        <h2>{moment(startTime).format("LT")} - {moment(endTime).format("LT")}</h2>
                    </div>
                    <Link href={eventUrl} target="_blank" rel="noopener noreferrer" className='w-full h-[50px] p-4 bg-usfGreen rounded-md shadow-md flex items-center justify-center text-white font-medium'>View on BullsConnect</Link>
                </div>}
        </div>
    )
}