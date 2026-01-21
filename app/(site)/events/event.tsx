"use client"

import moment from 'moment'

import Image from "next/image"
import Link from "next/link"

interface EventLocation {
    name: string | null;
    address: string | null;
}

interface Props {
    id: number;
    bullsconnect_id: string;
    name: string;
    originalURL: string | null;
    finalURL: string | null;
    description: string | null;
    imageURL: string | null;
    startDate: string | null;
    endDate: string | null;
    location: EventLocation | null;
    tags: string[] | null;
    registeredCount: number | null;
}

export default function Event({
    id,
    bullsconnect_id,
    name,
    originalURL,
    finalURL,
    description,
    imageURL,
    startDate,
    endDate,
    location,
    tags,
    registeredCount
}: Props) {
    const eventUrl = originalURL || finalURL || '#';
    
    const STOCK_IMAGE_LINK = "https://bullsconnect.usf.edu/upload/usf/2022/r3_image_upload_2821985_MicrosoftTeamsimage_12_316221455.png"

    if (imageURL == STOCK_IMAGE_LINK) {
        imageURL = null
    }
    
    return (
        <div className={`w-[350px] h-auto bg-gray-50 rounded-md shadow-md p-2 flex flex-col gap-6 items-center justify-center ${imageURL ? '' : 'p-5'}`}>
            {imageURL ? (
                <Link href={eventUrl} target="_blank" rel="noopener noreferrer">
                    <Image src={imageURL} width={350} height={50} alt={name} className="cursor-pointer hover:opacity-80 transition-opacity" />
                </Link>
            ) : <div className="flex flex-col">
                    <p className="p-4 w-full bg-gray-100 rounded-md text-center mb-3">No image 😭</p>
                    <h1 className="font-medium mb-3">{name}</h1>
                    <div className='mb-5'>
                        <h2>{moment(startDate).format('ddd, MMMM Do')}</h2>
                        <h2>{moment(startDate).format("LT")} - {moment(endDate).format("LT")}</h2>
                    </div>
                    <Link href={eventUrl} target="_blank" rel="noopener noreferrer" className='w-full h-[50px] p-4 bg-usfGreen rounded-md shadow-md flex items-center justify-center text-white font-medium'>View on BullsConnect</Link>
                </div>}
        </div>
    )
}