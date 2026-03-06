"use client"

import { DocHeader } from "@/components/doc-header"
import { SidebarNav } from "@/components/sidebar-nav"
import Link from "next/link"
import { pages } from "@/lib/pages-config"
import { ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

export default function Page() {
  const { language } = useLanguage()
  const chapters = pages.filter((p) => p.href !== "/")

  return (
    <div className="min-h-screen bg-background">
      <DocHeader />
      
      <div className="container mx-auto max-w-7xl">
        <div className="flex gap-8">
          <aside className="hidden w-64 flex-shrink-0 border-r py-8 pl-6 lg:block">
            <SidebarNav />
          </aside>
          
          <main className="min-w-0 flex-1 px-6 py-8">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{translations.home.title[language]}</h1>
                <p className="mt-2 text-muted-foreground">{translations.home.subtitle[language]}</p>
              </div>

              <div className="grid gap-4">
              {chapters.map((page, index) => {
                const pageTranslations = translations.pages[page.href as keyof typeof translations.pages]
                const chapterKey = index < 4 ? `chapter${index + 1}` : "appendix"
                return (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="group relative flex items-center gap-4 rounded-lg border bg-card p-5 transition-all hover:border-primary hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-accent font-mono text-sm font-semibold text-foreground">
                      {index < 4 ? `0${index + 1}` : "A"}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {translations.chapters[chapterKey as keyof typeof translations.chapters][language]}
                      </div>
                      <div className="font-semibold text-foreground group-hover:text-primary">
                        {pageTranslations?.title[language] || page.title}
                      </div>
                      {pageTranslations?.subtitle && (
                        <div className="text-sm text-muted-foreground">
                          {pageTranslations.subtitle[language]}
                        </div>
                      )}
                    </div>

                    <ChevronRight className="h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </Link>
                )
              })}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
