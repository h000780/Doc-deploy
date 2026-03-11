"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Home } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

interface PageNavigationProps {
  prev?: { title: string; href: string }
  next?: { title: string; href: string }
}

export function PageNavigation({ prev, next }: PageNavigationProps) {
  const { language } = useLanguage()
  const getLocalizedTitle = (page?: { title: string; href: string }) => {
    if (!page) return ""
    const pageTranslations = translations.pages[page.href as keyof typeof translations.pages]
    return pageTranslations?.title?.[language] ?? page.title
  }

  return (
    <div className="mt-16 border-t pt-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          {prev && (
            <Link href={prev.href}>
              <Button variant="outline" className="group h-auto flex-col items-start gap-1 py-3 bg-transparent">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ChevronLeft className="h-3 w-3" />
                  <span>{translations.navigation.previous[language]}</span>
                </div>
                <span className="text-sm font-medium group-hover:text-primary">{getLocalizedTitle(prev)}</span>
              </Button>
            </Link>
          )}
        </div>

        <Link href="/">
          <Button variant="ghost" size="icon" title={translations.navigation.backToHome[language]}>
            <Home className="h-4 w-4" />
          </Button>
        </Link>

        <div className="flex flex-1 justify-end">
          {next && (
            <Link href={next.href}>
              <Button variant="outline" className="group h-auto flex-col items-end gap-1 py-3 bg-transparent">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{translations.navigation.next[language]}</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
                <span className="text-sm font-medium group-hover:text-primary">{getLocalizedTitle(next)}</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
