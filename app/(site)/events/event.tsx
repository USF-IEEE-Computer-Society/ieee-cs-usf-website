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
  if (imageSrc == STOCK_IMAGE_LINK) {
    imageSrc = null
  }

  if (imageSrc == "https://bullsconnect.usf.edu/upload/usf/2026/image_upload_4241129_Leetcode_Innovation_fest__224113227.png") {
    imageSrc = "https://bullsconnect.usf.edu/upload/usf/2026/image_upload_4241129_Leetcode_Innovation_fest__224113037.png"
  }

  return (
    <div className="glass-card overflow-hidden flex flex-col group">
      {imageSrc ? (
        <Link href={eventUrl} target="_blank" rel="noopener noreferrer" className="block overflow-hidden">
          <Image
            src={imageSrc}
            width={400}
            height={250}
            alt={title}
            className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
          />
        </Link>
      ) : (
        <div className="p-6 flex flex-col flex-1">
          <div className="p-4 rounded-xl bg-surfaceAlt text-center mb-4">
            <p className="text-muted text-sm">No image yet</p>
          </div>

          <h3 className="font-display font-bold text-foreground mb-3">{title}</h3>

          <div className="mb-5 text-sm text-muted space-y-0.5">
            <p>{moment(startTime).format('ddd, MMMM Do')}</p>
            <p>{moment(startTime).format("LT")} &ndash; {moment(endTime).format("LT")}</p>
          </div>

          <Link
            href={eventUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto w-full py-3 px-4 rounded-xl bg-usfGreen text-white font-display text-sm font-bold uppercase tracking-wider text-center hover:bg-usfGreen/90 transition-colors"
          >
            View on BullsConnect
          </Link>
        </div>
      )}
    </div>
  )
}
