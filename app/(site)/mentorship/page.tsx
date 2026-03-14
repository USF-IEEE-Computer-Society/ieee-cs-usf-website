import type { Metadata } from 'next'
import Button from '@/app/components/Button'

export const metadata: Metadata = {
  title: 'Mentorship Program',
  description:
    'Learn about the IEEE Computer Society at USF Mentorship Program schedule and milestones.',
}

const milestones = [
  { milestone: 'Student application opens (link below)', date: 'March 14, Saturday' },
  { milestone: 'Student application closes', date: 'April 1, Wednesday' },
  { milestone: 'Round 1 pairing', date: 'April 6, Monday' },
  { milestone: 'Round 2 pairing', date: 'May 4, Monday' },
  { milestone: 'Round 3 pairing', date: 'June 1, Monday' },
  { milestone: 'Certificates issued', date: 'June 13, Saturday' },
  {
    milestone: 'Online closing ceremony (optional attendance)',
    date: 'June 13, Saturday',
  },
]

export default function MentorshipPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <article className="container mx-auto px-4 py-10 max-w-4xl">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Mentorship Program Schedule
          </h1>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-600 px-6 py-3 text-left text-sm font-semibold">
                  Milestone
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-6 py-3 text-left text-sm font-semibold">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {milestones.map((row, i) => (
                <tr
                  key={i}
                  className="even:bg-gray-50 dark:even:bg-gray-800/50"
                >
                  <td className="border border-gray-300 dark:border-gray-600 px-6 py-3 text-sm">
                    {row.milestone}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-6 py-3 text-sm">
                    {row.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-center">
            <Button
              text="Apply for Mentorship Program"
              href="https://forms.gle/cjhHXuggDUUPfGTUA"
            />
          </div>

        <div className="text-center py-10 border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            More details about the Mentorship Program are on the way.
          </p>
          <p className="text-gray-400 dark:text-gray-500 mt-2 text-sm">
            Check back soon for updates!
          </p>

        </div>

      </article>
    </div>
  )
}
