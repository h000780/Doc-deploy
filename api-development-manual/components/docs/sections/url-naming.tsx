"use client"

import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/docs/code-block"

export function UrlNamingSection() {
  const { t, language } = useLanguage()

  const rules = language === "zh" ? [
    {
      title: "全小写，连字符分隔 (Kebab-case)",
      correct: ["/api/v1/user-profiles", "/api/v1/app-settings"],
      incorrect: ["/api/v1/userProfiles", "/api/v1/user_profiles"],
    },
    {
      title: "资源使用复数名词",
      correct: ["/api/apps", "/api/users", "/api/records"],
      incorrect: ["/api/app", "/api/userList", "/api/record"],
    },
    {
      title: "层级结构：集合 → ID → 子资源",
      correct: [
        "/api/apps/:appId",
        "/api/apps/:appId/records",
        "/api/apps/:appId/records/:recordId",
      ],
      incorrect: ["/api/records?appId=123", "/api/getAppRecords"],
    },
  ] : [
    {
      title: "すべて小文字、ハイフン区切り（Kebab-case）",
      correct: ["/api/v1/user-profiles", "/api/v1/app-settings"],
      incorrect: ["/api/v1/userProfiles", "/api/v1/user_profiles"],
    },
    {
      title: "リソースには複数名詞を使用",
      correct: ["/api/apps", "/api/users", "/api/records"],
      incorrect: ["/api/app", "/api/userList", "/api/record"],
    },
    {
      title: "階層構造：コレクション → ID → サブリソース",
      correct: [
        "/api/apps/:appId",
        "/api/apps/:appId/records",
        "/api/apps/:appId/records/:recordId",
      ],
      incorrect: ["/api/records?appId=123", "/api/getAppRecords"],
    },
  ]

  const routeStructure = `
/api                           # 非公開 API 根路径
├── /auth/*                    # 認証関連
├── /apps                      # アプリリソース
│   ├── GET    /               # アプリリスト
│   ├── POST   /               # アプリ作成
│   └── /:appId                # 単一アプリ
│       ├── GET    /           # アプリ詳細
│       ├── PUT    /           # アプリ更新
│       ├── DELETE /           # アプリ削除
│       └── /records           # レコードサブリソース
│           ├── GET    /       # レコードリスト
│           ├── POST   /       # レコード作成
│           ├── POST   /search # 条件検索
│           └── /:recordId     # 単一レコード
├── /users/*                   # ユーザー管理
├── /admin/*                   # システム管理
└── /upload/*                  # ファイルアップロード

/api/v1                        # 公开 API 根路径（バージョン化）
└── /apps/:appId/records/*     # 公開レコード API
`.trim()

  return (
    <section id="url-naming" className="space-y-8">
      <div>
        <Badge variant="secondary" className="mb-4">Naming</Badge>
        <h2 className="text-3xl font-bold text-foreground mb-4">{t("url.title")}</h2>
        <p className="text-lg text-muted-foreground">
          {language === "zh"
            ? "统一的 URL 命名规范有助于提高 API 的可读性和一致性。"
            : "統一された URL 命名規則は API の可読性と一貫性を向上させます。"}
        </p>
      </div>

      <div className="space-y-6">
        {rules.map((rule, index) => (
          <Card key={index} className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">{rule.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-success mb-2">
                  {t("common.correct")}
                </p>
                <div className="space-y-1">
                  {rule.correct.map((item, idx) => (
                    <code
                      key={idx}
                      className="block text-sm font-mono bg-success/10 text-success px-3 py-2 rounded"
                    >
                      ✓ {item}
                    </code>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-destructive mb-2">
                  {t("common.incorrect")}
                </p>
                <div className="space-y-1">
                  {rule.incorrect.map((item, idx) => (
                    <code
                      key={idx}
                      className="block text-sm font-mono bg-destructive/10 text-destructive px-3 py-2 rounded"
                    >
                      ✗ {item}
                    </code>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">
          {language === "zh" ? "路由层级结构" : "ルート階層構造"}
        </h3>
        <CodeBlock
          code={routeStructure}
          language="plaintext"
          title={language === "zh" ? "路由结构示例" : "ルート構造例"}
        />
      </div>
    </section>
  )
}
