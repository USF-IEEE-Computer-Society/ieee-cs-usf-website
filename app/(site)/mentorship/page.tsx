import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentorship Program',
  description:
    'Learn about the IEEE Computer Society at USF Mentorship Program schedule and milestones.',
}

const milestones = [
  { milestone: 'Student application opens', date: 'March 14' },
  { milestone: 'Student application closes', date: 'April 1' },
  { milestone: 'Round 1 pairing', date: 'Monday, April 6' },
  { milestone: 'Round 2 pairing', date: 'Monday, May 4' },
  { milestone: 'Round 3 pairing', date: 'Monday, June 1' },
  { milestone: 'Certificates issued', date: 'Saturday, June 13' },
  {
    milestone: 'Online closing ceremony (optional attendance)',
    date: 'Saturday, June 13',
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

        <div className="mt-12 text-center py-10 border-t border-gray-200 dark:border-gray-700">
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
