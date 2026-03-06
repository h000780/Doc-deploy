import { DocLayout } from "@/components/doc-layout"
import { Appendices } from "@/components/appendices"
import { PageNavigation } from "@/components/page-navigation"
import { getPageNav } from "@/lib/pages-config"
import { I18nText } from "@/components/i18n-text"

export default function AppendixPage() {
  const nav = getPageNav("/appendix")

  return (
    <DocLayout>
      <div className="space-y-12">
        {/* Chapter Title */}
        <div className="space-y-3">
          <div className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            <I18nText zh="附录" en="Appendices" />
          </div>
          <h1 className="text-pretty text-4xl font-bold tracking-tight">
            <I18nText zh="数据库架构与数据结构" en="Database Schema & Data Structures" />
          </h1>
          <p className="text-xl text-muted-foreground">
            <I18nText zh="完整参考" en="Complete Reference" />
          </p>
        </div>

        <Appendices />

        <PageNavigation prev={nav.prev} next={nav.next} />
      </div>
    </DocLayout>
  )
}
