"use client"

import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/docs/code-block"
import { Search, Zap, Layers } from "lucide-react"

export function SpecialPatternsSection() {
  const { t, language } = useLanguage()

  const searchExample = `// URL: POST /resource/search (或 query)
// Body:
{
    "conditions": [
        { "field": "age", "operator": "gt", "value": 18 },
        { "field": "status", "operator": "in", "value": ["active", "pending"] }
    ],
    "pagination": { "page": 1, "pageSize": 20 }
}

// NestJS 实现：
@Post('search')
@HttpCode(200) // 注意 POST 默认是 201，搜索建议强制改回 200
search(@Body() dto: SearchDto) { ... }`

  const actionsExample = `// 登录
POST /auth/login

// 重置密码
POST /users/:id/reset-password

// 发布应用
POST /apps/:id/publish

// 禁用用户
POST /users/:id/disable`

  const batchExample = `// 推荐: DELETE /records/batch -> Body: { "ids": ["1", "2"] }

DELETE /api/apps/:appId/records/batch
{
    "ids": ["id1", "id2", "id3"]
}
// Response: { "success": true, "deleted": 3 }`

  const operators = [
    { operator: "eq / equals", desc: language === "zh" ? "等于" : "等しい", example: '{ "field": "status", "operator": "eq", "value": "done" }' },
    { operator: "ne / neq", desc: language === "zh" ? "不等于" : "等しくない", example: '{ "field": "status", "operator": "ne", "value": "cancelled" }' },
    { operator: "gt", desc: language === "zh" ? "大于" : "より大きい", example: '{ "field": "amount", "operator": "gt", "value": 100 }' },
    { operator: "gte", desc: language === "zh" ? "大于等于" : "以上", example: '{ "field": "createdAt", "operator": "gte", "value": "2024-01-01" }' },
    { operator: "lt", desc: language === "zh" ? "小于" : "より小さい", example: '{ "field": "amount", "operator": "lt", "value": 1000 }' },
    { operator: "lte", desc: language === "zh" ? "小于等于" : "以下", example: '{ "field": "dueDate", "operator": "lte", "value": "2024-12-31" }' },
    { operator: "contains / like", desc: language === "zh" ? "包含" : "含む", example: '{ "field": "title", "operator": "contains", "value": "重要" }' },
    { operator: "in", desc: language === "zh" ? "在列表中" : "リスト内", example: '{ "field": "status", "operator": "in", "value": ["done", "pending"] }' },
  ]

  const patterns = [
    {
      icon: Search,
      title: t("special.search.title"),
      desc: t("special.search.desc"),
      code: searchExample,
    },
    {
      icon: Zap,
      title: t("special.actions.title"),
      desc: t("special.actions.desc"),
      code: actionsExample,
    },
    {
      icon: Layers,
      title: t("special.batch.title"),
      desc: t("special.batch.desc"),
      code: batchExample,
    },
  ]

  return (
    <section id="special-patterns" className="space-y-8">
      <div>
        <Badge variant="secondary" className="mb-4">Patterns</Badge>
        <h2 className="text-3xl font-bold text-foreground mb-4">{t("special.title")}</h2>
        <p className="text-lg text-muted-foreground">
          {language === "zh"
            ? "特殊场景下的 API 设计模式，用于处理标准 REST 无法覆盖的情况。"
            : "標準の REST ではカバーできない状況に対処するための特殊シナリオの API 設計パターン。"}
        </p>
      </div>

      <div className="space-y-6">
        {patterns.map((pattern, index) => {
          const Icon = pattern.icon
          return (
            <Card key={index} className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{pattern.title}</CardTitle>
                    <p className="text-muted-foreground mt-1 text-sm">{pattern.desc}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CodeBlock code={pattern.code} language="typescript" />
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">
          {language === "zh" ? "条件操作符" : "条件演算子"}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  {language === "zh" ? "操作符" : "演算子"}
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  {language === "zh" ? "说明" : "説明"}
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  {language === "zh" ? "示例" : "例"}
                </th>
              </tr>
            </thead>
            <tbody>
              {operators.map((op, index) => (
                <tr key={index} className="border-b border-border/50">
                  <td className="py-3 px-4">
                    <code className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-mono">
                      {op.operator}
                    </code>
                  </td>
                  <td className="py-3 px-4 text-foreground">{op.desc}</td>
                  <td className="py-3 px-4">
                    <code className="text-xs bg-muted px-2 py-1 rounded font-mono break-all">
                      {op.example}
                    </code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
