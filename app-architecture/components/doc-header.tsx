"use client"

import Link from "next/link"
import { FileText } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { LanguageSwitcher } from "@/components/language-switcher"

export function DocHeader() {
  const { language } = useLanguage()

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="rounded-lg bg-primary p-2">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <div className="font-semibold leading-tight">
              {translations.header.title[language]}
            </div>
            <div className="text-xs text-muted-foreground">
              {translations.header.subtitle[language]}
            </div>
          </div>
        </Link>
        <LanguageSwitcher />
      </div>
    </header>
  )
}
