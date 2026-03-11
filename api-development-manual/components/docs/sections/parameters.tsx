"use client"

import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"
import { CodeBlock } from "@/components/docs/code-block"

export function ParametersSection() {
  const { t, language } = useLanguage()

  const goldenRules = language === "zh" ? [
    {
      rule: "找 ID (Who) → Path",
      desc: "资源身份标识，唯一的、确定的",
      good: "GET /users/1001",
      bad: "GET /users?id=1001",
    },
    {
      rule: "查条件 (Which) → Query",
      desc: "筛选、过滤、搜索、排序",
      good: "GET /users?dept=sales&status=active",
      bad: "GET /depts/sales/users",
    },
  ] : [
    {
      rule: "ID を探す (Who) → Path",
      desc: "リソース識別子、一意で確定的",
      good: "GET /users/1001",
      bad: "GET /users?id=1001",
    },
    {
      rule: "条件を探す (Which) → Query",
      desc: "フィルタリング、検索、ソート",
      good: "GET /users?dept=sales&status=active",
      bad: "GET /depts/sales/users",
    },
  ]

  const parameterTypes = language === "zh" ? [
    {
      type: "Path Params",
      title: "路径参数",
      usage: "唯一标识资源",
      scenarios: "AppID, UserID, RecordID 等核心定位符",
      example: "GET /api/apps/:appId/records/:recordId",
    },
    {
      type: "Query Params",
      title: "查询参数",
      usage: "筛选、分页、排序、视图修饰",
      scenarios: "筛选 (?status=active)、分页 (?limit=20&offset=0)、排序 (?sort=-createdAt)",
      example: "GET /api/apps/:appId/records?limit=20&offset=0&latest=1",
    },
    {
      type: "Request Body",
      title: "请求体",
      usage: "传输业务数据",
      scenarios: "Create (POST) 和 Update (PATCH) 操作",
      example: "POST /api/apps/:appId/records + { values: {...} }",
    },
  ] : [
    {
      type: "Path Params",
      title: "パスパラメータ",
      usage: "リソースを一意に識別",
      scenarios: "AppID、UserID、RecordID などのコア識別子",
      example: "GET /api/apps/:appId/records/:recordId",
    },
    {
      type: "Query Params",
      title: "クエリパラメータ",
      usage: "フィルタリング、ページネーション、ソート、ビュー修飾",
      scenarios: "フィルタリング (?status=active)、ページネーション (?limit=20&offset=0)、ソート (?sort=-createdAt)",
      example: "GET /api/apps/:appId/records?limit=20&offset=0&latest=1",
    },
    {
      type: "Request Body",
      title: "リクエストボディ",
      usage: "ビジネスデータの伝送",
      scenarios: "Create（POST）と Update（PATCH）操作",
      example: "POST /api/apps/:appId/records + { values: {...} }",
    },
  ]

  const queryExample = `// 路径参数 - 资源标识符
GET /api/apps/:appId/records/:recordId
// appId, recordId 用于唯一标识资源

// 查询参数 - 过滤、分页、排序
GET /api/apps/:appId/records?limit=20&offset=0&latest=1
// limit   - 返回数量
// offset  - 分页偏移
// latest  - 布尔开关 (1/0)
// sort    - 排序字段
// order   - 排序方向 (asc/desc)

// 请求体 - 复杂查询条件
POST /api/apps/:appId/records/search
{
    "conditions": [...],
    "limit": 20,
    "offset": 0
}`

  return (
    <section id="parameter-passing" className="space-y-8">
      <div>
        <Badge variant="secondary" className="mb-4">Parameters</Badge>
        <h2 className="text-3xl font-bold text-foreground mb-4">{t("params.title")}</h2>
        <p className="text-lg text-muted-foreground">
          {language === "zh"
            ? "这是开发者最容易混淆的部分，请严格遵守以下规范。"
            : "これは開発者が最も混乱しやすい部分です。以下の規範を厳守してください。"}
        </p>
      </div>

      <Card className="bg-warning/5 border-warning/30">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <CardTitle className="text-lg text-warning">{t("params.golden.title")}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {goldenRules.map((rule, index) => (
            <div key={index} className="space-y-2">
              <p className="font-medium text-foreground">{rule.rule}</p>
              <p className="text-sm text-muted-foreground">{rule.desc}</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <code className="text-sm font-mono bg-success/10 text-success px-3 py-2 rounded flex-1">
                  ✓ {rule.good}
                </code>
                <code className="text-sm font-mono bg-destructive/10 text-destructive px-3 py-2 rounded flex-1">
                  ✗ {rule.bad}
                </code>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {parameterTypes.map((param, index) => (
          <Card key={index} className="bg-card border-border">
            <CardHeader>
              <Badge variant="outline" className="w-fit mb-2">{param.type}</Badge>
              <CardTitle className="text-lg">{param.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase mb-1">
                  {language === "zh" ? "用途" : "用途"}
                </p>
                <p className="text-sm text-foreground">{param.usage}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase mb-1">
                  {language === "zh" ? "场景" : "シナリオ"}
                </p>
                <p className="text-sm text-muted-foreground">{param.scenarios}</p>
              </div>
              <code className="block text-xs font-mono bg-muted p-2 rounded break-all">
                {param.example}
              </code>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">
          {language === "zh" ? "URL 参数规范示例" : "URL パラメータ規範例"}
        </h3>
        <CodeBlock code={queryExample} language="typescript" title="Parameter Examples" />
      </div>
    </section>
  )
}
