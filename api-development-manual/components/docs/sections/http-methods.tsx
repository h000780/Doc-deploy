"use client"

import { useLanguage } from "@/lib/language-context"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/docs/code-block"

export function HttpMethodsSection() {
  const { t, language } = useLanguage()

  const methods = [
    {
      method: "GET",
      purpose: t("http.get.purpose"),
      idempotent: true,
      example: "GET /users, GET /users/1",
      body: "forbidden",
    },
    {
      method: "POST",
      purpose: t("http.post.purpose"),
      idempotent: false,
      example: "POST /users, POST /users/search",
      body: "required",
    },
    {
      method: "PUT",
      purpose: t("http.put.purpose"),
      idempotent: true,
      example: "PUT /configs/system",
      body: "required",
    },
    {
      method: "PATCH",
      purpose: t("http.patch.purpose"),
      idempotent: false,
      example: "PATCH /users/1",
      body: "required",
    },
    {
      method: "DELETE",
      purpose: t("http.delete.purpose"),
      idempotent: true,
      example: "DELETE /users/1",
      body: "notrecommended",
    },
  ]

  const methodColors: Record<string, string> = {
    GET: "bg-emerald-500/20 text-emerald-600",
    POST: "bg-blue-500/20 text-blue-600",
    PUT: "bg-amber-500/20 text-amber-600",
    PATCH: "bg-orange-500/20 text-orange-600",
    DELETE: "bg-red-500/20 text-red-600",
  }

  const bodyLabels: Record<string, { text: string; variant: "default" | "secondary" | "destructive" }> = {
    required: { text: t("http.required"), variant: "default" },
    forbidden: { text: t("http.forbidden"), variant: "destructive" },
    notrecommended: { text: t("http.notrecommended"), variant: "secondary" },
  }

  const usageExamples = `// 创建资源 - POST
POST /api/apps/:appId/records
{
    "values": { "title": "新记录" }
}
// 返回 201 Created + 新资源

// 全量更新 - PUT (替换整个资源)
PUT /api/apps/:appId/records/:recordId
{
    "values": { "title": "更新标题", "status": "done" }
}
// 返回 200 OK + 更新后的资源

// 部分更新 - PATCH (仅更新指定字段)
PATCH /api/apps/:appId/records/:recordId
{
    "values": { "status": "done" }
}
// 返回 200 OK + 更新后的资源

// 删除资源 - DELETE
DELETE /api/apps/:appId/records/:recordId
// 返回 200 OK 或 204 No Content`

  const batchExample = `// 非公开 API - 批量删除
DELETE /api/apps/:appId/records/batch
{
    "ids": ["id1", "id2", "id3"]
}

// 公开 API - 批量删除 (保持一致性)
DELETE /api/v1/apps/:appId/records/batch
{
    "ids": ["id1", "id2", "id3"]
}`

  return (
    <section id="http-methods" className="space-y-8">
      <div>
        <Badge variant="secondary" className="mb-4">Methods</Badge>
        <h2 className="text-3xl font-bold text-foreground mb-4">{t("http.title")}</h2>
        <p className="text-lg text-muted-foreground">
          {language === "zh"
            ? "正确使用 HTTP 方法是 RESTful API 设计的基础。"
            : "HTTP メソッドの正しい使用は RESTful API 設計の基礎です。"}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">{t("http.method")}</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">{t("http.purpose")}</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">{t("http.idempotent")}</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">{t("http.example")}</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">{t("http.body")}</th>
            </tr>
          </thead>
          <tbody>
            {methods.map((row, index) => (
              <tr key={index} className="border-b border-border/50">
                <td className="py-3 px-4">
                  <span className={`px-2.5 py-1 rounded font-mono text-xs font-semibold ${methodColors[row.method]}`}>
                    {row.method}
                  </span>
                </td>
                <td className="py-3 px-4 text-foreground">{row.purpose}</td>
                <td className="py-3 px-4">
                  {row.idempotent ? (
                    <span className="text-success">{t("http.yes")}</span>
                  ) : (
                    <span className="text-muted-foreground">{t("http.no")}</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <code className="text-xs bg-muted px-2 py-1 rounded font-mono">{row.example}</code>
                </td>
                <td className="py-3 px-4">
                  <Badge variant={bodyLabels[row.body].variant}>
                    {bodyLabels[row.body].text}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-4">
            {language === "zh" ? "使用规范示例" : "使用規範例"}
          </h3>
          <CodeBlock code={usageExamples} language="typescript" title="HTTP Methods Usage" />
        </div>

        <div>
          <h3 className="text-xl font-semibold text-foreground mb-4">
            {language === "zh" ? "批量操作" : "バッチ操作"}
          </h3>
          <CodeBlock code={batchExample} language="typescript" title="Batch Operations" />
        </div>
      </div>
    </section>
  )
}
