import { DocHeader } from "@/components/doc-header"
import { SidebarNav } from "@/components/sidebar-nav"
import { ReactNode } from "react"

interface DocLayoutProps {
  children: ReactNode
}

export function DocLayout({ children }: DocLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <DocHeader />

      <div className="container mx-auto max-w-7xl">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="hidden w-64 flex-shrink-0 border-r py-8 pl-6 lg:block">
            <SidebarNav />
          </aside>

          {/* Main Content */}
          <main className="min-w-0 flex-1 px-6 py-8">{children}</main>
        </div>
      </div>
    </div>
  )
}
