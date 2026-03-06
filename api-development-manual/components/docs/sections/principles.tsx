"use client"

import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Eye, Layers, Link } from "lucide-react"

export function PrinciplesSection() {
  const { t, language } = useLanguage()

  const principles = [
    {
      icon: Zap,
      titleKey: "principles.restful.title",
      descKey: "principles.restful.desc",
      examples: language === "zh" ? [
        { good: true, text: "GET /users → 获取用户列表" },
        { good: true, text: "POST /users → 创建用户" },
        { good: false, text: "GET /getUsers → URL 包含动词" },
      ] : [
        { good: true, text: "GET /users → ユーザーリストを取得" },
        { good: true, text: "POST /users → ユーザーを作成" },
        { good: false, text: "GET /getUsers → URL に動詞を含む" },
      ],
    },
    {
      icon: Eye,
      titleKey: "principles.semantic.title",
      descKey: "principles.semantic.desc",
      examples: language === "zh" ? [
        { good: true, text: "/api/user-profiles → 清晰的业务含义" },
        { good: true, text: "/api/applications → 使用英语名词" },
        { good: false, text: "/api/up → 含义不明确" },
      ] : [
        { good: true, text: "/api/user-profiles → 明確なビジネス意味" },
        { good: true, text: "/api/applications → 英語名詞を使用" },
        { good: false, text: "/api/up → 意味が不明確" },
      ],
    },
    {
      icon: Layers,
      titleKey: "principles.flattening.title",
      descKey: "principles.flattening.desc",
      examples: language === "zh" ? [
        { good: true, text: "/apps/:id/records → 强依赖用嵌套" },
        { good: true, text: "/users?deptId=xxx → 弱关联用打平" },
        { good: false, text: "/depts/:id/users/:uid/tasks → 路径过深" },
      ] : [
        { good: true, text: "/apps/:id/records → 強い依存にはネスト" },
        { good: true, text: "/users?deptId=xxx → 弱い関連にはフラット化" },
        { good: false, text: "/depts/:id/users/:uid/tasks → パスが深すぎる" },
      ],
    },
    {
      icon: Link,
      titleKey: "principles.consistency.title",
      descKey: "principles.consistency.desc",
      examples: language === "zh" ? [
        { good: true, text: "统一分页: limit/offset" },
        { good: true, text: "统一错误格式: { statusCode, message, error }" },
        { good: false, text: "混用 page/pageSize 和 limit/offset" },
      ] : [
        { good: true, text: "統一ページネーション: limit/offset" },
        { good: true, text: "統一エラー形式: { statusCode, message, error }" },
        { good: false, text: "page/pageSize と limit/offset の混用" },
      ],
    },
  ]

  return (
    <section id="core-principles" className="space-y-8">
      <div>
        <Badge variant="secondary" className="mb-4">Core</Badge>
        <h2 className="text-3xl font-bold text-foreground mb-4">{t("principles.title")}</h2>
        <p className="text-lg text-muted-foreground">
          {language === "zh" 
            ? "遵循以下核心原则，确保 API 设计的一致性和可维护性。"
            : "以下のコア原則に従い、API 設計の一貫性と保守性を確保します。"}
        </p>
      </div>

      <div className="space-y-6">
        {principles.map((principle, index) => {
          const Icon = principle.icon
          return (
            <Card key={index} className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{t(principle.titleKey)}</CardTitle>
                    <p className="text-muted-foreground mt-1">{t(principle.descKey)}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {principle.examples.map((example, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        example.good ? "bg-success/10" : "bg-destructive/10"
                      }`}
                    >
                      <span className={example.good ? "text-success" : "text-destructive"}>
                        {example.good ? "✓" : "✗"}
                      </span>
                      <code className="text-sm font-mono">{example.text}</code>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
