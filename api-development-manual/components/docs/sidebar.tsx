"use client"

import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import {
  BookOpen,
  Layers,
  Link2,
  Server,
  Settings,
  FileCode,
  AlertCircle,
  GitCompare,
  Code2,
  CheckCircle,
  History,
  FileText,
  ChevronRight,
} from "lucide-react"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const { t } = useLanguage()

  const navItems = [
    { id: "overview", icon: BookOpen, label: t("nav.overview") },
    { id: "core-principles", icon: Layers, label: t("nav.core-principles") },
    { id: "url-naming", icon: Link2, label: t("nav.url-naming") },
    { id: "http-methods", icon: Server, label: t("nav.http-methods") },
    { id: "parameter-passing", icon: Settings, label: t("nav.parameter-passing") },
    { id: "special-patterns", icon: FileCode, label: t("nav.special-patterns") },
    { id: "pagination", icon: FileText, label: t("nav.pagination") },
    { id: "error-handling", icon: AlertCircle, label: t("nav.error-handling") },
    { id: "private-vs-public", icon: GitCompare, label: t("nav.private-vs-public") },
    { id: "nestjs-implementation", icon: Code2, label: t("nav.nestjs-implementation") },
    { id: "best-practices", icon: CheckCircle, label: t("nav.best-practices") },
    { id: "version-management", icon: History, label: t("nav.version-management") },
    { id: "examples", icon: FileCode, label: t("nav.examples") },
    { id: "appendix", icon: BookOpen, label: t("nav.appendix") },
  ]

  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border overflow-y-auto flex-shrink-0">
      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
              {isActive && (
                <ChevronRight className="w-4 h-4 ml-auto flex-shrink-0" />
              )}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
