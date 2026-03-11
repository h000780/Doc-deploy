import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { JSX } from "react/jsx-runtime"

interface DocSectionProps {
  id: string
  title: ReactNode
  subtitle?: ReactNode
  level?: 1 | 2 | 3
  children: ReactNode
  className?: string
}

export function DocSection({
  id,
  title,
  subtitle,
  level = 1,
  children,
  className,
}: DocSectionProps) {
  const HeadingTag = `h${level + 1}` as keyof JSX.IntrinsicElements

  return (
    <section id={id} className={cn("scroll-mt-20", className)}>
      <div className="mb-6 space-y-2">
        <HeadingTag
          className={cn(
            "font-bold tracking-tight text-foreground",
            level === 1 && "text-3xl",
            level === 2 && "text-2xl",
            level === 3 && "text-xl"
          )}
        >
          {title}
        </HeadingTag>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  )
}
