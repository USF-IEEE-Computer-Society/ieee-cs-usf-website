import Link from 'next/link'

type ButtonProps = {
  id?: string
  text: string
  href?: string
}

export default function Button({ id, text, href }: ButtonProps) {
  const className = "w-60 h-16 bg-ieeeOrange rounded cursor-pointer flex items-center justify-center"
  const content = <h2 className="text-base font-bold text-black text-balance text-center">{text}</h2>

  if (href) {
    return (
      <Link id={id} href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </Link>
    )
  }

  return (
    <button id={id} className={className}>
      {content}
    </button>
  )
}
