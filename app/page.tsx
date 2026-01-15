import { Users, ScrollText, UserLock} from 'lucide-react'

import Image from 'next/image'

import techx from "./techx.webp"

export default function Home() {
  return (
    <div className='w-full flex justify-center'>
      <div className='pt-10 w-full max-w-[1500px] flex flex-row'>

        <div className='p-5 pl-2 pr-8 flex flex-col justify-center'>

          <div className='mb-10'>
            <h1 className='font-bold text-ieeeDark text-5xl mb-6'>IEEE Computer Society at USF</h1>
            <p className='font-medium text-xl'>Premier tech student organization on USF campus</p>

          </div>

          <div className='flex flex-row gap-5 text-xl'>

            <div className='w-1/3 flex flex-col items-center'>
              <Users size={40} />
              <div className='flex flex-col items-center mt-4'>
                <h2 className='text-xl'>649+</h2>
                <h2>members</h2>
              </div>

            </div>

            <div className='w-1/3 flex flex-col items-center'>
              <ScrollText size={40} />
              <div className='flex flex-col items-center mt-4'>
                <h2 className='text-xl'>128+</h2>
                <h2>events</h2>
              </div>
            </div>

            <div className='w-1/3 flex flex-col items-center'>
              <UserLock size={40} />
              <div className='flex flex-col items-center mt-4'>
                <h2 className='text-xl'>20</h2>
                <h2>E-board members</h2>
              </div>
            </div>

          </div>


        </div>

        <div>
          <Image 
            src={techx}
            alt="TechX"
            className='w-[700px] rounded-xl border-1'
          />
        </div>

      </div>
    </div>
  );
}
