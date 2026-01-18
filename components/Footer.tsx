import Image from "next/image"
import { InstagramIcon, LinkedInIcon, LinktreeIcon } from "./icons/SocialIcons"

export default function Footer() {
    return(
        <div className='w-full flex justify-center bg-ieeeDarkblue text-white'>
            <div className='pt-6 pb-6 w-full max-w-[1500px] px-4'>

                <div className="flex flex-col gap-10 items-center">

                    <div>
                        <Image 
                            src="/ieee_cs_usf_logo_white.png" 
                            alt="IEEE-CS Logo" 
                            width={150} 
                            height={40} 
                        />

                    </div>

                    <div className="flex flex-row gap-5">
                        <a href="https://www.instagram.com/ieeecs_usf/?hl=en" target="_blank" rel="noopener noreferrer">
                            <InstagramIcon />
                        </a>

                        <a href="https://www.linkedin.com/company/ieee-cs-at-usf/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
                            <LinkedInIcon />
                        </a>

                        <a href="https://linktr.ee/ieeecsusf" target="_blank" rel="noopener noreferrer">
                            <LinktreeIcon />
                        </a>
                    </div>

                    <div className="flex flex-col items-center">
                        <h1>© 2026 IEEE Computer Society at USF.</h1>
                        <h1>All rights reserved. No commercial use without permission.</h1>
                    </div>



                </div>

            </div>
            
        </div>
    )
}