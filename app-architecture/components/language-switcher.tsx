"use client"

import { useLanguage, type Language } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { translations } from "@/lib/translations"

const languages: Language[] = ["zh", "en"]

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="inline-flex items-center gap-1 rounded-lg border bg-background p-1">
      {languages.map((code) => (
        <Button
          key={code}
          type="button"
          size="sm"
          variant={language === code ? "default" : "ghost"}
          className="h-8 px-3 text-xs"
          onClick={() => setLanguage(code)}
        >
          {translations.languageSwitcher[code].short}
        </Button>
      ))}
    </div>
  )
}
