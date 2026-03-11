import { DocLayout } from "@/components/doc-layout"
import { ChapterFour } from "@/components/chapter-four"
import { PageNavigation } from "@/components/page-navigation"
import { getPageNav } from "@/lib/pages-config"
import { I18nText } from "@/components/i18n-text"

export default function Chapter4Page() {
  const nav = getPageNav("/chapter-4")

  return (
    <DocLayout>
      <div className="space-y-12">
        {/* Chapter Title */}
        <div className="space-y-3">
          <div className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            <I18nText zh="第四章" en="Chapter IV" />
          </div>
          <h1 className="text-pretty text-4xl font-bold tracking-tight">
            <I18nText zh="进阶实现" en="Implementation Extensions" />
          </h1>
          <p className="text-xl text-muted-foreground">
            <I18nText zh="进阶主题" en="Advanced Topics" />
          </p>
        </div>

        <p className="text-pretty leading-relaxed text-muted-foreground">
          <I18nText
            zh='本章节记录了落地实施中需要关注的进阶特性，属于“Future-Proofing”范畴。'
            en='This chapter covers implementation-level advanced features for future-proofing.'
          />
        </p>

        <ChapterFour />

        <PageNavigation prev={nav.prev} next={nav.next} />
      </div>
    </DocLayout>
  )
}
