"use client"

import { DocSection } from "@/components/doc-section"
import { useLanguage } from "@/lib/language-context"

export function ChapterFour() {
  const { language } = useLanguage()
  const t = (zh: string, en: string) => (language === "zh" ? zh : en)

  return (
    <DocSection
      id="implementation-extensions"
      title={t("4.1 与 4.2 关键实现", "4.1 and 4.2 Key Implementations")}
    >
      <div className="space-y-8">
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-xl font-semibold">
              {t("4.1 字段依赖与计算完整性", "4.1 Field Dependencies and Computation Integrity")}
            </h3>
            <h4 className="mb-2 text-sm font-medium text-muted-foreground">Field Dependencies</h4>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">{t("场景", "Scenario")}</strong>: {t(
                  "公式字段（Formula）引用其他字段（如 fld_price * fld_qty）。",
                  "A formula field references other fields (for example: fld_price * fld_qty).",
                )}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">{t("策略", "Strategy")}</strong>:{" "}
                {t(
                  "参考 Specialized View 的健壮性设计。",
                  "Reuse the same robustness model as Specialized View.",
                )}
              </p>

              <ul className="ml-6 list-disc space-y-2 text-sm text-muted-foreground">
                <li>
                  <strong className="text-foreground">{t("非强一致性", "Non-strong consistency")}</strong>:{" "}
                  {t(
                    "不强制禁止删除被引用字段。",
                    "Deleting referenced fields is not strictly blocked.",
                  )}
                </li>
                <li>
                  <strong className="text-foreground">{t("运行时容错", "Runtime fault tolerance")}</strong>:{" "}
                  {t(
                    "当计算引擎发现依赖字段缺失时，结果返回 Error 或 Null，并在 UI 提示用户修复公式。",
                    "When dependent fields are missing, the engine returns Error or Null and prompts users in UI to fix the formula.",
                  )}
                </li>
                <li>
                  <strong className="text-foreground">{t("理由", "Reason")}</strong>:{" "}
                  {t(
                    "No-Code 平台应优先保证灵活性，严格外键约束会明显降低用户体验。",
                    "No-Code platforms should prioritize flexibility; strict foreign-key style constraints harm usability.",
                  )}
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-xl font-semibold">
              {t("4.2 深度运行时校验", "4.2 Advanced Runtime Validation")}
            </h3>
            <h4 className="mb-2 text-sm font-medium text-muted-foreground">Advanced Runtime Validation</h4>

            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              {t(
                "在 Chapter 2.2 的基础校验之上，建议对拦截器层继续增强：",
                "On top of the baseline validation in Chapter 2.2, add stronger interceptor-level validation:",
              )}
            </p>

            <ul className="ml-6 list-disc space-y-2 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">Zod Schema Generation</strong>:{" "}
                {t(
                  "动态将 App Schema 转换为 Zod Object。",
                  "Dynamically convert App Schema into a Zod object.",
                )}
              </li>
              <li>
                <strong className="text-foreground">Validation Rules</strong>:
                <ul className="ml-6 mt-1 list-disc space-y-1">
                  <li>
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">Number</code>:{" "}
                    {t(
                      "确保 typeof value === 'number'。",
                      "Ensure typeof value === 'number'.",
                    )}
                  </li>
                  <li>
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">Select</code>:{" "}
                    {t("确保 value 在 options 列表中。", "Ensure the value exists in the options list.")}
                  </li>
                  <li>
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">Date</code>:{" "}
                    {t("确保是 ISO8601 字符串。", "Ensure value is an ISO8601 string.")}
                  </li>
                </ul>
              </li>
              <li>
                <strong className="text-foreground">Sanitization</strong>:{" "}
                {t(
                  "对非法输入优先“清洗”而非直接报错（如尝试 parseInt），提升 API 兼容性。",
                  "Prefer sanitizing invalid input instead of failing fast (for example, try parseInt) to improve API compatibility.",
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DocSection>
  )
}
