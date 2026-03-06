"use client"

import { DocLayout } from "@/components/doc-layout"
import { DocSection } from "@/components/doc-section"
import { Callout } from "@/components/callout"
import { CodeBlock } from "@/components/code-block"
import { Diagram } from "@/components/diagram"
import { PageNavigation } from "@/components/page-navigation"
import { getPageNav } from "@/lib/pages-config"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export default function Chapter2Page() {
  const nav = getPageNav("/chapter-2")
  const { language } = useLanguage()
  const t = (zh: string, en: string) => (language === "zh" ? zh : en)

  return (
    <DocLayout>
      <div className="space-y-12">
          {/* Chapter Title */}
          <div className="space-y-3">
            <div className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              {t("第二章", "Chapter II")}
            </div>
            <h1 className="text-pretty text-4xl font-bold tracking-tight">
              {t("记录设计", "Records Architecture")}
            </h1>
            <p className="text-xl text-muted-foreground">{t("Records 设计", "Records Design")}</p>
          </div>

          <p className="text-pretty leading-relaxed text-muted-foreground">
            {t(
              "本章节涵盖 records 与 app_record_counters 的联合设计，负责记录数据存储、索引策略与编号分配。",
              "This chapter covers the joint design of records and app_record_counters, including storage, indexing strategy, and record number allocation.",
            )}
          </p>

          {/* 2.1 */}
          <DocSection id="storage-model" title={t("2.1 存储模型", "2.1 Storage Model")} subtitle="Storage Model" level={2}>
            <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
              <li>
                <strong className="text-foreground">Core Tables</strong>:{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">records</code> +{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">app_record_counters</code>{t("。", ".")}
              </li>
              <li>
                <strong className="text-foreground">Data Payload</strong>:{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">values</code>{" "}
                (JSONB){t("，以", ", with")}{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">fld_xxxxx</code>{" "}
                {t("作为稳定 Key。", "as the stable key.")}
              </li>
              <li>
                <strong className="text-foreground">Business Numbering</strong>:{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">record_number</code>{" "}
                {t("在同一", "monotonically increments within the same")} <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">app_id</code>{" "}
                {t("内单调递增，并由数据库触发器统一分配。", "and is centrally allocated by database triggers.")}
              </li>
              <li>
                <strong className="text-foreground">Uniqueness Guard</strong>:{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                  UNIQUE(app_id, record_number)
                </code>{" "}
                {t("作为最终兜底，阻止重复号落库。", "acts as final protection to prevent duplicate numbers from being persisted.")}
              </li>
            </ul>

            <Callout type="note" title={t("注", "Note")}>
              {t("完整的 ER 图请参考", "For the complete ER diagram, see")}{" "}
              <Link href="/appendix#appendix-a-1" className="text-primary underline underline-offset-4">
                Appendix A: Database Schema Definition
              </Link>
              {t("。", ".")}
            </Callout>

            <Callout type="note" title={t("注", "Note")}>
              {t("records 全字段定义与发号函数/触发器，请参考", "For full records fields, number allocation function, and triggers, see")}{" "}
              <Link href="/appendix#appendix-a-2" className="text-primary underline underline-offset-4">
                Appendix A.2
              </Link>{" "}
              {t("与", "and")}{" "}
              <Link href="/appendix#appendix-a-4" className="text-primary underline underline-offset-4">
                Appendix A.4
              </Link>
              {t("。JSON payload 示例请参考", ". For JSON payload examples, see")}{" "}
              <Link href="/appendix#appendix-b-4" className="text-primary underline underline-offset-4">
                Appendix B.4: Record Values
              </Link>
              {t("。", ".")}
            </Callout>
          </DocSection>

          {/* 2.2 */}
          <DocSection
            id="io-translation"
            title={t("2.2 读写转换与校验", "2.2 IO Translation and Validation")}
            subtitle="IO Translation & Validation"
            level={2}
          >
            <p className="leading-relaxed text-muted-foreground">
              {t("为了在后端物理层保持稳定的", "To keep stable")}{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">fld_xxxxx</code>{" "}
              ID{t("，同时在前端逻辑层提供语义化的", ", while providing semantic")}{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">fieldCode</code>{" "}
              {t("体验，系统采用", "experience at frontend logic layer, the system adopts")} <strong>{t('"双层网关 (Dual-Gateway)"', '"Dual-Gateway"')}</strong> {t("架构，并配合", "architecture with")}{" "}
              <strong>{t("请求级上下文 (Request-Scoped Context)", "Request-Scoped Context")}</strong> {t("进行高效转换。", "for efficient translation.")}
            </p>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">{t("核心架构 (Core Architecture)", "Core Architecture")}</h4>

              <ol className="ml-6 space-y-4 text-muted-foreground">
                <li className="leading-relaxed">
                  <strong className="text-foreground">{t("Context (上下文)", "Context")}</strong>:{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                    AsyncLocalStorage (CLS)
                  </code>
                  <ul className="ml-6 mt-2 list-disc space-y-1">
                    <li>
                      <strong>Single Source of Truth</strong>: {t("在 Middleware 层一次性解析 App Schema，构建", "Parse App Schema once in middleware and build")}{" "}
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                        Field Map
                      </code>{" "}
                      {t("(Code ↔ ID) 并挂载到请求上下文中。", "(Code ↔ ID) then attach it to request context.")}
                    </li>
                    <li>
                      <strong>Performance</strong>: {t("确保每个请求只解析一次 Schema (", "Ensure schema is parsed only once per request (")}
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">O(1)</code> per
                      request){t("，Pipe 和 Interceptor 直接从 Context 读取映射，无需重复计算。", ", so Pipe and Interceptor read mappings from context without recomputation.")}
                    </li>
                    <li>
                      <strong>Tip</strong>: {t("在 Service 层或任何需要多次查询 Field 对应关系的场景中，", "In service layer or any scenario requiring repeated field lookups,")}<strong>{t("必须", "must")}</strong> {t("优先从", "prefer")}{" "}
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                        CLS Context
                      </code>{" "}
                      {t("获取，严禁重复调用解析逻辑。", "instead of repeatedly invoking parse logic.")}
                    </li>
                  </ul>
                </li>

                <li className="leading-relaxed">
                  <strong className="text-foreground">{t("Input Gateway (写链路)", "Input Gateway")}</strong>:{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                    ValidationPipe
                  </code>
                  <ul className="ml-6 mt-2 list-disc space-y-1">
                    <li>
                      <strong>Translate (Code → ID)</strong>: {t("在请求进入 Controller 之前，利用 Context 将 payload 中的", "Before request enters controller, use context to translate payload")}{" "}
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">fieldCode</code>{" "}
                      {t("为", "into")} <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">fld_id</code>{t("。", ".")}
                    </li>
                    <li>
                      <strong>Validate</strong>: {t("基于 Schema 对输入数据进行严格校验 (Zod)，确保写入 JSONB 的数据类型安全。", "Perform strict schema-based validation (Zod) to keep JSONB writes type-safe.")}
                    </li>
                  </ul>
                </li>

                <li className="leading-relaxed">
                  <strong className="text-foreground">{t("Output Gateway (读链路)", "Output Gateway")}</strong>:{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                    TransformInterceptor
                  </code>
                  <ul className="ml-6 mt-2 list-disc space-y-1">
                    <li>
                      <strong>Translate (ID → Code)</strong>:
                      {t("在响应返回给前端之前，利用 Context 将 DB 中的", "Before response returns to frontend, use context to translate DB")}{" "}
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">fld_id</code>{" "}
                      {t("为", "back to")}{" "}
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">fieldCode</code>
                      {t("。", ".")}
                    </li>
                    <li>
                      <strong>{t("Sanitize (净化)", "Sanitize")}</strong>: {t("采用", "Use")}<strong>{t("白名单机制", "allowlist mechanism")}</strong>{t("，剔除 Schema 中不存在的残留字段 (", " to remove residual fields not in schema (")}
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                        fld_orphan
                      </code>
                      ){t('，彻底杜绝"僵尸数据"泄露。', '), fully preventing "zombie data" leakage.')}
                    </li>
                  </ul>
                </li>
              </ol>
            </div>

            <Diagram
              title={t("请求生命周期序列图", "Request Lifecycle Sequence")}
              description={t("展示从客户端请求到数据库操作的完整转换流程", "Shows the full transformation flow from client request to database operation")}
            >
              {`sequenceDiagram
    autonumber
    participant C as 💻 Client
    participant M as 🛡️ Middleware
    participant P as 🔌 Pipe (In)
    participant S as ⚙️ Service
    participant I as 🧹 Interceptor (Out)
    participant D as 💾 Database

    Note over C, D: Request Lifecycle

    C->>M: Request { title: 'Hello' }
    activate M
    M->>M: Parse Schema -> Context
    note right of M: Context: { 'title': 'fld_a1' }
    M->>P: Next()
    deactivate M

    activate P
    P->>P: Read Context & Translate
    P->>S: DTO { fld_a1: 'Hello' }
    deactivate P

    activate S
    S->>D: INSERT / UPDATE
    D-->>S: Raw Record { fld_a1: 'Hello', fld_del: 'Old' }
    S-->>I: Return Entity
    deactivate S

    activate I
    I->>I: Read Context
    I->>I: Filter 'fld_del' (Orphan)
    I->>I: Translate 'fld_a1' -> 'title'
    I-->>C: Response { title: 'Hello' }
    deactivate I`}
            </Diagram>

            <div className="space-y-4">
              <h4 className="text-base font-semibold">{t("实现细节 (Implementation Details)", "Implementation Details")}</h4>

              <ul className="ml-6 space-y-3 text-muted-foreground">
                <li className="leading-relaxed">
                  <strong className="text-foreground">Input Pipe (ValidationPipe)</strong>:
                  <ul className="ml-6 mt-1 list-disc space-y-1">
                    <li>
                      {t("负责", "Responsible for")}<strong>{t("写入前", "pre-write")}</strong>{t("的清洗。", " sanitization.")}
                    </li>
                    <li>
                      {t("此时 DB 中尚无数据，纯粹是基于 Schema 的映射。如果不符合 Schema，Pipe 层直接拦截。", "At this stage no DB data is involved; it is purely schema-based mapping. If input does not match schema, Pipe blocks it directly.")}
                    </li>
                  </ul>
                </li>

                <li className="leading-relaxed">
                  <strong className="text-foreground">Output Interceptor</strong>:
                  <ul className="ml-6 mt-1 list-disc space-y-1">
                    <li>
                      {t("负责", "Responsible for")}<strong>{t("读取后", "post-read")}</strong>{t("净化。", " sanitization.")}
                    </li>
                    <li>
                      <strong>{t("关键逻辑", "Key logic")}</strong>: {t("遍历 DB 返回的 Raw Data，尝试在 Context 中查找", "Traverse raw data returned by DB and look up in context")}{" "}
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">fld_id</code>{" "}
                      {t("对应的", "for corresponding")}{" "}
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">fieldCode</code>
                      {t("。", ".")}
                    </li>
                    <li>
                      <strong>Orphan Handling</strong>: {t("如果找不到对应的 Code（说明该字段已被删除），则直接忽略该键值对，确保它不会出现在最终响应中。", "If no corresponding code is found (field deleted), ignore the key-value pair to ensure it does not appear in final response.")}
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </DocSection>

          {/* 2.3 */}
          <DocSection id="indexing" title={t("2.3 索引策略", "2.3 Index Strategy")} subtitle="Indexing" level={2}>
            <p className="leading-relaxed text-muted-foreground">
              {t("为了覆盖应用隔离、JSONB 查询、全文搜索与访问控制，", "To cover app isolation, JSONB queries, full-text search, and access control,")}{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">records</code>{" "}
              {t("表需要组合索引，而不只是单一的 JSONB GIN：", "table requires combined indexes rather than a single JSONB GIN index:")}
            </p>

            <CodeBlock
              language="sql"
              code={`CREATE INDEX IF NOT EXISTS records_app_id_idx
ON records(app_id);

CREATE INDEX IF NOT EXISTS records_values_gin_idx
ON records USING GIN(values);

CREATE INDEX IF NOT EXISTS idx_records_access
ON records(app_id, created_by);

CREATE INDEX IF NOT EXISTS idx_records_org_unit
ON records(app_id, org_unit_id);

CREATE INDEX IF NOT EXISTS records_deleted_at_idx
ON records(deleted_at);

-- Full-text index can be built after converting search column to generated column
CREATE INDEX IF NOT EXISTS idx_records_search_text
ON records USING GIN(search_text gin_bigm_ops);

-- Final uniqueness constraint for record_number
CREATE UNIQUE INDEX IF NOT EXISTS records_app_record_unique_idx
ON records(app_id, record_number);`}
            />
          </DocSection>

          {/* 2.4 */}
          <DocSection id="record-numbering" title={t("2.4 Record Number 分配机制", "2.4 Record Number Allocation")} subtitle="Allocation Strategy" level={2}>
            <p className="leading-relaxed text-muted-foreground">
              {t("采用", "Use")} <strong>{t("（独立计数器表）", "(independent counter table)")}</strong>{t("：通过", ": through")}{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">next_app_record_number(app_id)</code>{" "}
              + <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">BEFORE INSERT</code>{" "}
              {t("触发器统一发号，应用层默认不传", "trigger for centralized number allocation; app layer does not pass")}{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">record_number</code>{t("。", " by default.")}
            </p>

            <CodeBlock
              language="sql"
              code={`-- Application-layer record creation (without record_number)
INSERT INTO records (app_id, "values", created_at, created_via)
VALUES ($1, $2::jsonb, now(), 'user')
RETURNING *;`}
            />

            <ol className="ml-6 list-decimal space-y-2 text-muted-foreground">
              <li>
                {t("触发器优先检查", "Trigger first checks whether")} <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">NEW.record_number</code>{" "}
                {t("是否为空；为空则调用发号函数。", "is empty; if empty, it calls allocation function.")}
              </li>
              <li>
                {t("发号函数通过", "Allocation function atomically increments the same app counter row via")}{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">INSERT ... ON CONFLICT DO UPDATE</code>{" "}
                {t("原子递增同一 app 的计数行。", ".")}
              </li>
              <li>
                {t("同一", "Concurrent writes under the same")} <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">app_id</code>{" "}
                {t("的并发写入由行锁串行化，不同 app 互不影响。", "are serialized by row lock; different apps are isolated.")}
              </li>
              <li>
                {t("导入场景允许显式传入", "Import scenarios can explicitly pass")}{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">record_number</code>，
                {t("同时同步提升 counter，避免后续回退冲突。", "while also lifting counter accordingly to prevent later rollback conflicts.")}
              </li>
            </ol>

            <Callout type="note" title={t("实现细节", "Implementation Details")}>
              {t("发号函数、触发器 SQL 以及行为矩阵见", "For allocation function, trigger SQL, and behavior matrix, see")}{" "}
              <Link href="/appendix#appendix-a-4" className="text-primary underline underline-offset-4">
                Appendix A.4
              </Link>
              {t("。", ".")}
            </Callout>
          </DocSection>

        <PageNavigation prev={nav.prev} next={nav.next} />
      </div>
    </DocLayout>
  )
}
