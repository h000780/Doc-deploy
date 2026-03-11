"use client"

import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Shield, Code, Users } from "lucide-react"

export function OverviewSection() {
  const { language, t } = useLanguage()

  const features = language === "zh" ? [
    {
      icon: Globe,
      title: "RESTful 资源建模",
      description: "URL 表示资源，HTTP 方法表示操作，资源之间通过 URL 路径表达层级关系",
    },
    {
      icon: Shield,
      title: "安全边界清晰",
      description: "资源 ID 在 URL 路径中，便于统一拦截；敏感操作需要显式认证",
    },
    {
      icon: Code,
      title: "开发者友好",
      description: "URL 可读性强，错误信息明确，Swagger 文档自动生成",
    },
    {
      icon: Users,
      title: "一致性优先",
      description: "非公开 API 和公开 API 保持相同的路由风格，命名规范统一",
    },
  ] : [
    {
      icon: Globe,
      title: "RESTful リソースモデリング",
      description: "URL はリソースを表し、HTTP メソッドは操作を表し、リソース間の階層関係は URL パスで表現",
    },
    {
      icon: Shield,
      title: "明確なセキュリティ境界",
      description: "リソース ID は URL パスに配置し、統一的なインターセプトを容易に；機密操作には明示的な認証が必要",
    },
    {
      icon: Code,
      title: "開発者フレンドリー",
      description: "URL の可読性が高く、エラーメッセージが明確、Swagger ドキュメントの自動生成",
    },
    {
      icon: Users,
      title: "一貫性優先",
      description: "非公開 API と公開 API は同じルーティングスタイルを維持し、命名規則を統一",
    },
  ]

  const comparisons = language === "zh" ? [
    { product: "Kintone", style: "查询参数传资源 ID", example: "GET /k/v1/records.json?app=123", comment: "RPC 风格" },
    { product: "Airtable", style: "路径嵌套", example: "GET /v0/{baseId}/{tableId}", comment: "RESTful 主流" },
    { product: "Notion", style: "扁平 + 过滤", example: "POST /v1/databases/{id}/query", comment: "混合风格" },
    { product: "Nata", style: "路径嵌套", example: "GET /api/apps/{appId}/records", comment: "RESTful" },
  ] : [
    { product: "Kintone", style: "クエリパラメータでリソース ID", example: "GET /k/v1/records.json?app=123", comment: "RPC スタイル" },
    { product: "Airtable", style: "パスネスト", example: "GET /v0/{baseId}/{tableId}", comment: "RESTful 主流" },
    { product: "Notion", style: "フラット + フィルタ", example: "POST /v1/databases/{id}/query", comment: "混合スタイル" },
    { product: "Nata", style: "パスネスト", example: "GET /api/apps/{appId}/records", comment: "RESTful" },
  ]

  return (
    <section id="overview" className="space-y-8">
      <div>
        <Badge variant="secondary" className="mb-4">
          {language === "zh" ? "设计理念" : "設計理念"}
        </Badge>
        <h2 className="text-3xl font-bold text-foreground mb-4">
          {language === "zh" ? "API 设计核心原则" : "API 設計コア原則"}
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {language === "zh" 
            ? "本文档定义 nata-api 的 RESTful API 设计规范，包括路由风格、命名约定、请求/响应格式等。"
            : "本ドキュメントは nata-api の RESTful API 設計規範を定義し、ルーティングスタイル、命名規則、リクエスト/レスポンス形式などを含みます。"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <Card key={index} className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">
          {language === "zh" ? "与业界产品对比" : "業界製品との比較"}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  {language === "zh" ? "产品" : "製品"}
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  {language === "zh" ? "API 风格" : "API スタイル"}
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  {language === "zh" ? "示例" : "例"}
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  {language === "zh" ? "评价" : "評価"}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, index) => (
                <tr key={index} className="border-b border-border/50">
                  <td className="py-3 px-4 font-medium text-foreground">{row.product}</td>
                  <td className="py-3 px-4 text-muted-foreground">{row.style}</td>
                  <td className="py-3 px-4">
                    <code className="text-xs bg-muted px-2 py-1 rounded font-mono">{row.example}</code>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={row.product === "Nata" ? "default" : "secondary"}>
                      {row.comment}
                    </Badge>
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
