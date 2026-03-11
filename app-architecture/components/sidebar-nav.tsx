"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { pages } from "@/lib/pages-config"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

export function SidebarNav() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const chapters = pages.filter((p) => p.href !== "/")

  return (
    <nav className="sticky top-6 space-y-1">
      {chapters.map((page, index) => {
        const pageTranslations = translations.pages[page.href as keyof typeof translations.pages]
        const chapterKey = index < 4 ? `chapter${index + 1}` : "appendix"
        
        const isActive = pathname === page.href || pathname?.startsWith(`${page.href}/`)
        
        return (
          <Link
            key={page.href}
            href={page.href}
            className={cn(
              "flex items-start gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              isActive
                ? "bg-accent text-foreground font-medium"
                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
            )}
          >
            <span
              className={cn(
                "mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded font-mono text-xs",
                isActive ? "bg-primary text-primary-foreground" : "bg-muted"
              )}
            >
              {index < 4 ? index + 1 : "A"}
            </span>
            <div className="flex-1 space-y-0.5">
              <div className="text-xs uppercase tracking-wider opacity-60">
                {translations.chapters[chapterKey as keyof typeof translations.chapters][language]}
              </div>
              <div className="font-medium leading-tight">
                {pageTranslations?.title[language] || page.title}
              </div>
            </div>
          </Link>
        )
      })}
    </nav>
  )
}
