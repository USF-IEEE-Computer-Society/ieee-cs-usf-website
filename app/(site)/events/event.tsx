"use client"

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
    
    return (
        <div className="w-[350px] h-auto bg-gray-50 rounded-md shadow-md p-2 flex flex-col gap-6 items-center">
            {imageURL ? (
                <Link href={eventUrl} target="_blank" rel="noopener noreferrer">
                    <Image src={imageURL} width={350} height={50} alt={name} className="cursor-pointer hover:opacity-80 transition-opacity" />
                </Link>
            ) : null}
        </div>
    )
}