import { InstagramIcon, LinkedInIcon } from "./icons/SocialIcons"

export default function SocialsBanner() {
  return (
    <div className="flex items-center gap-3 mb-12">
      <p className="text-gray-600 dark:text-gray-400 text-sm">Follow us on our socials to stay updated:</p>
      <div className="flex gap-2">
        <a
          href="https://www.instagram.com/ieeecs_usf"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <InstagramIcon size={20} color="currentColor" className="text-gray-600 dark:text-gray-400" />
        </a>
        <a
          href="https://www.linkedin.com/company/ieee-cs-at-usf/posts/?feedView=all"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <LinkedInIcon size={20} color="currentColor" className="text-gray-600 dark:text-gray-400" />
        </a>
      </div>
    </div>
  )
}
