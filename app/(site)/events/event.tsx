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
    cohosted: boolean | null;
    cohostedName: string | null;
}

function getTimeBadge(startTime: string | null): string | null {
    if (!startTime) return null;
    const now = moment().startOf('day');
    const eventDay = moment(startTime).startOf('day');
    const diff = eventDay.diff(now, 'days');
    if (diff === 0) return 'TODAY';
    if (diff === 1) return 'TOMORROW';
    return null;
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
    rsvpCount,
    cohosted,
    cohostedName
}: Props) {
    const eventUrl = originalURL || eventURL || '#';
    
    const STOCK_IMAGE_LINKS = [
    "https://bullsconnect.usf.edu/upload/usf/2022/r3_image_upload_2821985_MicrosoftTeamsimage_12_316221455.png",
    "https://bullsconnect.usf.edu/upload/usf/2021/r2_image_upload_2829082_Banner_829221414.png",
    "https://bullsconnect.usf.edu/upload/usf/2021/r3_image_upload_2829082_Banner_829221414.png"
    ]

    let imageSrc = photoUrl;
    if (imageSrc && STOCK_IMAGE_LINKS.includes(imageSrc)) { //exception to not display stock image 
        imageSrc = null
    }

    const timeBadge = getTimeBadge(startTime);

    return (
        <div className="flex flex-col items-start h-full">
            {timeBadge && (
                <div className="mb-2 px-3 py-1 text-xs font-bold tracking-wide text-white bg-ieeeBlue rounded-md">
                    {timeBadge}
                </div>
            )}
            {/* {cohosted && cohostedName && (
                <span className="mb-2 px-3 py-1 text-xs font-semibold text-white bg-ieeeBlue/75 rounded-md max-w-[350px]">
                    Cohosted with {cohostedName}
                </span>
            )} */}
            <div className={`w-[350px] h-[200px] flex-1 bg-gray-50 dark:bg-gray-800 rounded-sm shadow-md flex flex-col gap-6 items-center justify-center ${imageSrc ? '' : 'p-5'}`}>
                {imageSrc ? (
                    <Link href={eventUrl} target="_blank" rel="noopener noreferrer">
                        <Image src={imageSrc} width={350} height={50} alt={title} className="cursor-pointer hover:opacity-80 transition-opacity rounded-sm" />
                    </Link>
                ) : <div className="flex flex-col flex-1 w-full items-center justify-center">
                        <div>
                            <p className="p-4 w-full bg-gray-100 dark:bg-gray-700 rounded-md text-center mb-3 dark:text-gray-200">No flyer yet  😭</p>
                            <h1 className="font-medium mb-3 dark:text-white">{title}</h1>
                            <div className='mb-5 dark:text-gray-300'>
                                <h2>{moment(startTime).format('ddd, MMMM Do')}</h2>
                                <h2>{moment(startTime).format("LT")} - {moment(endTime).format("LT")}</h2>
                            </div>
                        </div>
                        <Link href={eventUrl} target="_blank" rel="noopener noreferrer" className='w-auto h-[50px] p-4 bg-usfGreen rounded-md shadow-md flex items-center justify-center text-white font-medium'>View on BullsConnect</Link>
                    </div>}
            </div>
        </div>
    )
}