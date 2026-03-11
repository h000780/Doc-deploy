"use client"

import { useLanguage } from "@/lib/language-context"

interface I18nTextProps {
  zh: string
  en: string
}

export function I18nText({ zh, en }: I18nTextProps) {
  const { language } = useLanguage()
  return <>{language === "zh" ? zh : en}</>
}
