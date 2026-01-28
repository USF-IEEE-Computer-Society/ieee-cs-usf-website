'use client'

import { useState } from 'react'
import { Questions } from './faqData'

export default function FAQ() {
  const [OpenMenus, setOpenMenus] = useState<Record<string, boolean>>({})

  const ToggleButton = (id: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='w-full flex justify-center bg-gray-100/50'>
        <div className='pt-16 pb-16 w-full max-w-[1500px] px-4'>
          <h2 className="text-[2.5rem] font-semibold text-ieeeDark text-center mb-12">FAQ</h2>
          
          <div className="w-[90%] max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto">
            {Questions.map(q => {
              const open = OpenMenus[q.id]

              return (
                <div key={q.id} className="w-full">
                  {/* Header */}
                  <div
                    className={[
                      'flex flex-col border border-black bg-white hover:bg-ieeeOrange transition-colors',
                      open ? 'rounded-t-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)]' : 'rounded-xl',
                    ].join(' ')}
                  >
                    <button
                      onClick={() => ToggleButton(q.id)}
                      aria-expanded={open}
                      className="relative w-full flex items-center justify-between px-4 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ieeeOrange focus-visible:ring-inset rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className='min-w-5'>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className={['w-6 h-6 transition-transform duration-200', open ? 'rotate-180' : 'rotate-0'].join(' ')}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                          </svg>

                        </div>


                        <span className="text-lg md:text-xl leading-7">{q.Question}</span>
                      </div>
                    </button>
                  </div>

                  <div
                    className={[
                      'border-x border-b border-black rounded-b-xl bg-white',
                      'transition-[grid-template-rows,opacity] duration-200 ease-out',
                      'grid',
                      open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                    ].join(' ')}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 py-5">
                        <p className="text-base leading-7 text-black/80" dangerouslySetInnerHTML={{ __html: q.Response }}></p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}