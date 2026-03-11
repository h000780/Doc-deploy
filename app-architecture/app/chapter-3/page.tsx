import { DocLayout } from "@/components/doc-layout"
import { ChapterThree } from "@/components/chapter-three"
import { PageNavigation } from "@/components/page-navigation"
import { getPageNav } from "@/lib/pages-config"
import { I18nText } from "@/components/i18n-text"

export default function Chapter3Page() {
  const nav = getPageNav("/chapter-3")

  return (
    <DocLayout>
      <div className="space-y-12">
        {/* Chapter Title */}
        <div className="space-y-3">
          <div className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            <I18nText zh="第三章" en="Chapter III" />
          </div>
          <h1 className="text-pretty text-4xl font-bold tracking-tight">
            <I18nText zh="生命周期与一致性分析" en="Lifecycle & Consistency Analysis" />
          </h1>
          <p className="text-xl text-muted-foreground">
            <I18nText zh="生命周期与一致性" en="Lifecycle & Consistency" />
          </p>
        </div>

        <p className="text-pretty leading-relaxed text-muted-foreground">
          <I18nText
            zh="本章节汇总了系统在面对“删除”与“变更”时的一致性策略。"
            en='This chapter summarizes the system-wide consistency strategy for deletion and change scenarios.'
          />
        </p>

        <ChapterThree />

        <PageNavigation prev={nav.prev} next={nav.next} />
      </div>
    </DocLayout>
  )
}
