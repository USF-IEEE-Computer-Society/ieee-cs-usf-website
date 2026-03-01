import Link from 'next/link'

type ButtonProps = {
  id?: string
  text: string
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
}

export default function Button({ id, text, href, variant = 'primary' }: ButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center px-7 py-3.5 font-display text-sm font-bold uppercase tracking-wider rounded-xl transition-all duration-300 overflow-hidden group"

  const variantStyles = {
    primary: "bg-ieeeOrange text-ieeeDarkblue hover:bg-ieeeDark hover:shadow-lg hover:shadow-ieeeOrange/20 hover:-translate-y-0.5",
    secondary: "bg-surface border border-borderStrong text-foreground hover:border-ieeeOrange hover:text-ieeeOrange hover:-translate-y-0.5",
    ghost: "text-ieeeOrange hover:bg-ieeeOrange/10",
  }

  const className = `${baseStyles} ${variantStyles[variant]}`

  if (href) {
    return (
      <Link id={id} href={href} target="_blank" rel="noopener noreferrer" className={className}>
        <span className="relative z-10">{text}</span>
      </Link>
    )
  }

  return (
    <button id={id} className={className}>
      <span className="relative z-10">{text}</span>
    </button>
  )
}
