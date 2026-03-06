"use client"

import Link from "next/link"
import { DocSection } from "@/components/doc-section"
import { Diagram } from "@/components/diagram"
import { DataTable } from "@/components/data-table"
import { CodeBlock } from "@/components/code-block"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"

export function Appendices() {
  const { language } = useLanguage()
  const t = (zh: string, en: string) => (language === "zh" ? zh : en)
  const renamingRef = (
    <Link
      href="/chapter-3#strategy-renaming-resolution"
      className="ml-1 inline-flex -translate-y-1 align-super rounded border border-border bg-muted px-1 py-0 text-[10px] leading-none text-muted-foreground transition-colors hover:text-foreground"
    >
      {t("3.3", "3.3")}
    </Link>
  )

  return (
    <div className="space-y-12">
      {/* Appendix A */}
      <DocSection
        id="appendix-a"
        title="Appendix A: Database Schema Definition"
        level={1}
      >
        <div className="space-y-8">
          <div id="appendix-a-1" className="scroll-mt-20">
            <h3 className="mb-4 text-xl font-semibold">A.1 Entity-Relationship Diagram</h3>
            <Diagram title={t("ER 图（独立计数器表）", "ER Diagram (Independent Counter Table)")}>
              {`erDiagram
    APPS ||--o{ APP_VIEWS : "owns specialized views"
    APPS ||--o{ RECORDS : "contains data"
    APPS ||--|| APP_RECORD_COUNTERS : "owns one counter row"
    RECORDS }o--|| APP_RECORD_COUNTERS : "uses by app_id on insert"

    APPS {
        uuid id PK
        int appId "user-facing unique id"
        text name
        text description
        jsonb fields "Schema Definition (The Truth)"
        jsonb view_config "Default View Layout"
        uuid created_by
        timestamptz created_at
        uuid updated_by
        timestamptz updated_at
        uuid deleted_by
        timestamptz deleted_at "Soft Delete"
        int version
    }

    APP_VIEWS {
        uuid id PK
        uuid app_id FK
        jsonb config "Specialized Config"
    }

    RECORDS {
        uuid id PK
        uuid app_id "isolation key"
        int record_number "UNIQUE(app_id, record_number)"
        int version "optimistic lock version"
        jsonb values "Data Payload"
        text search_text "generated from values"
        uuid created_by
        text created_via
        uuid created_by_ref
        timestamptz created_at
        uuid org_unit_id
        timestamptz deleted_at
        uuid deleted_by
    }

    APP_RECORD_COUNTERS {
        uuid app_id PK
        int last_number "max allocated number"
        timestamptz updated_at
    }`}
            </Diagram>

            <p className="mt-3 text-sm text-muted-foreground">
              {t("说明：", "Note:")}<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">app_record_counters</code>{" "}
              {t("是按", "manages numbering space by")} <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">app_id</code> {t("管理编号空间，由 records 插入流程按 app_id 使用，不是“每条 record 一个 counter”。", "; it is used by record insertion by app_id, not one counter per record.")}
            </p>
          </div>

          <div id="appendix-a-2" className="scroll-mt-20">
            <h3 className="mb-4 text-xl font-semibold">A.2 Physical Table Definitions</h3>

            <div className="space-y-6">
              <div>
                <h4 className="mb-3 text-base font-semibold">1. APPS (Schema & Default View)</h4>
                <DataTable
                  headers={["Column", "Type", "Not Null", "Default", "Constraints", "Description"]}
                  rows={[
                    [
                      <code key="col" className="text-xs">id</code>,
                      <code key="type" className="text-xs">uuid</code>,
                      "Yes",
                      <code key="default" className="text-xs">uuidv7()</code>,
                      <code key="constraint" className="text-xs">PRIMARY KEY</code>,
                      t("应用内部唯一标识。", "Internal unique app identifier."),
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
                      <span key="desc"><strong>Data Source</strong>. {t("定义字段 ID、类型与属性。", "Defines field IDs, types, and attributes.")}</span>,
                    ],
                    [
                      <code key="col" className="text-xs">view_config</code>,
                      <code key="type" className="text-xs">jsonb</code>,
                      "Yes",
                      <code key="default" className="text-xs">{"'{\"layout\":[]}'::jsonb"}</code>,
                      <code key="constraint" className="text-xs">GIN idx_app_view_config_gin (optional)</code>,
                      <span key="desc"><strong>Default Layout</strong>. {t("定义默认表单/表格布局。", "Defines default form/table layout.")}</span>,
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
                      t("软删除执行人。", "Soft-delete actor."),
                    ],
                    [
                      <code key="col" className="text-xs">deleted_at</code>,
                      <code key="type" className="text-xs">timestamptz</code>,
                      "No",
                      <code key="default" className="text-xs">NULL</code>,
                      <code key="constraint" className="text-xs">idx_app_deleted_at (partial)</code>,
                      t("软删除时间。", "Soft-delete time."),
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
              </div>

              <div>
                <h4 className="mb-3 text-base font-semibold">2. APP_VIEWS (Specialized Views)</h4>
                <DataTable
                  headers={["Column", "Type", "Description"]}
                  rows={[
                    [
                      <code key="col" className="text-xs">id</code>,
                      <code key="type" className="text-xs">uuid</code>,
                      "Primary Key",
                    ],
                    [
                      <code key="col" className="text-xs">app_id</code>,
                      <code key="type" className="text-xs">uuid</code>,
                      <span key="desc">Foreign Key to <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">apps.id</code></span>,
                    ],
                    [
                      <code key="col" className="text-xs">config</code>,
                      <code key="type" className="text-xs">jsonb</code>,
                      <span key="desc"><strong>Specialized Layout</strong>. {t("看板、日历等专用视图配置。", "Configuration for specialized views such as kanban and calendar.")}</span>,
                    ],
                  ]}
                />
              </div>

              <div>
                <h4 className="mb-3 text-base font-semibold">3. RECORDS (Data Storage)</h4>
                <DataTable
                  headers={["Column", "Type", "Not Null", "Default", "Constraints / Index", "Description"]}
                  rows={[
                    [
                      <code key="col" className="text-xs">id</code>,
                      <code key="type" className="text-xs">uuid</code>,
                      "Yes",
                      <code key="default" className="text-xs">uuidv7()</code>,
                      <code key="constraint" className="text-xs">PRIMARY KEY</code>,
                      t("记录主键。", "Record primary key."),
                    ],
                    [
                      <code key="col" className="text-xs">app_id</code>,
                      <code key="type" className="text-xs">uuid</code>,
                      "Yes",
                      "-",
                      <code key="constraint" className="text-xs">INDEX(records_app_id_idx)</code>,
                      t("应用隔离键（当前不强依赖 FK）。", "App isolation key (currently no strong FK dependency)."),
                    ],
                    [
                      <code key="col" className="text-xs">record_number</code>,
                      <code key="type" className="text-xs">integer</code>,
                      t("Yes（收口后）", "Yes (after consolidation)"),
                      "-",
                      <code key="constraint" className="text-xs">UNIQUE(app_id, record_number)</code>,
                      t("应用内递增编号，由 DB 发号。", "App-scoped incremental number allocated by DB."),
                    ],
                    [
                      <code key="col" className="text-xs">version</code>,
                      <code key="type" className="text-xs">integer</code>,
                      "Yes",
                      <code key="default" className="text-xs">1</code>,
                      "-",
                      t("乐观锁版本（更新冲突控制）。", "Optimistic lock version (update conflict control)."),
                    ],
                    [
                      <code key="col" className="text-xs">values</code>,
                      <code key="type" className="text-xs">jsonb</code>,
                      "Yes",
                      <code key="default" className="text-xs">'{}'::jsonb</code>,
                      <code key="constraint" className="text-xs">GIN INDEX(records_values_gin_idx)</code>,
                      <span key="desc"><strong>Data Payload</strong>{t("，以", ", keyed by")} <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">fld_xxxxx</code> {t("为 Key。", ".")}</span>,
                    ],
                    [
                      <code key="col" className="text-xs">search_text</code>,
                      <code key="type" className="text-xs">text</code>,
                      "Generated",
                      "Generated",
                      <code key="constraint" className="text-xs">GIN INDEX(idx_records_search_text)</code>,
                      t("从 values 提取全文索引文本。", "Full-text index content extracted from values."),
                    ],
                    [
                      <code key="col" className="text-xs">created_by</code>,
                      <code key="type" className="text-xs">uuid</code>,
                      "No",
                      <code key="default" className="text-xs">NULL</code>,
                      <code key="constraint" className="text-xs">INDEX(idx_records_access)</code>,
                      t("创建者用户 ID。", "Creator user ID."),
                    ],
                    [
                      <code key="col" className="text-xs">created_via</code>,
                      <code key="type" className="text-xs">text</code>,
                      "Yes",
                      <code key="default" className="text-xs">'user'</code>,
                      "-",
                      t("创建来源：user/api_key/system。", "Creation source: user/api_key/system."),
                    ],
                    [
                      <code key="col" className="text-xs">created_by_ref</code>,
                      <code key="type" className="text-xs">uuid</code>,
                      "No",
                      <code key="default" className="text-xs">NULL</code>,
                      "-",
                      t("统一 actor ID（审计链路）。", "Unified actor ID (audit chain)."),
                    ],
                    [
                      <code key="col" className="text-xs">created_at</code>,
                      <code key="type" className="text-xs">timestamptz</code>,
                      "Yes",
                      <code key="default" className="text-xs">now()</code>,
                      "-",
                      t("创建时间。", "Created at."),
                    ],
                    [
                      <code key="col" className="text-xs">org_unit_id</code>,
                      <code key="type" className="text-xs">uuid</code>,
                      "No",
                      <code key="default" className="text-xs">NULL</code>,
                      <code key="constraint" className="text-xs">INDEX(idx_records_org_unit)</code>,
                      t("部门权限锚点（预留）。", "Department permission anchor (reserved)."),
                    ],
                    [
                      <code key="col" className="text-xs">deleted_at</code>,
                      <code key="type" className="text-xs">timestamptz</code>,
                      "No",
                      <code key="default" className="text-xs">NULL</code>,
                      <code key="constraint" className="text-xs">INDEX(records_deleted_at_idx)</code>,
                      t("软删除时间。", "Soft-delete time."),
                    ],
                    [
                      <code key="col" className="text-xs">deleted_by</code>,
                      <code key="type" className="text-xs">uuid</code>,
                      "No",
                      <code key="default" className="text-xs">NULL</code>,
                      "-",
                      t("软删除执行人。", "Soft-delete actor."),
                    ],
                  ]}
                />
              </div>

              <div>
                <h4 className="mb-3 text-base font-semibold">4. APP_RECORD_COUNTERS (Per-App Counter)</h4>
                <DataTable
                  headers={["Column", "Type", "Not Null", "Default", "Constraints", "Description"]}
                  rows={[
                    [
                      <code key="col" className="text-xs">app_id</code>,
                      <code key="type" className="text-xs">uuid</code>,
                      "Yes",
                      "-",
                      <code key="constraint" className="text-xs">PRIMARY KEY</code>,
                      t("每个 app 一行计数器。", "One counter row per app."),
                    ],
                    [
                      <code key="col" className="text-xs">last_number</code>,
                      <code key="type" className="text-xs">integer</code>,
                      "Yes",
                      <code key="default" className="text-xs">0</code>,
                      <code key="constraint" className="text-xs">CHECK(last_number &gt;= 0)</code>,
                      t("当前已分配的最大编号。", "Current maximum allocated number."),
                    ],
                    [
                      <code key="col" className="text-xs">updated_at</code>,
                      <code key="type" className="text-xs">timestamptz</code>,
                      "Yes",
                      <code key="default" className="text-xs">now()</code>,
                      "-",
                      t("最近发号/同步时间。", "Latest allocation/sync time."),
                    ],
                  ]}
                />
              </div>
            </div>
          </div>

          <div id="appendix-a-3" className="scroll-mt-20 space-y-4">
            <h3 className="text-xl font-semibold">A.3 Key Indexes & RLS</h3>

            <h4 className="text-base font-semibold">Apps Indexes</h4>
            <DataTable
              headers={[t("对象", "Object"), t("索引", "Index"), t("定义", "Definition"), t("用途", "Usage")]}
              rows={[
                [
                  <Badge key="target" variant="outline">apps</Badge>,
                  <code key="name" className="text-xs">idx_app_created_by</code>,
                  <code key="def" className="text-xs">(created_by)</code>,
                  t("查询用户创建的应用。", "Query apps created by user."),
                ],
                [
                  <Badge key="target" variant="outline">apps</Badge>,
                  <code key="name" className="text-xs">idx_app_created_at_desc</code>,
                  <code key="def" className="text-xs">(created_at DESC)</code>,
                  t("按创建时间倒序列表。", "Descending list by creation time."),
                ],
                [
                  <Badge key="target" variant="outline">apps</Badge>,
                  <code key="name" className="text-xs">idx_app_updated_at_desc</code>,
                  <code key="def" className="text-xs">(updated_at DESC)</code>,
                  t("最近更新时间排序。", "Latest update time sorting."),
                ],
                [
                  <Badge key="target" variant="outline">apps</Badge>,
                  <code key="name" className="text-xs">idx_app_deleted_at</code>,
                  <code key="def" className="text-xs">partial index on deleted_at</code>,
                  t("软删除过滤优化。", "Soft-delete filter optimization."),
                ],
                [
                  <Badge key="target" variant="outline">apps</Badge>,
                  <code key="name" className="text-xs">idx_app_fields_gin</code>,
                  <code key="def" className="text-xs">GIN(fields)</code>,
                  t("JSON 条件查询（可选）。", "JSON conditional query (optional)."),
                ],
                [
                  <Badge key="target" variant="outline">apps</Badge>,
                  <code key="name" className="text-xs">idx_app_view_config_gin</code>,
                  <code key="def" className="text-xs">GIN(view_config)</code>,
                  t("JSON 条件查询（可选）。", "JSON conditional query (optional)."),
                ],
              ]}
            />

            <DataTable
              headers={["Apps RLS Policy", "Rule"]}
              rows={[
                [
                  <code key="name" className="text-xs">apps_select_policy</code>,
                  <code key="rule" className="text-xs">deleted_at IS NULL OR current_setting('app.show_deleted_apps', true) = 'on'</code>,
                ],
                [
                  <code key="name" className="text-xs">apps_insert_policy</code>,
                  <code key="rule" className="text-xs">WITH CHECK (true)</code>,
                ],
                [
                  <code key="name" className="text-xs">apps_update_policy</code>,
                  <code key="rule" className="text-xs">USING (true) WITH CHECK (true)</code>,
                ],
                [
                  <code key="name" className="text-xs">apps_delete_policy</code>,
                  <code key="rule" className="text-xs">USING (true)</code>,
                ],
              ]}
            />

            <h4 className="text-base font-semibold">Records Indexes</h4>
            <DataTable
              headers={[t("对象", "Object"), t("索引 / 策略", "Index / Strategy"), t("定义", "Definition"), t("用途", "Usage")]}
              rows={[
                [
                  <Badge key="target" variant="outline">records</Badge>,
                  <code key="name" className="text-xs">records_app_id_idx</code>,
                  <code key="def" className="text-xs">(app_id)</code>,
                  t("应用隔离查询。", "App isolation query."),
                ],
                [
                  <Badge key="target" variant="outline">records</Badge>,
                  <code key="name" className="text-xs">records_values_gin_idx</code>,
                  <code key="def" className="text-xs">GIN(values)</code>,
                  t("JSONB 条件查询。", "JSONB conditional query."),
                ],
                [
                  <Badge key="target" variant="outline">records</Badge>,
                  <code key="name" className="text-xs">records_app_record_unique_idx</code>,
                  <code key="def" className="text-xs">UNIQUE(app_id, record_number)</code>,
                  t("同应用下编号唯一。", "Unique numbering within same app."),
                ],
                [
                  <Badge key="target" variant="outline">records</Badge>,
                  <code key="name" className="text-xs">idx_records_access</code>,
                  <code key="def" className="text-xs">(app_id, created_by)</code>,
                  t("SELF 权限过滤。", "SELF permission filter."),
                ],
                [
                  <Badge key="target" variant="outline">records</Badge>,
                  <code key="name" className="text-xs">idx_records_org_unit</code>,
                  <code key="def" className="text-xs">(app_id, org_unit_id)</code>,
                  t("部门权限过滤预留。", "Reserved for department permission filter."),
                ],
                [
                  <Badge key="target" variant="outline">records</Badge>,
                  <code key="name" className="text-xs">records_deleted_at_idx</code>,
                  <code key="def" className="text-xs">(deleted_at)</code>,
                  t("回收站查询。", "Recycle bin query."),
                ],
                [
                  <Badge key="target" variant="outline">records</Badge>,
                  <code key="name" className="text-xs">idx_records_search_text</code>,
                  <code key="def" className="text-xs">GIN(search_text gin_bigm_ops)</code>,
                  t("全文搜索。", "Full-text search."),
                ],
              ]}
            />

            <DataTable
              headers={["RLS Policy", "Rule"]}
              rows={[
                [
                  <code key="name" className="text-xs">records_select_policy</code>,
                  <code key="rule" className="text-xs">deleted_at IS NULL OR current_setting('app.show_deleted_records', true) = 'on'</code>,
                ],
                [
                  <code key="name" className="text-xs">records_insert_policy</code>,
                  <code key="rule" className="text-xs">WITH CHECK (true)</code>,
                ],
                [
                  <code key="name" className="text-xs">records_update_policy</code>,
                  <code key="rule" className="text-xs">USING (true) WITH CHECK (true)</code>,
                ],
                [
                  <code key="name" className="text-xs">records_delete_policy</code>,
                  <code key="rule" className="text-xs">USING (true)</code>,
                ],
              ]}
            />
          </div>

          <div id="appendix-a-4" className="scroll-mt-20 space-y-4">
            <h3 className="text-xl font-semibold">{t("A.4 Record Number 自增方案", "A.4 Record Number Auto-Increment Strategy")}</h3>
            <h4 className="text-sm font-medium text-muted-foreground">Design Overview</h4>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {t("采用“按 app 维度单行计数器 + 插入阶段自动分配 + 唯一约束兜底”的组合策略，实现统一发号。核心原则是：业务侧创建记录默认不传", "Use a combined strategy of one counter row per app + auto-allocation on insert + uniqueness fallback for unified numbering. Core principle: app layer does not pass")}{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">record_number</code>
              {t("，由数据库层在写入时按", "; database allocates by")} <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">app_id</code>{" "}
              {t("统一分配，保证所有写入口规则一致。", "on write to keep all write paths consistent.")}
            </p>

            <DataTable
              headers={[t("场景", "Scenario"), t("行为", "Behavior"), t("保证", "Guarantee")]}
              rows={[
                [
                  t("应用层不传 record_number", "App layer does not pass record_number"),
                  t("触发器调用 next_app_record_number(app_id) 自动发号。", "Trigger auto-allocates via next_app_record_number(app_id)."),
                  t("同 app 单调递增。", "Monotonic increment within same app."),
                ],
                [
                  t("导入/修复显式传 record_number", "Import/repair passes record_number explicitly"),
                  t("保留传入编号，并同步 counter 到 GREATEST(last_number, NEW.record_number)。", "Keep incoming number and sync counter to GREATEST(last_number, NEW.record_number)."),
                  t("后续发号不会回退或冲突。", "Future allocations do not roll back or conflict."),
                ],
                [
                  t("并发创建", "Concurrent creation"),
                  t("同一 app_id 竞争同一计数行，由 PostgreSQL 行锁串行化。", "Same app_id competes for one counter row and is serialized by PostgreSQL row lock."),
                  t("无重复号。", "No duplicate numbers."),
                ],
                [
                  t("最终兜底", "Final fallback"),
                  t("UNIQUE(app_id, record_number) 约束兜底。", "UNIQUE(app_id, record_number) as final safeguard."),
                  t("阻断重复写入。", "Blocks duplicate writes."),
                ],
              ]}
            />

            <ol className="ml-6 list-decimal space-y-2 text-sm text-muted-foreground">
              <li>{t("应用层执行 INSERT（默认不传 record_number）。", "App layer executes INSERT (without record_number by default).")}</li>
              <li>{t("BEFORE INSERT 触发器触发并分配编号。", "BEFORE INSERT trigger runs and allocates number.")}</li>
              <li>{t("写入 records.record_number 后提交事务。", "Write records.record_number then commit transaction.")}</li>
              <li>{t("唯一索引再次兜底，确保无重复。", "Unique index provides final safeguard to ensure no duplicates.")}</li>
            </ol>

            <DataTable
              headers={[t("边界项", "Boundary Item"), t("语义", "Semantics")]}
              rows={[
                [
                  t("硬删除后编号复用", "Reuse after hard delete"),
                  t("不会复用，counter 只增不减。", "No reuse; counter only increases."),
                ],
                [
                  t("事务回滚语义", "Transaction rollback semantics"),
                  t("counter 更新与 records 插入在同一事务中，失败会一起回滚。", "Counter update and records insert are in one transaction and roll back together on failure."),
                ],
                [
                  t("编号连续性", "Number continuity"),
                  t("保证单调递增；导入/修复场景允许跳号。", "Monotonic increment is guaranteed; import/repair may have gaps."),
                ],
                [
                  t("与 version 的关系", "Relation to version"),
                  t("record_number 发号不依赖乐观锁 version。", "record_number allocation does not depend on optimistic lock version."),
                ],
              ]}
            />

            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">{t("设计要点总结", "Design Summary")}</strong>
              </p>
              <ul className="ml-6 list-disc space-y-1">
                <li>{t("编号空间按 app 隔离，避免跨应用互相影响。", "Number space is isolated per app to avoid cross-app interference.")}</li>
                <li>{t("并发下同一 app 的发号按计数行串行化，保证不重复。", "Under concurrency, numbering is serialized by counter row to ensure uniqueness.")}</li>
                <li>{t("导入/修复支持显式编号，并同步提升计数器，防止后续回退。", "Import/repair supports explicit numbers and syncs counter upward to prevent fallback conflicts.")}</li>
                <li>{t("应用层保持无状态发号，数据库层统一收口与兜底。", "App layer stays stateless for numbering, while database centralizes and safeguards allocation.")}</li>
              </ul>
            </div>
          </div>
        </div>
      </DocSection>

      {/* Appendix B */}
      <DocSection
        id="appendix-b"
        title="Appendix B: Data Structure Specifications"
        level={1}
      >
        <div className="space-y-8">
          {/* B.1 */}
          <div id="appendix-b-1" className="scroll-mt-20">
            <h3 className="mb-3 text-xl font-semibold">B.1 Field Definition Specification</h3>
            <h4 className="mb-4 text-sm font-medium text-muted-foreground">apps.fields</h4>
            
            <p className="mb-4 text-sm text-muted-foreground">
              {t("对应 Kintone 的", "Equivalent to Kintone")} <strong>Form Fields</strong>{t("。定义数据的结构与约束。", ", defining data structure and constraints.")}
            </p>

            <div className="space-y-4">
              <div>
                <h5 className="mb-2 text-sm font-semibold">{t("存储格式 (JSON)", "Storage Format (JSON)")}</h5>
                <CodeBlock
                  language="json"
                  code={t(`[
  {
    "id": "fld_1f3e21cd00",
    "code": "Number",
    "type": "number",
    "label": "数值输入",
    "required": false,
    "unique": false,
    "noLabel": false,
    "defaultValue": "",
    "options": []
  },
  {
    "id": "fld_07d647171e",
    "code": "Text",
    "type": "input",
    "label": "单行输入",
    "maxLength": 64
  },
  {
    "id": "fld_table_1",
    "code": "Table1",
    "type": "table",
    "fields": [{ "code": "col1", "type": "input", "label": "列1" }]
  }
]
`, `[
  {
    "id": "fld_1f3e21cd00",
    "code": "Number",
    "type": "number",
    "label": "Numeric Input",
    "required": false,
    "unique": false,
    "noLabel": false,
    "defaultValue": "",
    "options": []
  },
  {
    "id": "fld_07d647171e",
    "code": "Text",
    "type": "input",
    "label": "Single-line Input",
    "maxLength": 64
  },
  {
    "id": "fld_table_1",
    "code": "Table1",
    "type": "table",
    "fields": [{ "code": "col1", "type": "input", "label": "Column 1" }]
  }
]`)}
                />
              </div>

              <div>
                <h5 className="mb-3 text-sm font-semibold">{t("关键属性表", "Key Attributes")}</h5>
                <DataTable
                  headers={[t("属性", "Property"), t("类型", "Type"), t("说明", "Description"), t("适用类型", "Applicable Types")]}
                  rows={[
                    [
                      <code key="prop" className="text-xs">id</code>,
                      <code key="type" className="text-xs">string</code>,
                      <span key="desc"><strong>Immutable ID</strong>. {t("内部唯一标识。", "Internal unique identifier.")}{renamingRef}</span>,
                      t("全部", "All"),
                    ],
                    [
                      <code key="prop" className="text-xs">code</code>,
                      <code key="type" className="text-xs">string</code>,
                      <span key="desc"><strong>Mutable Code</strong>. {t("应用内唯一。", "Unique within app.")}</span>,
                      t("全部", "All"),
                    ],
                    [
                      <code key="prop" className="text-xs">type</code>,
                      <code key="type" className="text-xs">string</code>,
                      <span key="desc"><strong>Immutable Type</strong>.</span>,
                      t("全部", "All"),
                    ],
                    [
                      <code key="prop" className="text-xs">label</code>,
                      <code key="type" className="text-xs">string</code>,
                      <span key="desc">{t("显示名称。", "Display name.")}{renamingRef}</span>,
                      t("全部", "All"),
                    ],
                    [
                      <code key="prop" className="text-xs">required</code>,
                      <code key="type" className="text-xs">boolean</code>,
                      t("是否必填。", "Whether required."),
                      t("大部分", "Most"),
                    ],
                    [
                      <code key="prop" className="text-xs">unique</code>,
                      <code key="type" className="text-xs">boolean</code>,
                      t("是否判重。", "Whether unique."),
                      t("部分", "Some"),
                    ],
                    [
                      <code key="prop" className="text-xs">defaultValue</code>,
                      <code key="type" className="text-xs">any</code>,
                      t("默认值。", "Default value."),
                      t("大部分", "Most"),
                    ],
                    [
                      <code key="prop" className="text-xs">options</code>,
                      <code key="type" className="text-xs">array</code>,
                      <span key="desc">{t("选项列表。", "Option list.")}{renamingRef}</span>,
                      "select/radio/checkbox",
                    ],
                    [
                      <code key="prop" className="text-xs">fields</code>,
                      <code key="type" className="text-xs">array</code>,
                      t("子表列定义。", "Subtable column definitions."),
                      "table",
                    ],
                  ]}
                />
              </div>

              <div>
                <h5 className="mb-2 text-sm font-semibold">{t("允许的 type 枚举（Latest）", "Allowed type enums (Latest)")}</h5>
                <p className="text-sm text-muted-foreground">
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                    input / number / textarea / datepicker / timepicker / select / checkbox / radio / attachment / richtext / plate-richtext / table / lookup / user-select / divider / label / step-separator
                  </code>
                </p>
              </div>

              <div>
                <h5 className="mb-2 text-sm font-semibold">{t("结构与业务约束", "Structure and Business Constraints")}</h5>
                <ul className="ml-6 list-disc space-y-1 text-sm text-muted-foreground">
                  <li>{t("仅", "Only")} <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">table</code> {t("可携带", "can carry")} <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">fields</code>{t("。", ".")}</li>
                  <li><code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">table</code> {t("不允许", "cannot include")} <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">options</code>{t("。", ".")}</li>
                  <li>{t("仅", "Only")} <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">select/radio/checkbox</code> {t("允许", "allow")} <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">options</code>{t("，且 id 在同字段内唯一。", ", and id must be unique within the same field.")}{renamingRef}</li>
                  <li><code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">code</code> {t("必须匹配", "must match")} <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">^[A-Za-z_][A-Za-z0-9_]*$</code>{t("，并在顶层与子表列中全局唯一。", ", and be globally unique across top-level and subtable columns.")}</li>
                  <li>{t("同一", "For the same")} <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">id</code> {t("的", "")} <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">type</code> {t("不可变更。", "is immutable.")}</li>
                  <li>{t("输入 id 缺失或无", "If input id is missing or lacks")} <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">fld_</code> {t("前缀时，写入前会自动规范化为新 ID。", "prefix, it is normalized to a new ID before write.")}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* B.2 */}
          <div id="appendix-b-2" className="scroll-mt-20">
            <h3 className="mb-3 text-xl font-semibold">B.2 Default View Configuration</h3>
            <h4 className="mb-4 text-sm font-medium text-muted-foreground">apps.view_config</h4>
            
            <p className="mb-4 text-sm text-muted-foreground">
              {t("定义默认表单的", "Defines default form")} <strong>Layout</strong>。
            </p>

            <p className="mb-4 text-sm font-semibold text-foreground">
              {t("核心原则: Layout 必须使用", "Core principle: Layout must use")} <strong>Field ID</strong> {t("来引用字段。", "to reference fields.")}
            </p>

            <div className="space-y-4">
              <div>
                <h5 className="mb-2 text-sm font-semibold">{t("存储格式 (JSON)", "Storage Format (JSON)")}</h5>
                <CodeBlock
                  language="json"
                  code={`{
  "layout": [
    {
      "type": "ROW",
      "id": "row_1",
      "fields": [
        { "id": "fld_1f3e21cd00", "width": 180, "height": 36 },
        { "id": "fld_07d647171e", "width": 220, "height": 36 }
      ]
    },
    {
      "type": "SUBTABLE",
      "id": "fld_table_1",
      "fields": [{ "id": "fld_col1", "width": 150, "height": 36 }]
    },
    {
      "type": "SPLITTER",
      "id": "split_1",
      "leftLines": [{ "fields": [...] }],
      "rightLines": [{ "fields": [...] }],
      "splitRatio": 0.5
    }
  ],
  "layoutMode": "auto"
}`}
                />
              </div>

              <div className="space-y-3">
                <h5 className="text-sm font-semibold">{t("Schema 结构约束", "Schema Structure Constraints")}</h5>
                <DataTable
                  headers={[t("层级", "Level"), t("字段", "Field"), t("约束", "Constraint")]}
                  rows={[
                    [
                      "Top-level",
                      <code key="field" className="text-xs">layout</code>,
                      t("必填，类型为 LayoutItem[]，对象为 strict 模式。", "Required, type LayoutItem[], object in strict mode."),
                    ],
                    [
                      "ROW",
                      <code key="field" className="text-xs">fields</code>,
                      t("必填，元素为 LayoutField。", "Required, elements are LayoutField."),
                    ],
                    [
                      "SUBTABLE",
                      <code key="field" className="text-xs">id / fields</code>,
                      t("id 必填（子表字段 ID），fields 必填。", "id required (subtable field ID), fields required."),
                    ],
                    [
                      "SPLITTER",
                      <code key="field" className="text-xs">leftLines/rightLines/splitRatio</code>,
                      t("左右分栏必填；splitRatio 可选且 0 <= ratio <= 1。", "Both sides required; splitRatio optional with 0 <= ratio <= 1."),
                    ],
                    [
                      "LayoutField",
                      <code key="field" className="text-xs">id/width/height/code</code>,
                      t("id 必填；width/height 可选且 >= 0；code 为兼容输入字段，落库前清理。", "id required; width/height optional and >= 0; code kept for compatibility and removed before persistence."),
                    ],
                  ]}
                />
              </div>

              <div>
                <h5 className="mb-2 text-sm font-semibold">{t("API 返回策略", "API Return Strategy")}</h5>
                <p className="mb-3 text-sm text-muted-foreground">
                  {t("后端 API 返回时，会自动注入", "When backend API returns data, it auto-injects")} <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">code</code>：
                </p>
                <CodeBlock
                  language="json"
                  filename="API Response"
                  code={`{
  "layout": [
    {
      "code": "Number",
      "id": "fld_1f3e21cd00",
      "width": 180
    }
  ]
}`}
                />
              </div>
            </div>
          </div>

          {/* B.3 */}
          <div id="appendix-b-3" className="scroll-mt-20">
            <h3 className="mb-3 text-xl font-semibold">B.3 Specialized View Config</h3>
            <h4 className="mb-4 text-sm font-medium text-muted-foreground">app_views.config</h4>
            
            <p className="mb-4 text-sm text-muted-foreground">
              {t("所有的配置项必须存储", "All configuration items must store")} <strong>Field ID (<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">fld_xxxxx</code>)</strong>。
            </p>

            <DataTable
              headers={["View Type", t("Config 结构示例", "Config Structure Example"), t("说明", "Description")]}
              rows={[
                [
                  <Badge key="type" variant="outline">Table</Badge>,
                  <code key="config" className="text-xs">{`{ "columns": ["fld_a", "fld_b"] }`}</code>,
                  t("定义列显示顺序。", "Defines column display order."),
                ],
                [
                  <Badge key="type" variant="outline">Kanban</Badge>,
                  <code key="config" className="text-xs">{`{ "groupBy": "fld_status", "titleField": "fld_title" }`}</code>,
                  t("定义分组字段和卡片标题字段。", "Defines grouping field and card title field."),
                ],
                [
                  <Badge key="type" variant="outline">Calendar</Badge>,
                  <code key="config" className="text-xs">{`{ "dateField": "fld_date", "endDateField": "fld_end", "titleField": "fld_title" }`}</code>,
                  t("定义日期和标题字段。", "Defines date and title fields."),
                ],
              ]}
            />
          </div>

          {/* B.4 */}
          <div id="appendix-b-4" className="scroll-mt-20">
            <h3 className="mb-3 text-xl font-semibold">B.4 Record Values</h3>
            <h4 className="mb-4 text-sm font-medium text-muted-foreground">records.values</h4>
            
            <p className="mb-4 text-sm text-muted-foreground">
              {t("严格以", "Strictly store data with")} <strong>Field ID</strong> {t("为 Key 存储数据。", "as the key.")}{renamingRef}
            </p>

            <CodeBlock
              language="json"
              code={t(`{
  "fld_1f3e21cd00": 123,
  "fld_07d647171e": "示例文本",
  "fld_status": { "id": "opt_123", "value": "A" },
  "fld_67d3a120dd": "2026-02-07",
  "fld_table_1": [{ "fld_col1": "行1值" }, { "fld_col1": "行2值" }]
}`, `{
  "fld_1f3e21cd00": 123,
  "fld_07d647171e": "Sample Text",
  "fld_status": { "id": "opt_123", "value": "A" },
  "fld_67d3a120dd": "2026-02-07",
  "fld_table_1": [{ "fld_col1": "Row 1 Value" }, { "fld_col1": "Row 2 Value" }]
}`)}
            />
            <p className="mt-3 text-sm text-muted-foreground">
              {t(
                "选项类字段存储 id(UUID) + value 快照：id 保证唯一性，value 用于选项删除后的历史显示与按 value 检索。",
                "Option fields store id(UUID) + value snapshot: id guarantees uniqueness, while value supports historical display after deletion and value-based retrieval.",
              )}{renamingRef}
            </p>
          </div>
        </div>
      </DocSection>
    </div>
  )
}
