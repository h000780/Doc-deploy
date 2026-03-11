"use client";

import Link from "next/link";
import { DocSection } from "@/components/doc-section";
import { DataTable } from "@/components/data-table";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/language-context";

export function ChapterThree() {
  const { language } = useLanguage();
  const t = (zh: string, en: string) => (language === "zh" ? zh : en);
  const refClass =
    "ml-1 inline-flex -translate-y-1 align-super rounded border border-border bg-muted px-1 py-0 text-[10px] leading-none text-muted-foreground transition-colors hover:text-foreground";
  const renamingStrategyRef = (
    <Link
      href="#strategy-renaming-resolution"
      className={refClass}
    >
      R
    </Link>
  );
  const lazyCleaningRef = (
    <Link href="#strategy-lazy-cleaning" className={refClass}>
      L
    </Link>
  );
  const scheduledCleaningRef = (
    <Link href="#strategy-scheduled-cleaning" className={refClass}>
      S
    </Link>
  );

  return (
    <div className="space-y-12">
      <DocSection
        id="soft-deletion"
        title={t("3.1 软删除策略", "3.1 Soft Deletion Strategy")}
        subtitle="Soft Deletion Strategy"
        level={2}
      >
        <DataTable
          headers={[
            t("对象", "Object"),
            t("策略", "Strategy"),
            t("实现方式", "Implementation"),
            t("恢复能力", "Recovery"),
          ]}
          rows={[
            [
              <Badge key="app" variant="outline">
                App
              </Badge>,
              <Badge key="soft" className="bg-emerald-100 text-emerald-700">
                Soft Delete
              </Badge>,
              <code key="impl" className="text-xs">
                {t(
                  "deleted_at 字段 + RLS 过滤",
                  "deleted_at column + RLS filter",
                )}
              </code>,
              t("✅ 可瞬间恢复", "✅ Instant recovery"),
            ],
            [
              <Badge key="rec" variant="outline">
                Record
              </Badge>,
              <Badge key="soft" className="bg-emerald-100 text-emerald-700">
                Soft Delete
              </Badge>,
              <code key="impl" className="text-xs">
                {t(
                  "deleted_at 字段 + RLS 过滤",
                  "deleted_at column + RLS filter",
                )}
              </code>,
              t("✅ 可瞬间恢复", "✅ Instant recovery"),
            ],
            [
              <Badge key="fld" variant="outline">
                Field
              </Badge>,
              <Badge key="hard" className="bg-red-100 text-red-700">
                Hard Delete
              </Badge>,
              <code key="impl" className="text-xs">
                {t("从 Schema JSON 移除", "Remove from Schema JSON")}
              </code>,
              t("❌ 需回滚 App 版本", "❌ Requires app version rollback"),
            ],
          ]}
        />
      </DocSection>

      <DocSection
        id="impact-analysis"
        title={t(
          "3.2 全生命周期影响分析",
          "3.2 Full Lifecycle Impact Analysis",
        )}
        subtitle="Impact Analysis"
        level={2}
      >
        <p className="leading-relaxed text-muted-foreground">
          {t(
            "这是系统稳定性的核心验证矩阵，涵盖 Schema、View、Data 三层影响。",
            "This is the core stability validation matrix across Schema, View, and Data layers.",
          )}
        </p>

        <DataTable
          headers={[
            t("场景", "Scenario"),
            t("动作", "Action"),
            t(
              "对老记录 (DB Storage) 的影响",
              "Impact on Existing Records (DB Storage)",
            ),
            t("对前端/API (View) 的影响", "Impact on Frontend/API (View)"),
            t("最终状态评价", "Final Assessment"),
          ]}
          rows={[
            [
              <Badge key="ren" variant="secondary">
                Rename Field
              </Badge>,
              <code key="act" className="text-xs">
                {t("修改 code", "Modify code")}
              </code>,
              <span key="db" className="text-xs">
                <strong>{t("Key (ID) 不变", "Key (ID) unchanged")}</strong>
                {t("。无需迁移数据。", ". No data migration needed.")}
              </span>,
              <span key="api" className="text-xs">
                <strong>{t("无缝切换", "Seamless transition")}</strong>
                {t(
                  "。API 自动返回新名称。",
                  ". API automatically returns the new name.",
                )}
              </span>,
              t(
                "✅ Perfect. 全链路无感。",
                "✅ Perfect. Transparent end-to-end.",
              ),
            ],
            [
              <Badge key="add" variant="secondary">
                Add Field
              </Badge>,
              <code key="act" className="text-xs">
                Insert Item
              </code>,
              <span key="db" className="text-xs">
                <strong>{t("Key 不存在", "Key absent")}</strong>
                {t("。无需迁移数据。", ". No data migration needed.")}
              </span>,
              <span key="api" className="text-xs">
                <strong>{t("正常", "Normal")}</strong>
                {t(
                  "。API 返回 null / undefined。",
                  ". API returns null / undefined.",
                )}
              </span>,
              t(
                "✅ Perfect. 即改即显。",
                "✅ Perfect. Changes appear immediately.",
              ),
            ],
            [
              <Badge key="del" variant="secondary">
                Delete Field
              </Badge>,
              <code key="act" className="text-xs">
                Remove Item
              </code>,
              <span key="db" className="text-xs">
                <strong>Data Orphaned</strong>{" "}
                {t("(残留)。", "(residual data).")}
              </span>,
              <span key="api" className="text-xs">
                <strong>{t("自动过滤", "Auto-filtered")}</strong>
                {t(
                  "。Interceptor 屏蔽残留项。",
                  ". Interceptor removes residual entries.",
                )}
              </span>,
              "✅ Perfect (Logical Delete).",
            ],
            [
              <Badge key="chg" variant="secondary">
                Change Type
              </Badge>,
              <code key="act" className="text-xs">
                Update Type
              </code>,
              <span key="db" className="text-xs">
                <strong>Data Orphaned</strong>{" "}
                {t("(残留)。", "(residual data).")}
              </span>,
              <span key="api" className="text-xs">
                <strong>{t("不支持", "Unsupported")}</strong>
                {t(
                  "。UI 无法直接修改类型，只能“删旧建新”。",
                  ". UI cannot modify type directly; only delete-and-create-new is allowed.",
                )}
              </span>,
              "✅ Safe.",
            ],
          ]}
        />
      </DocSection>

      <DocSection
        id="consistency-strategy"
        title={t("3.3 数据一致性策略", "3.3 Data Consistency Strategy")}
        subtitle="Data Consistency Strategy"
        level={2}
      >
        <p className="leading-relaxed text-muted-foreground">
          {t(
            "针对 Schema 变更导致的历史数据不一致问题，系统采用",
            "To handle historical data inconsistencies after schema changes, the system uses a",
          )}{" "}
          <strong>
            &quot;{t("共同责任制", "Shared Responsibility Model")}&quot;
          </strong>
          。
        </p>

        <div className="space-y-3">
          <h4 className="text-base font-semibold">
            {t("核心原则", "Core Principles")}
          </h4>
          <ol className="ml-6 space-y-2 text-muted-foreground">
            <li className="leading-relaxed">
              <strong className="text-foreground">System Responsibility</strong>
              :{" "}
              {t(
                "保证数据可读与可访问。系统不会擅自修改或删除用户历史数据（即使其不符合最新 Schema）。",
                "Guarantee readability and accessibility. The system does not modify or delete historical data on behalf of users, even when it no longer matches the latest schema.",
              )}
            </li>
            <li className="leading-relaxed">
              <strong className="text-foreground">User Responsibility</strong>:{" "}
              {t(
                "保证数据时效性与合规性。仅当用户主动编辑记录时，系统才强制按最新标准校验并要求修正。",
                "Guarantee data timeliness and compliance. The system enforces latest validation only when a user actively edits a record.",
              )}
            </li>
          </ol>
        </div>

        <div>
          <h4 className="mb-3 text-base font-semibold">
            {t(
              "变更场景矩阵 (Evolution Scenarios)",
              "Evolution Scenarios Matrix",
            )}
          </h4>
          <p className="mb-4 text-sm text-muted-foreground">
            {t(
              "以下是各类变更场景下的系统行为与责任分配对照表：",
              "The table below maps system behavior and responsibility across change scenarios:",
            )}
          </p>

          <div className="overflow-x-auto">
            <DataTable
              headers={[
                t("变更场景", "Change Scenario"),
                t("示例操作", "Example"),
                t("历史数据状态 (Legacy Data)", "Legacy Data State"),
                "Read (List View)",
                "Write (Edit View)",
                t("责任方", "Owner"),
              ]}
              rows={[
                [
                  <Badge
                    key="opt"
                    variant="secondary"
                    className="whitespace-nowrap"
                  >
                    Option Deletion
                  </Badge>,
                  <span key="ex" className="text-xs">
                    {t(
                      '下拉框删除选项 "A"',
                      'Option "A" was removed from a select field',
                    )}
                  </span>,
                  <span key="leg" className="text-xs">
                    {t('仍存储值 "A"', 'Value "A" still exists in storage')}
                  </span>,
                  <span key="read" className="text-xs">
                    <strong>{t("显示原值", "Show original value")}</strong>
                    {t(
                      '。标记为 "Invalid Option"（灰/红提示），但不报错。',
                      '. Mark as "Invalid Option" (gray/red warning), but do not fail.',
                    )}
                  </span>,
                  <span key="write" className="text-xs">
                    <strong>
                      {t("禁止保存原值", "Cannot save original value")}
                    </strong>
                    {t(
                      "。用户必须手动选择有效选项（B/C）后提交。",
                      ". User must select a valid option (B/C) before submitting.",
                    )}
                  </span>,
                  <Badge key="resp" variant="outline" className="bg-amber-50">
                    User (On Edit)
                  </Badge>,
                ],
                [
                  <Badge
                    key="ren"
                    variant="secondary"
                    className="whitespace-nowrap"
                  >
                    Renaming Option
                  </Badge>,
                  <span key="ex" className="text-xs">
                    {t('选项 "A" 改名为 "C"', 'Option "A" renamed to "C"')}
                  </span>,
                  <span key="leg" className="text-xs">
                    {t(
                      '存储 Option Snapshot: { id: "opt_123", value: "A" }',
                      'Store Option Snapshot: { id: "opt_123", value: "A" }',
                    )}
                    {renamingStrategyRef}
                  </span>,
                  <span key="read" className="text-xs">
                    <strong>
                      {t("按 value 合并并去重", "Merge and dedupe by value")}
                    </strong>
                    <br />
                    {t(
                      "示例链路: A/B -> 删除 A -> 显示 B,A -> 追加 C -> 显示 B,C,A -> C 改名 A 后仅显示 B,A",
                      "Example flow: A/B -> delete A -> show B,A -> add C -> show B,C,A -> rename C to A -> show only B,A",
                    )}
                    {renamingStrategyRef}
                  </span>,
                  <span key="write" className="text-xs">
                    <strong>{t("提交时归一化", "Normalize On Submit")}</strong>
                    {t(
                      "。无论用户是否改动该控件，保存时都执行：同 value 映射当前 ID；若 ID/value 均不存在则保留历史快照并允许保存。",
                      ". Runs on every save even when control is untouched: map same-value to current ID; if both ID/value are missing, keep historical snapshot and allow save.",
                    )}
                  </span>,
                  <Badge key="resp" variant="outline" className="bg-emerald-50">
                    System (Auto-Reflect)
                  </Badge>,
                ],
                [
                  <Badge
                    key="val"
                    variant="secondary"
                    className="whitespace-nowrap"
                  >
                    Validation Change
                  </Badge>,
                  <span key="ex" className="text-xs">
                    {t(
                      "数字范围从无限制改为 Max: 100",
                      "Numeric range changed from unlimited to Max: 100",
                    )}
                  </span>,
                  <span key="leg" className="text-xs">
                    {t("仍存储值 999", "Value 999 still exists in storage")}
                  </span>,
                  <span key="read" className="text-xs">
                    <strong>{t("正常显示", "Display normally")}</strong> 999.
                  </span>,
                  <span key="write" className="text-xs">
                    <strong>
                      {t("禁止保存原值", "Cannot save original value")}
                    </strong>
                    {t(
                      '。校验报错 "Value must <= 100"，用户需修正。',
                      '. Validation fails with "Value must <= 100".',
                    )}
                  </span>,
                  <Badge key="resp" variant="outline" className="bg-amber-50">
                    User (On Edit)
                  </Badge>,
                ],
                [
                  <Badge
                    key="del"
                    variant="secondary"
                    className="whitespace-nowrap"
                  >
                    Field Deletion
                  </Badge>,
                  <span key="ex" className="text-xs">
                    {t("删除字段 fld_name", "Delete field fld_name")}
                  </span>,
                  <span key="leg" className="text-xs">
                    <strong>{t("数据残留", "Data orphaned")}</strong> (Orphan)
                  </span>,
                  <span key="read" className="text-xs">
                    <strong>{t("忽略", "Ignored")}</strong>
                    {t(
                      "。Interceptor 自动过滤。",
                      ". Interceptor auto-filters it.",
                    )}
                  </span>,
                  <span key="write" className="text-xs">
                    <strong>{t("自动清洗", "Auto-cleaned")}</strong>
                    {t(
                      "。保存记录时后端自动移除 orphan ID；并由定时任务执行物理清理。",
                      ". Backend removes orphan IDs on write; scheduled tasks handle physical cleanup.",
                    )}
                    {lazyCleaningRef}
                    {scheduledCleaningRef}
                  </span>,
                  <Badge key="resp" variant="outline" className="bg-emerald-50">
                    System (Lazy Clean)
                  </Badge>,
                ],
              ]}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {t("引用:", "Refs:")} R = Renaming Resolution, L = Lazy Cleaning, S = Scheduled Cleaning.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-base font-semibold">
            {t("详细策略说明", "Detailed Strategy Notes")}
          </h4>

          <ol className="ml-6 space-y-4 text-muted-foreground">
            <li className="leading-relaxed">
              <strong className="text-foreground">
                Passive Update {t("(被动更新)", "(Passive Update)")}
              </strong>
              :
              <ul className="ml-6 mt-2 list-disc space-y-2">
                <li>
                  {t(
                    "对于 Option Deletion 和 Validation Change，系统不执行后台批量洗数（Batch Migration）。",
                    "For Option Deletion and Validation Change, the system does not run backend batch migration.",
                  )}
                </li>
                <li>
                  <strong>{t("理由", "Reasons")}</strong>:
                  <ul className="ml-6 mt-1 list-disc space-y-1">
                    <li>
                      <strong>
                        {t("历史真实性", "Historical truthfulness")}
                      </strong>
                      {t(
                        ": 历史数据应反映当时业务状态。例如 2023 年单据允许 ",
                        ": historical data should preserve the business state at that time. For example, if 2023 documents allowed ",
                      )}
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                        Status: Archived
                      </code>
                      {t(
                        "，即使 2024 年删除该状态，旧单据仍应保留。",
                        ", old documents should keep it even if removed in 2024.",
                      )}
                    </li>
                    <li>
                      <strong>{t("性能", "Performance")}</strong>
                      {t(
                        ": 避免配置变更触发全表更新。",
                        ": avoid full-table rewrites after configuration changes.",
                      )}
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <li
              id="strategy-renaming-resolution"
              className="scroll-mt-24 leading-relaxed"
            >
              <strong className="text-foreground">
                {t(
                  "Renaming Resolution (UUID 存储 + value 合并显示)",
                  "Renaming Resolution (UUID Storage + value-based Merge)",
                )}
              </strong>
              :
              <ul className="ml-6 mt-2 list-disc space-y-2">
                <li>
                  {t(
                    '选项类值同时存储 id(UUID) 与 value 快照（如 { id: "opt_123", value: "A" }）。id 保证唯一性，value 保证选项被删除后历史值仍可显示。',
                    'Option values store both id(UUID) and a value snapshot (for example { id: "opt_123", value: "A" }). id preserves uniqueness, value preserves display after option deletion.',
                  )}
                </li>
                <li>
                  {t(
                    "读取/编辑三分支：1) id 命中 Schema，显示 Schema 当前 value（改名自动反映）；2) id 不命中，追加历史快照选项；3) 追加项与 Schema 同 value 时合并为一个选项。",
                    "Read/edit has 3 branches: 1) id matches schema, show schema current value (rename auto-reflects); 2) id missing, append historical snapshot option; 3) if appended option and schema share same value, merge into one option.",
                  )}
                </li>
                <li>
                  {t(
                    "保存时做全量归一化（即使用户未改该 Radio/Select）：id 命中则回写当前 value；id 不命中但有同 value 则升级到当前 id；id 与 value 都不存在则保留历史快照并允许保存。",
                    "Save performs full normalization (even when user did not touch this Radio/Select): if id matches, rewrite current value; if id missing but same value exists, upgrade to current id; if both id and value are missing, keep historical snapshot and still allow save.",
                  )}
                </li>
                <li>
                  {t(
                    "筛选与检索按 value 执行，避免被历史 UUID 差异影响。",
                    "Filtering and search execute by value to avoid fragmentation from historical UUID differences.",
                  )}
                </li>
              </ul>
            </li>

            <li id="strategy-lazy-cleaning" className="scroll-mt-24 leading-relaxed">
              <strong className="text-foreground">
                Lazy Cleaning {t("(惰性清洗)", "(Lazy Cleaning)")}
              </strong>
              :
              <ul className="ml-6 mt-2 list-disc space-y-2">
                <li>
                  {t(
                    "对于 Field Deletion（物理残留数据），系统在 Write 时自动清理。",
                    "For Field Deletion (physical residual data), the system auto-cleans on write.",
                  )}
                </li>
                <li>
                  <strong>Trigger</strong>:{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                    RecordsService.update()
                  </code>
                </li>
                <li>
                  <strong>Action</strong>:
                  <CodeBlock
                    language="typescript"
                    code={`// Pseudocode
const schemaIds = new Set(app.fields.map((f) => f.id));
const cleanPayload = {};
for (const [key, val] of Object.entries(inputPayload)) {
  if (schemaIds.has(key)) {
    cleanPayload[key] = val; // Keep only fields that still exist in schema
  }
  // key not in schema -> Dropped (Cleaned)
}
await db.update(cleanPayload);`}
                  />
                </li>
              </ul>
            </li>

            <li
              id="strategy-scheduled-cleaning"
              className="scroll-mt-24 leading-relaxed"
            >
              <strong className="text-foreground">
                Scheduled Cleaning {t("(定时清理)", "(Scheduled Cleaning)")}
              </strong>
              :
              <ul className="ml-6 mt-2 list-disc space-y-2">
                <li>
                  <strong>{t("适用范围", "Scope")}</strong>:{" "}
                  {t(
                    "所有已删除字段 (All Deleted Fields)。",
                    "All Deleted Fields.",
                  )}
                </li>
                <li>
                  <strong>{t("核心动因 (特别是附件)", "Key Driver (Esp. Attachments)")}</strong>
                  :
                  <ul className="ml-6 mt-1 list-disc space-y-1">
                    <li>
                      {t(
                        "惰性清理无法物理删除对象存储 (OSS) 中的文件，导致租户已用容量虚高。",
                        "Lazy cleaning cannot physically delete files from object storage (OSS), resulting in inflated tenant capacity usage.",
                      )}
                    </li>
                    <li>
                      ⚠️{" "}
                      {t(
                        "若不释放空间，可能导致配额已满，阻塞用户写入新数据。",
                        "Failure to release space may cause 'Quota Full' errors, blocking new data writes.",
                      )}
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Action</strong>:
                  <div className="mt-1 text-sm">
                    {t(
                      "后台定时任务 (Scanning) ➔ 物理清理 (Physical Delete) ➔ 立即重算容量 (Recalculate Capacity)。",
                      "Background Scheduled Task (Scanning) ➔ Physical Delete ➔ Immediately Recalculate Capacity.",
                    )}
                  </div>
                </li>
              </ul>
            </li>
          </ol>
        </div>
      </DocSection>
    </div>
  );
}
