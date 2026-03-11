"use client"

import { DocLayout } from "@/components/doc-layout"
import { DocSection } from "@/components/doc-section"
import { Callout } from "@/components/callout"
import { CodeBlock } from "@/components/code-block"
import { DataTable } from "@/components/data-table"
import { Diagram } from "@/components/diagram"
import { Badge } from "@/components/ui/badge"
import { PageNavigation } from "@/components/page-navigation"
import { getPageNav } from "@/lib/pages-config"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export default function Chapter1() {
  const nav = getPageNav("/chapter-1")
  const { language } = useLanguage()
  const t = (zh: string, en: string) => (language === "zh" ? zh : en)

  return (
    <DocLayout>
      <div className="space-y-12">
          {/* Chapter Title */}
          <div className="space-y-3">
            <div className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              {t("第一章", "Chapter I")}
            </div>
            <h1 className="text-pretty text-4xl font-bold tracking-tight">
              {t("应用设计", "Apps Architecture")}
            </h1>
            <p className="text-xl text-muted-foreground">{t("Apps 设计", "Apps Design")}</p>
          </div>

          <p className="text-pretty leading-relaxed text-muted-foreground">
            {t(
              "本章节仅聚焦 apps 相关设计（应用元数据、字段模型、默认布局、索引与校验）。记录数据与编号方案集中在第二章。",
              "This chapter focuses on apps design only, including metadata, field models, default layouts, indexing, and validation. Record data and numbering strategy are covered in Chapter II.",
            )}
          </p>

          {/* 1.1 */}
          <DocSection
            id="unified-core"
            title={t("1.1 apps 表设计（补全）", "1.1 Apps Table Design (Completed)")}
            subtitle="Apps Table Design"
            level={2}
          >
            <p className="leading-relaxed text-muted-foreground">
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">apps</code>{" "}
              {t("负责存储应用基础信息、字段模型（", "stores app metadata, field models (")}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">fields</code>
              {t("）和默认布局（", ") and default layout (")}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">view_config</code>
              {t("）。", ").")}
            </p>

            <DataTable
              headers={["Column", "Type", "Not Null", "Default", "Constraints", "Description"]}
              rows={[
                [
                  <code key="col" className="text-xs">id</code>,
                  <code key="type" className="text-xs">uuid</code>,
                  "Yes",
                  <code key="default" className="text-xs">uuidv7()</code>,
                  <code key="constraint" className="text-xs">PRIMARY KEY</code>,
                  t("应用内部唯一主键。", "Internal unique app primary key."),
                ],
                [
                  <code key="col" className="text-xs">appId</code>,
                  <code key="type" className="text-xs">serial</code>,
                  "Yes",
                  "-",
                  <code key="constraint" className="text-xs">UNIQUE</code>,
                  t("用户可见应用编号（URL 参数）。", "User-visible app number (URL parameter)."),
                ],
                [
                  <code key="col" className="text-xs">name</code>,
                  <code key="type" className="text-xs">text</code>,
                  "Yes",
                  <code key="default" className="text-xs">'Untitled App'</code>,
                  "-",
                  t("应用名称。", "App name."),
                ],
                [
                  <code key="col" className="text-xs">description</code>,
                  <code key="type" className="text-xs">text</code>,
                  "No",
                  <code key="default" className="text-xs">NULL</code>,
                  "-",
                  t("应用描述。", "App description."),
                ],
                [
                  <code key="col" className="text-xs">fields</code>,
                  <code key="type" className="text-xs">jsonb</code>,
                  "Yes",
                  <code key="default" className="text-xs">'[]'::jsonb</code>,
                  <code key="constraint" className="text-xs">GIN idx_app_fields_gin (optional)</code>,
                  t("字段模型定义。", "Field model definition."),
                ],
                [
                  <code key="col" className="text-xs">view_config</code>,
                  <code key="type" className="text-xs">jsonb</code>,
                  "Yes",
                  <code key="default" className="text-xs">{"'{\"layout\":[]}'::jsonb"}</code>,
                  <code key="constraint" className="text-xs">GIN idx_app_view_config_gin (optional)</code>,
                  t("默认布局配置。", "Default layout configuration."),
                ],
                [
                  <code key="col" className="text-xs">created_by</code>,
                  <code key="type" className="text-xs">uuid</code>,
                  "Yes",
                  "-",
                  <code key="constraint" className="text-xs">idx_app_created_by</code>,
                  t("创建人。", "Created by."),
                ],
                [
                  <code key="col" className="text-xs">created_at</code>,
                  <code key="type" className="text-xs">timestamptz</code>,
                  "Yes",
                  <code key="default" className="text-xs">now()</code>,
                  <code key="constraint" className="text-xs">idx_app_created_at_desc</code>,
                  t("创建时间。", "Created at."),
                ],
                [
                  <code key="col" className="text-xs">updated_by</code>,
                  <code key="type" className="text-xs">uuid</code>,
                  "No",
                  <code key="default" className="text-xs">NULL</code>,
                  "-",
                  t("更新人。", "Updated by."),
                ],
                [
                  <code key="col" className="text-xs">updated_at</code>,
                  <code key="type" className="text-xs">timestamptz</code>,
                  "No",
                  <code key="default" className="text-xs">NULL</code>,
                  <code key="constraint" className="text-xs">idx_app_updated_at_desc</code>,
                  t("更新时间。", "Updated at."),
                ],
                [
                  <code key="col" className="text-xs">deleted_by</code>,
                  <code key="type" className="text-xs">uuid</code>,
                  "No",
                  <code key="default" className="text-xs">NULL</code>,
                  "-",
                  t("删除人。", "Deleted by."),
                ],
                [
                  <code key="col" className="text-xs">deleted_at</code>,
                  <code key="type" className="text-xs">timestamptz</code>,
                  "No",
                  <code key="default" className="text-xs">NULL</code>,
                  <code key="constraint" className="text-xs">idx_app_deleted_at (partial)</code>,
                  t("软删除时间。", "Soft deletion time."),
                ],
                [
                  <code key="col" className="text-xs">version</code>,
                  <code key="type" className="text-xs">integer</code>,
                  "Yes",
                  <code key="default" className="text-xs">1</code>,
                  "-",
                  t("乐观锁版本。", "Optimistic lock version."),
                ],
              ]}
            />

            <CodeBlock
              language="json"
              filename="apps sample row"
              code={`{
  "id": "018f3a8a-1b23-7c9d-8e5f-12a34b56c789",
  "appId": 1001,
  "name": "app",
  "description": "app description",
  "fields": [],
  "view_config": { "layout": [] },
  "created_by": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "created_at": "2024-03-20T10:30:45+08:00",
  "updated_by": null,
  "updated_at": null,
  "deleted_by": null,
  "deleted_at": null,
  "version": 1
}`}
            />

            <div className="space-y-4">
              <p className="leading-relaxed text-muted-foreground">
                {t("关键索引与策略：", "Key indexes and policies:")}
              </p>

              <DataTable
                headers={[t("对象", "Object"), t("策略 / 索引", "Policy / Index"), t("说明", "Description")]}
                rows={[
                  [
                    <code key="obj" className="text-xs">apps.created_by</code>,
                    <code key="idx" className="text-xs">idx_app_created_by</code>,
                    t("高频“我的应用”查询。", "High-frequency 'my apps' query."),
                  ],
                  [
                    <code key="obj" className="text-xs">apps.created_at</code>,
                    <code key="idx" className="text-xs">idx_app_created_at_desc</code>,
                    t("按创建时间倒序列表。", "Descending list by creation time."),
                  ],
                  [
                    <code key="obj" className="text-xs">apps.updated_at</code>,
                    <code key="idx" className="text-xs">idx_app_updated_at_desc</code>,
                    t("审计与最近更新时间排序。", "Audit and latest-updated-time sorting."),
                  ],
                  [
                    <code key="obj" className="text-xs">apps.deleted_at</code>,
                    <code key="idx" className="text-xs">idx_app_deleted_at (partial)</code>,
                    t("软删除过滤优化。", "Soft-delete filter optimization."),
                  ],
                  [
                    <code key="obj" className="text-xs">apps.select policy</code>,
                    <code key="idx" className="text-xs">show_deleted_apps session flag</code>,
                    t("默认不显示软删除，按会话开关显示。", "Hide soft-deleted by default; show via session flag."),
                  ],
                ]}
              />

              <Callout type="note" title={t("注", "Note")}>
                {t("完整的 `apps` 字段与索引定义见", "For the complete `apps` fields and index definitions, see")}{" "}
                <Link href="/appendix#appendix-a-2" className="text-primary underline underline-offset-4">
                  Appendix A.2
                </Link>{" "}
                {t("与", "and")}{" "}
                <Link href="/appendix#appendix-a-3" className="text-primary underline underline-offset-4">
                  Appendix A.3
                </Link>
                {t("。", ".")}
              </Callout>
            </div>
          </DocSection>

          {/* 1.2 */}
          <DocSection
            id="field-view-sync"
            title={t("1.2 字段定义与视图同步", "1.2 Field Definition and View Sync")}
            subtitle="Field & View Sync"
            level={2}
          >
            <Callout type="note" title={t("注", "Note")}>
              {t("详细的", "For detailed")}{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">apps.fields</code>{" "}
              {t("JSON 结构与字段属性列表，请参考", "JSON structure and field attributes, see")}{" "}
              <Link href="/appendix#appendix-b-1" className="text-primary underline underline-offset-4">
                Appendix B.1: Field Definition Specification
              </Link>
              {t("。", ".")}
            </Callout>

            <Callout type="note" title={t("注", "Note")}>
              {t("详细的", "For detailed")}{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                apps.view_config
              </code>{" "}
              {t("(Default View) JSON 结构，请参考", "(Default View) JSON structure, see")}{" "}
              <Link href="/appendix#appendix-b-2" className="text-primary underline underline-offset-4">
                Appendix B.2: Default View Configuration
              </Link>
              {t("。", ".")}
            </Callout>

            <div className="space-y-3 rounded-lg bg-muted/30 p-6">
              <h4 className="font-semibold">
                {t(
                  "apps.fields / view_config 校验要点（来自 apps-design）",
                  "apps.fields / view_config validation highlights (from apps-design)",
                )}
              </h4>
              <ul className="ml-6 list-disc space-y-1 text-sm text-muted-foreground">
                <li><strong>{t("type 枚举", "type enum")}</strong>: input / number / textarea / datepicker / timepicker / select / checkbox / radio / attachment / richtext / plate-richtext / table / lookup / user-select / divider / label / step-separator。</li>
                <li><strong>{t("Schema 约束", "Schema constraints")}</strong>: {t("仅 table 可含 fields；table 不允许 options；仅 select/radio/checkbox 允许 options。", "Only table can contain fields; table cannot contain options; only select/radio/checkbox can contain options.")}</li>
                <li><strong>{t("业务约束", "Business constraints")}</strong>: {t("code 格式", "code format")} <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">^[A-Za-z_][A-Za-z0-9_]*$</code>{t("，且顶层与子表列全局唯一。", ", and globally unique across top-level and subtable columns.")}</li>
                <li><strong>{t("不可变约束", "Immutability constraint")}</strong>: {t("同一 field id 的 type 不允许变更（子表列同样适用）。", "Type for the same field id cannot be changed (also applies to subtable columns).")}</li>
                <li><strong>{t("ID 规范化", "ID normalization")}</strong>: {t("缺失或非", "If id is missing or not prefixed with")} <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">fld_</code> {t("前缀，会在写入时重置为新 ID。", ", it is reset to a new ID on write.")}</li>
              </ul>
            </div>

            <p className="leading-relaxed text-muted-foreground">
              Schema (<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">fields</code>)
              {t("与 Default View (", " and Default View (")}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">view_config</code>)
              {t(" 之间严格遵循 ", " strictly follow ")}
              <strong>{t("单向同步 (One-Way Sync)", "One-Way Sync")}</strong>。
            </p>

            <Callout type="important" title={t("关键约束: 字段类型不可变 (Immutable Type)", "Key Constraint: Immutable Field Type")}>
              <p>
                {t("一旦字段被创建，其", "Once a field is created, its")}{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">type</code> {t("属性（如", "property (for example")}{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">text</code>,{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">number</code>）
                <strong>{t("永久不可变更", "is permanently immutable")}</strong>。
              </p>
              <ul className="ml-6 mt-2 list-disc space-y-1">
                <li>
                  {t("系统", "The system")}<strong>{t("不存在", "does not provide")}</strong> {t("Update Type 这一原子操作。", "an atomic Update Type operation.")}
                </li>
                <li>
                  {t("若用户需要“修改类型”，必须手动执行", "If users need to change type, they must manually perform")} <strong>Delete Old Field</strong> +{" "}
                  <strong>Create New Field</strong>。
                </li>
                <li>{t("因此，旧字段的数据会被视为删除（残留），新字段的数据为空。", "Therefore, old field data becomes residual, while the new field starts empty.")}</li>
              </ul>
            </Callout>

            <div className="space-y-2">
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Trigger</strong>: {t("任何对字段的增删改 (Schema Change)。", "Any field add/update/delete operation (Schema Change).")}
                </li>
                <li>
                  <strong className="text-foreground">Effect</strong>: {t("自动计算并更新视图配置 (View/Layout Update)。", "Automatically recalculate and update view config (View/Layout Update).")}
                </li>
                <li>
                  <strong className="text-foreground">Constraint</strong>: {t("视图层的修改（列宽、排序）", "View-level changes (column width, ordering)")}<strong>{t("绝不", "never")}</strong>{t("逆向影响 Schema。", " propagate back to Schema.")}
                </li>
              </ul>
            </div>

            <Diagram
              title={t("状态流转图 (Lifecycle State Machine)", "Lifecycle State Machine")}
              description={t("展示字段生命周期中，Schema 与 Default View 的所有状态变更逻辑", "Shows all schema and default view transitions through the field lifecycle")}
            >
              {`graph TD
    Schema["fields (SOURCE)<br/>App Schema"]:::source
    View["view_config (FOLLOWER)<br/>Default Layout"]:::target

    subgraph Actions [User Operations]
        direction LR
        ActAdd([Add Field]):::act
        ActDel([Delete Field]):::act
        ActRen([Rename Field]):::act
        ActLay([Resize / Order]):::act
    end

    ActAdd -->|"1. Insert Definition"| Schema
    Schema -->|"2. Sync: Auto-Append ID"| View

    ActDel -->|"1. Remove Definition"| Schema
    Schema -->|"2. Sync: Auto-Clean ID"| View

    ActRen -->|"1. Update Code"| Schema
    Schema -.->|"2. No Sync: ID Stable"| View

    ActLay -->|"1. Update Width/Order"| View

    View -.->|"❌ FORBIDDEN: One-Way Only"| Schema

    classDef source fill:#e0e7ff,stroke:#6366f1,stroke-width:2px
    classDef target fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    classDef act fill:#dbeafe,stroke:#3b82f6,stroke-width:1px`}
            </Diagram>

            <div className="space-y-3">
              <h4 className="text-base font-semibold">{t("详细变更矩阵", "Detailed Change Matrix")}</h4>
              <DataTable
                headers={[
                  t("用户操作", "User Action"),
                  "Schema Change (fields)",
                  "View Change (view_config)",
                  t("逻辑说明", "Explanation"),
                ]}
                rows={[
                  [
                    <Badge key="add" variant="secondary">
                      Add Field
                    </Badge>,
                    <code key="schema" className="text-xs">
                      Insert {`{ id: "fld_new" }`}
                    </code>,
                    <code key="view" className="text-xs">
                      Append {`{ id: "fld_new" }`}
                    </code>,
                    t("保证新建即显示，原子性更新。", "New fields appear immediately with atomic update."),
                  ],
                  [
                    <Badge key="del" variant="secondary">
                      Delete Field
                    </Badge>,
                    <code key="schema" className="text-xs">
                      Remove fld_old
                    </code>,
                    <code key="view" className="text-xs">
                      {t("Clean 移除 fld_old 引用", "Clean remove fld_old references")}
                    </code>,
                    t("防止视图报错，保持布局干净。", "Prevents view errors and keeps layout clean."),
                  ],
                  [
                    <Badge key="ren" variant="secondary">
                      Rename Field
                    </Badge>,
                    <code key="schema" className="text-xs">
                      Update code: &quot;name&quot;-&gt;&quot;title&quot;
                    </code>,
                    <code key="view" className="text-xs">
                      {t("No Change (存储的是 ID)", "No Change (stores ID)")}
                    </code>,
                    t("视图层只认 ID，自动显示新名称。无感更新。", "View layer relies on IDs only and shows new names automatically."),
                  ],
                  [
                    <Badge key="lay" variant="secondary">
                      Layout Change
                    </Badge>,
                    <code key="schema" className="text-xs">
                      No Change
                    </code>,
                    <code key="view" className="text-xs">
                      Update width / order
                    </code>,
                    t("仅影响表现层，完全隔离。", "Affects presentation layer only; fully isolated."),
                  ],
                ]}
              />
            </div>
          </DocSection>

          {/* 1.3 */}
          <DocSection
            id="specialized-views"
            title={t("1.3 专用视图策略", "1.3 Specialized View Strategy")}
            subtitle="Specialized Views"
            level={2}
          >
            <p className="leading-relaxed text-muted-foreground">
              {t("对于存储在", "For specialized views stored in")}{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">app_views</code>{" "}
              {t("中的日历、看板等专用视图，它们不需要包含所有字段，而是依赖特定的", "such as calendar and kanban, they do not require all fields; instead they depend on")}{" "}
              <strong>{t("关键字段 (Key Fields)", "Key Fields")}</strong> {t("配置。", "configuration.")}
            </p>

            <p className="leading-relaxed text-muted-foreground">
              <strong>{t("核心原则", "Core Principle")}</strong>: {t("所有的配置项必须存储", "All configuration items must store")}{" "}
              <strong>
                {t("Field ID (", "Field ID (")}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">fld_xxxxx</code>)
              </strong>
              {t("，严禁存储 Field Code。", "; Field Code must never be stored.")}
            </p>

            <DataTable
              headers={["View Type", t("Config 示例 (JSONB)", "Config Example (JSONB)"), t("依赖关系", "Dependency")]}
              rows={[
                [
                  <Badge key="cal" variant="outline">
                    Calendar
                  </Badge>,
                  <code key="config" className="text-xs">{`{ "startDateFieldId": "fld_a" }`}</code>,
                  t("强依赖特定的日期字段 ID。", "Hard dependency on a specific date field ID."),
                ],
                [
                  <Badge key="kan" variant="outline">
                    Kanban
                  </Badge>,
                  <code key="config" className="text-xs">{`{ "groupFieldId": "fld_s" }`}</code>,
                  t("强依赖分组字段 ID。", "Hard dependency on a grouping field ID."),
                ],
              ]}
            />

            <div className="space-y-3 rounded-lg bg-muted/30 p-6">
              <h4 className="font-semibold">{t("健壮性与恢复 (Robustness & Recovery)", "Robustness & Recovery")}</h4>
              <p className="text-sm text-muted-foreground">
                <strong>{t("提问", "Question")}</strong>: {t('如果用户删除了日历视图依赖的"开始时间"字段，会发生什么？', 'What happens if a user deletes the "start date" field required by calendar view?')}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>{t("回答", "Answer")}</strong>: {t("系统不会崩溃，只会降级。", "The system does not crash; it degrades gracefully.")}
              </p>
              <ul className="ml-6 list-disc space-y-1 text-sm text-muted-foreground">
                <li>
                  <strong>State</strong>: {t("View Config 指向了一个不存在的", "View Config points to a non-existent")}{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">fld_id</code>{t("。", ".")}
                </li>
                <li>
                  <strong>Behavior (Runtime)</strong>: {t("前端组件检测到关键配置丢失，显示", "Frontend component detects missing key config and shows")}{" "}
                  <strong>{t("“配置错误: 缺少日期字段”", '"Configuration Error: Missing Date Field"')}</strong> {t("的占位提示 (Fallback UI)。", "placeholder (Fallback UI).")}
                </li>
                <li>
                  <strong>Recovery (User Action)</strong>:
                  {t("用户进入视图设置，重新选择一个新的日期字段即可。", "User opens view settings and selects a new date field.")}
                </li>
              </ul>
              <p className="text-sm font-medium text-foreground">
                <strong>{t("结论", "Conclusion")}</strong>: {t("对于专用视图，", "For specialized views,")}<strong>{t("字段删除 = 配置失效", "field deletion = configuration invalidation")}</strong>
                {t("。这只是一个需用户手动修复的配置状态，而非系统故障。", ". This is a user-fixable configuration state, not a system failure.")}
              </p>
            </div>

            <Callout type="note" title={t("注", "Note")}>
              {t("各类视图的详细配置结构，请参考", "For detailed view configuration structures, see")}{" "}
              <Link href="/appendix#appendix-b-3" className="text-primary underline underline-offset-4">
                Appendix B.3: Specialized View Config
              </Link>
              {t("。", ".")}
            </Callout>
          </DocSection>

          {/* 1.4 */}
          <DocSection
            id="complex-components"
            title={t("1.4 复杂组件架构", "1.4 Complex Component Architecture")}
            subtitle="Complex Component Architecture"
            level={2}
          >
            <p className="leading-relaxed text-muted-foreground">
              {t("针对", "For")} <strong>{t("子表 (Subtable)", "Subtable")}</strong> {t("与", "and")} <strong>{t("分栏 (Splitter)", "Splitter")}</strong>{" "}
              {t("等复杂嵌套组件，系统采用“职责分离”的架构设计，确保灵活性与性能的平衡。", "and other complex nested components, the system uses separation-of-concerns architecture to balance flexibility and performance.")}
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="mb-3 text-base font-semibold">{t("1.4.1 子表模型 (Subtable Model)", "1.4.1 Subtable Model")}</h4>
                <ul className="ml-6 space-y-3 text-muted-foreground">
                  <li className="leading-relaxed">
                    <strong className="text-foreground">Schema</strong>: {t("在", "Defined in")}{" "}
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                      apps.fields
                    </code>{" "}
                    {t("中定义为", "as")}{" "}
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                      type: &apos;table&apos;
                    </code>
                    {t("，并通过嵌套的", ", with nested")}{" "}
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">fields</code>{" "}
                    {t("数组定义列。", "array for columns.")}
                    <br />
                    <em className="text-xs">
                      {t("优势: 物理上隔离了主表与子表的 Schema 定义，避免命名空间污染。", "Advantage: physically isolates main table and subtable schema definitions to avoid namespace pollution.")}
                    </em>
                  </li>
                  <li className="leading-relaxed">
                    <strong className="text-foreground">Layout</strong>: {t("Default View 中的", "In Default View, the")}{" "}
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">SUBTABLE</code>{" "}
                    {t("布局项仅通过 ID 引用表格字段，并在其", "layout item references table field by ID only, and defines")}{" "}
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">fields</code>{" "}
                    {t("数组中独立定义", "array with independent")}<strong>{t("可见列 (Visible Columns)", "visible columns")}</strong>{t("与顺序。", " and ordering.")}
                    <br />
                    <em className="text-xs">
                      {t("优势: 实现了 View 与 Schema 的解耦。用户可以随意调整表格列的显示顺序或隐藏某些列，而无需修改底层数据结构。", "Advantage: decouples view from schema. Users can reorder or hide columns without changing underlying data structure.")}
                    </em>
                  </li>
                  <li className="leading-relaxed">
                    <strong className="text-foreground">Data</strong>: {t("在", "Stored in")}{" "}
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                      records.values
                    </code>{" "}
                    {t("中存储为对象数组 (", "as an object array (")}
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                      Array&lt;Object&gt;
                    </code>
                    ){t("，并以表格字段 ID 为 Key。", ", keyed by table field ID.")}
                    <br />
                    <em className="text-xs">
                      {t("优势: 符合 NoSQL 的标准嵌套范式，查询高效且保证了 1:N 数据的原子性读写。", "Advantage: follows standard nested NoSQL pattern, enabling efficient queries and atomic read/write for 1:N data.")}
                    </em>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-3 text-base font-semibold">{t("1.4.2 分栏模型 (Splitter Model)", "1.4.2 Splitter Model")}</h4>
                <ul className="ml-6 space-y-2 text-muted-foreground">
                  <li className="leading-relaxed">
                    <strong className="text-foreground">Structure</strong>: {t("定义包含", "Defines")}{" "}
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">leftLines</code>{" "}
                    {t("和", "and")}{" "}
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                      rightLines
                    </code>
                    {t('，它们是包含字段的"行 (Lines)"数组。', ', both of which are arrays of "lines" that contain fields.')}
                  </li>
                  <li className="leading-relaxed">
                    <strong className="text-foreground">Consistency</strong>: {t("这种", "This")}{" "}
                    <strong>&quot;Layout → Splitter → Lines → Fields&quot;</strong>{" "}
                    {t("的类递归结构，有效地为分割线的每一侧创建了独立的布局容器 (", "recursive-like structure creates independent layout containers on each side of the splitter (")}
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                      Block Context
                    </code>
                    )。
                  </li>
                  <li className="leading-relaxed">
                    <strong className="text-foreground">Scalability</strong>:
                    {t("虽然当前设计严格限制容器内仅能存放字段，但这种嵌套结构为未来扩展（如 Splitter 嵌套 Splitter、嵌入图表）预留了架构空间。", "Although current design restricts containers to fields only, this nested structure reserves architectural space for future extensions (such as nested splitter and embedded charts).")}
                  </li>
                </ul>
              </div>
            </div>
          </DocSection>

        {nav && <PageNavigation prev={nav.prev} next={nav.next} />}
      </div>
    </DocLayout>
  )
}
