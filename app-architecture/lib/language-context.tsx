"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type Language = "zh" | "en"

const STORAGE_KEY = "app-architecture-language"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("zh")

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(STORAGE_KEY)
    if (savedLanguage === "zh" || savedLanguage === "en") {
      setLanguage(savedLanguage)
      return
    }

    const browserLanguage = navigator.language.toLowerCase()
    setLanguage(browserLanguage.startsWith("zh") ? "zh" : "en")
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language)
    document.documentElement.lang = language
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
