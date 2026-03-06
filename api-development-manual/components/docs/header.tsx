"use client"

import { useLanguage, type Language } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Search, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeaderProps {
  isMobileMenuOpen: boolean
  onMobileMenuToggle: () => void
}

export function Header({ isMobileMenuOpen, onMobileMenuToggle }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "zh" ? "ja" : "zh")
  }

  return (
    <header className="h-16 bg-sidebar border-b border-sidebar-border flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden text-sidebar-foreground"
          onClick={onMobileMenuToggle}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">E</span>
          </div>
          <div>
            <h1 className="text-sidebar-foreground font-semibold text-lg leading-tight">
              {t("header.title")}
            </h1>
            <p className="text-sidebar-foreground/60 text-xs">
              {t("header.subtitle")}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center bg-sidebar-accent rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-sidebar-foreground/50 mr-2" />
          <input
            type="text"
            placeholder={t("header.search")}
            className="bg-transparent text-sm text-sidebar-foreground placeholder:text-sidebar-foreground/50 focus:outline-none w-48"
          />
          <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-sidebar-border bg-sidebar px-1.5 font-mono text-[10px] font-medium text-sidebar-foreground/50">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={toggleLanguage}
          className={cn(
            "min-w-[100px] border-sidebar-border bg-sidebar-accent text-sidebar-foreground",
            "hover:bg-sidebar-primary hover:text-sidebar-primary-foreground transition-all"
          )}
        >
          {language === "zh" ? "日本語" : "中文"}
        </Button>
      </div>
    </header>
  )
}
