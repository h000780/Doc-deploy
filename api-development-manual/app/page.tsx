"use client";

import React from "react"

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Globe,
  FileCode,
  Shield,
  Server,
  ArrowRight,
  ChevronRight,
  Check,
  X,
  AlertCircle,
  Lock,
  Key,
  Users,
  Code2,
  Layers,
} from "lucide-react";

type Language = "zh" | "ja";
type TabId =
  | "overview"
  | "url-naming"
  | "http-methods"
  | "parameters"
  | "response"
  | "auth-architecture"
  | "implementation"
  | "best-practices";

const translations = {
  zh: {
    title: "Nata API 设计规范手册",
    subtitle: "内部开发参考文档",
    langSwitch: "日本語",
    tabs: {
      overview: "概述",
      "url-naming": "URL命名",
      "http-methods": "HTTP方法",
      parameters: "参数规范",
      response: "响应格式",
      "auth-architecture": "认证架构",
      implementation: "NestJS实现",
      "best-practices": "最佳实践",
    },
  },
  ja: {
    title: "Nata API設計仕様書",
    subtitle: "内部開発参照ドキュメント",
    langSwitch: "中文",
    tabs: {
      overview: "概要",
      "url-naming": "URL命名",
      "http-methods": "HTTPメソッド",
      parameters: "パラメータ仕様",
      response: "レスポンス形式",
      "auth-architecture": "認証アーキテクチャ",
      implementation: "NestJS実装",
      "best-practices": "ベストプラクティス",
    },
  },
};

export default function ApiManual() {
  const [lang, setLang] = useState<Language>("zh");
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  const t = translations[lang];

  const tabs: { id: TabId; icon: React.ReactNode }[] = [
    { id: "overview", icon: <BookOpen className="h-4 w-4" /> },
    { id: "url-naming", icon: <Globe className="h-4 w-4" /> },
    { id: "http-methods", icon: <FileCode className="h-4 w-4" /> },
    { id: "parameters", icon: <Code2 className="h-4 w-4" /> },
    { id: "response", icon: <Server className="h-4 w-4" /> },
    { id: "auth-architecture", icon: <Shield className="h-4 w-4" /> },
    { id: "implementation", icon: <Layers className="h-4 w-4" /> },
    { id: "best-practices", icon: <Check className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground">{t.title}</h1>
            <p className="text-sm text-muted-foreground">{t.subtitle}</p>
          </div>
          <button
            onClick={() => setLang(lang === "zh" ? "ja" : "zh")}
            className="flex items-center gap-2 rounded-md border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent"
          >
            <Globe className="h-4 w-4" />
            {t.langSwitch}
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-6">
        <div className="flex gap-6">
          {/* Sidebar Navigation */}
          <nav className="sticky top-24 h-fit w-56 shrink-0">
            <ul className="space-y-1">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    {tab.icon}
                    {t.tabs[tab.id]}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Main Content */}
          <main className="min-w-0 flex-1">
            <div className="rounded-lg border border-border bg-card p-8">
              {activeTab === "overview" && <OverviewSection lang={lang} />}
              {activeTab === "url-naming" && <UrlNamingSection lang={lang} />}
              {activeTab === "http-methods" && (
                <HttpMethodsSection lang={lang} />
              )}
              {activeTab === "parameters" && <ParametersSection lang={lang} />}
              {activeTab === "response" && <ResponseSection lang={lang} />}
              {activeTab === "auth-architecture" && (
                <AuthArchitectureSection lang={lang} />
              )}
              {activeTab === "implementation" && (
                <ImplementationSection lang={lang} />
              )}
              {activeTab === "best-practices" && (
                <BestPracticesSection lang={lang} />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function CodeBlock({
  children,
  title,
}: {
  children: string;
  title?: string;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-code-bg">
      {title && (
        <div className="border-b border-border bg-muted/50 px-4 py-2 text-xs font-medium text-muted-foreground">
          {title}
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-sm text-code-foreground">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 text-2xl font-semibold text-foreground">{children}</h2>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <h3 className="mb-4 text-lg font-medium text-foreground">{title}</h3>
      {children}
    </div>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 leading-relaxed text-muted-foreground">{children}</p>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="mb-4 space-y-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-2 text-muted-foreground"
        >
          <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="mb-4 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left font-medium text-foreground"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-border"
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-4 py-3 text-muted-foreground"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GoodBadExample({
  good,
  bad,
  lang,
}: {
  good: string[];
  bad: string[];
  lang: Language;
}) {
  const labels = {
    zh: { good: "正确", bad: "错误" },
    ja: { good: "正しい", bad: "誤り" },
  };
  return (
    <div className="mb-4 grid gap-4 md:grid-cols-2">
      <div className="rounded-md border border-success/30 bg-success/10 p-4">
        <div className="mb-2 flex items-center gap-2 font-medium text-success">
          <Check className="h-4 w-4" />
          {labels[lang].good}
        </div>
        {good.map((item, i) => (
          <code
            key={i}
            className="mb-1 block text-sm text-foreground"
          >
            {item}
          </code>
        ))}
      </div>
      <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4">
        <div className="mb-2 flex items-center gap-2 font-medium text-destructive">
          <X className="h-4 w-4" />
          {labels[lang].bad}
        </div>
        {bad.map((item, i) => (
          <code
            key={i}
            className="mb-1 block text-sm text-foreground"
          >
            {item}
          </code>
        ))}
      </div>
    </div>
  );
}

function AuthScenarioDiagram({ lang }: { lang: Language }) {
  const isZh = lang === "zh";

  return (
    <div className="mx-auto my-8 w-full max-w-xl select-none">
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/40 bg-muted/20 px-4 py-2">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold text-foreground">
              {isZh ? "Public API 认证流转图" : "Public API 認証フロー図"}
            </span>
          </div>
          <span className="font-mono text-[9px] text-muted-foreground opacity-70">
            DIRECT ACCESS MODEL
          </span>
        </div>

        {/* Diagram Canvas */}
        <div className="relative h-[240px] w-full bg-slate-50/50 dark:bg-slate-950/20">
          {/* 1. SVG Layer (Connections) */}
          <svg
            className="absolute inset-0 h-full w-full overflow-visible pointer-events-none"
            preserveAspectRatio="none"
          >
            <defs>
              <marker
                id="arrow-blue"
                markerWidth="8"
                markerHeight="8"
                refX="7"
                refY="4"
                orientation="auto"
              >
                <path d="M0,0 L8,4 L0,8 Z" fill="#60a5fa" />
              </marker>
              <marker
                id="arrow-mixed"
                markerWidth="8"
                markerHeight="8"
                refX="7"
                refY="4"
                orientation="auto"
              >
                <path d="M0,0 L8,4 L0,8 Z" fill="#f59e0b" />
              </marker>
            </defs>

            {/* Path 1: Public -> Public API (Straight Line) */}
            <line
              x1="160"
              y1="60"
              x2="410"
              y2="110"
              stroke="#60a5fa"
              strokeWidth="2"
              strokeDasharray="6 4"
              markerEnd="url(#arrow-blue)"
            />

            {/* Path 2: Official -> Public API (Straight Line) */}
            <line
              x1="160"
              y1="180"
              x2="410"
              y2="130"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="6 4"
              markerEnd="url(#arrow-mixed)"
            />
          </svg>

          {/* 2. Nodes Layer */}

          {/* Public Node (Top Left) */}
          <div className="absolute left-[30px] top-[30px] w-32">
            <div className="flex flex-col items-center gap-2 rounded-lg border border-blue-200 bg-blue-50/80 p-3 shadow-sm backdrop-blur-sm dark:bg-blue-950/30">
              <Server className="h-5 w-5 text-blue-500" />
              <div className="text-center">
                <div className="text-[10px] font-bold text-blue-700 dark:text-blue-300">
                  {isZh ? "外部集成系统" : "外部連携システム"}
                </div>
                <div className="text-[8px] text-blue-500/70">
                  3rd Party Server
                </div>
              </div>
            </div>
          </div>

          {/* Official Node (Bottom Left) */}
          <div className="absolute left-[30px] top-[150px] w-32">
            <div className="flex flex-col items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3 shadow-sm backdrop-blur-sm">
              <Users className="h-5 w-5 text-primary" />
              <div className="text-center">
                <div className="text-[10px] font-bold text-primary">
                  {isZh ? "官方客户端" : "公式クライアント"}
                </div>
                <div className="text-[8px] text-muted-foreground">
                  JS API / Custom
                </div>
              </div>
            </div>
          </div>

          {/* Target Node (Right Center) */}
          <div className="absolute right-[40px] top-[50%] w-40 -translate-y-1/2">
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/30 bg-background p-5 shadow-lg">
              <div className="text-sm font-bold italic text-primary">
                Public API
              </div>
              <div className="mt-1 font-mono text-[10px] text-muted-foreground">
                /api/v1/*
              </div>
            </div>
          </div>

          {/* 3. Path Labels */}

          {/* Label: Public -> Token */}
          {/* Positioned on the top line */}
          <div className="absolute left-[240px] top-[75px] -translate-x-1/2 -translate-y-1/2 rotate-[12deg]">
            <span className="rounded bg-background px-1.5 py-0.5 text-[9px] font-bold text-blue-500 shadow-sm border border-blue-100">
              API Token
            </span>
          </div>

          {/* Label: Official -> Mixed */}
          {/* Positioned on the bottom line */}
          <div className="absolute left-[240px] top-[165px] -translate-x-1/2 -translate-y-1/2 -rotate-[12deg]">
             <div className="flex items-center gap-1.5 rounded bg-background px-2 py-1 shadow-sm border border-orange-100">
                <span className="flex items-center gap-1 text-[9px] font-bold text-green-600">
                  <Lock className="h-3 w-3" /> Session
                </span>
                <span className="text-[9px] text-muted-foreground/50">/</span>
                <span className="flex items-center gap-1 text-[9px] font-bold text-orange-500">
                  <Key className="h-3 w-3" /> Token
                </span>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ===== Section Components =====

function OverviewSection({ lang }: { lang: Language }) {
  if (lang === "zh") {
    return (
      <div>
        <SectionTitle>概述与核心原则</SectionTitle>
        <Paragraph>
          本文档定义了 Nata 项目中后端 API 接口的设计规范。所有新增和维护的 API
          均需遵循此标准，以确保系统的一致性、可维护性和易用性。
        </Paragraph>

        <SubSection title="核心原则">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "RESTful 优先",
                desc: "资源导向设计，URL 代表「资源」，HTTP Method 代表「动作」",
              },
              {
                title: "语义清晰",
                desc: "接口路径和参数应具有明确的业务含义，优先使用英语名词",
              },
              {
                title: "扁平化与关联",
                desc: "强依赖用嵌套，弱关联用打平；不要为了表达关系而无限加深 URL 路径",
              },
              {
                title: "一致性",
                desc: "整个系统的分页、筛选、错误码格式必须完全统一",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-md border border-border bg-muted/30 p-4"
              >
                <h4 className="mb-2 font-medium text-foreground">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title="与业界产品对比">
          <Table
            headers={["产品", "API 风格", "示例"]}
            rows={[
              ["Kintone", "查询参数传资源ID", "GET /k/v1/records.json?app=123"],
              ["Airtable", "路径嵌套", "GET /v0/{baseId}/{tableId}"],
              ["Notion", "扁平 + 过滤", "POST /v1/databases/{id}/query"],
              ["Nata", "路径嵌套", "GET /api/apps/{appId}/records"],
            ]}
          />
        </SubSection>

        <SubSection title="Private API vs Public API">
          <Paragraph>
            Private API 仅支持内部客户端通过 Cookie (Session) 认证；
            而 Public API 支持<strong>全场景混合认证</strong>。外部系统主要使用 API Token (Bearer Token)，而内部 JS SDK 则可灵活选择 Cookie 或 API Token。
          </Paragraph>
          <Table
            headers={["特征", "Private API (非公開)", "Public API (公開)"]}
            rows={[
              ["受众", "官方客户端 (PC/Mobile/MP)", "第三方系统、集成脚本、内部 JS SDK"],
              ["稳定性", "可能频繁变更", "极端注重兼容性"],
              ["版本控制", "通常不严格区分版本", "强制版本化 (/v1/, /v2/)"],
              ["限流策略", "较宽松", "严格限流 (基于 App 与 Token)"],
              ["认证方式", "仅 Cookie (Session)", "Cookie (Session) 或 API Token"],
              ["路径前缀", "/api/...", "/api/v1/..."],
            ]}
          />
          <div className="mt-6 rounded-md border border-border bg-muted/50 p-4">
            <h4 className="mb-2 font-medium text-foreground">架构优势：底层统一</h4>
            <p className="text-sm text-muted-foreground">
              虽然访问层物理隔离，但 Private 与 Public API 共享同一套 Service
              层逻辑。这意味着业务更新双侧同步生效，且内部接口公开化只需增加路由与
              DTO 过滤，极大降低维护成本并确保行为一致。
            </p>
          </div>
        </SubSection>
      </div>
    );
  }

  return (
    <div>
      <SectionTitle>概要とコア原則</SectionTitle>
      <Paragraph>
        本ドキュメントは、Nata
        プロジェクトにおけるバックエンドAPI設計仕様を定義します。すべての新規・保守APIはこの標準に従い、システムの一貫性、保守性、使いやすさを確保します。
      </Paragraph>

      <SubSection title="コア原則">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              title: "RESTful優先",
              desc: "リソース指向設計。URLは「リソース」、HTTPメソッドは「アクション」を表す",
            },
            {
              title: "セマンティクスの明確化",
              desc: "パスとパラメータは明確なビジネス意味を持ち、英語名詞を優先使用",
            },
            {
              title: "フラット化と関連",
              desc: "強い依存関係はネスト、弱い関連はフラット化。URL階層を無限に深くしない",
            },
            {
              title: "一貫性",
              desc: "ページネーション、フィルタリング、エラーコード形式はシステム全体で統一",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-md border border-border bg-muted/30 p-4"
            >
              <h4 className="mb-2 font-medium text-foreground">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </SubSection>

      <SubSection title="業界製品との比較">
        <Table
          headers={["製品", "APIスタイル", "例"]}
          rows={[
            [
              "Kintone",
              "クエリパラメータでリソースID",
              "GET /k/v1/records.json?app=123",
            ],
            ["Airtable", "パスネスト", "GET /v0/{baseId}/{tableId}"],
            ["Notion", "フラット + フィルタ", "POST /v1/databases/{id}/query"],
            ["Nata", "パスネスト", "GET /api/apps/{appId}/records"],
          ]}
        />
      </SubSection>

      <SubSection title="Private API vs Public API">
        <Paragraph>
          Private API は内部クライアントからの Cookie (Session) 認証のみをサポートします。
          一方、Public API は<strong>全シナリオでの混合認証</strong>をサポートします。外部システムは主に API Token (Bearer Token) を使用し、内部 JS SDK は状況に応じて Cookie または API Token を選択できます。
        </Paragraph>
        <Table
          headers={["特徴", "Private API (非公開)", "Public API (公開)"]}
          rows={[
            ["対象", "公式クライアント (PC/Mobile/MP) のみ", "サードパーティシステム、内部 JS SDK"],
            ["安定性", "頻繁に変更可能", "互換性を極めて重視"],
            ["バージョン管理", "通常バージョン区別なし", "必須バージョン化 (/v1/, /v2/)"],
            ["レート制限", "緩め", "厳格な制限 (App と Token に基づく)"],
            ["認証方式", "Cookie (Session) のみ", "Cookie (Session) または API Token"],
            ["パスプレフィックス", "/api/...", "/api/v1/..."],
          ]}
        />
        <div className="mt-6 rounded-md border border-border bg-muted/50 p-4">
          <h4 className="mb-2 font-medium text-foreground">
            アーキテクチャの利点：基盤統一
          </h4>
          <p className="text-sm text-muted-foreground">
            アクセス層は分離されていますが、InternalとExternal
            APIは同一のService層ロジックを共有しています。これにより、ビジネスロジックの更新は双方に即座に反映され、非公開APIの公開化もルーティングとDTOフィルタの追加のみで済むため、保守コストを削減しつつ挙動の一致を保証します。
          </p>
        </div>
      </SubSection>
    </div>
  );
}

function UrlNamingSection({ lang }: { lang: Language }) {
  if (lang === "zh") {
    return (
      <div>
        <SectionTitle>URL 命名规范</SectionTitle>

        <SubSection title="基本规则">
          <List
            items={[
              "全小写，连字符分隔 (Kebab-case)",
              "资源使用复数名词",
              "层级结构: 集合 → ID → 子资源",
            ]}
          />
          <GoodBadExample
            lang={lang}
            good={["/api/v1/user-profiles", "/api/apps", "/api/users"]}
            bad={["/api/v1/userProfiles", "/api/app", "/api/userList"]}
          />
        </SubSection>

        <SubSection title="路由层级结构">
          <CodeBlock title="路由结构示例">
            {`/api                           # 非公开 API 根路径
├── /auth/*                    # 认证相关
├── /apps                      # 应用资源
│   ├── GET    /               # 应用列表
│   ├── POST   /               # 创建应用
│   └── /:appId                # 单个应用
│       ├── GET    /           # 应用详情
│       ├── PUT    /           # 更新应用
│       ├── DELETE /           # 删除应用
│       └── /records           # 记录子资源
│           ├── GET    /       # 记录列表
│           ├── POST   /       # 创建记录
│           └── /:recordId     # 单条记录

/api/v1                        # 公开 API 根路径 (版本化)
└── /apps/:appId/records/*     # 外部记录 API`}
          </CodeBlock>
        </SubSection>

        <SubSection title="命名示例">
          <GoodBadExample
            lang={lang}
            good={[
              "GET /api/apps                    # 复数名词表示集合",
              "GET /api/apps/:appId             # 单数资源",
              "GET /api/apps/:appId/records     # 子资源集合",
              "POST /api/apps/:appId/records/search  # 动词仅用于非CRUD",
            ]}
            bad={[
              "GET /api/getApps                 # 不要在 URL 中用动词",
              "GET /api/app/:appId              # 集合应使用复数",
              "POST /api/apps/:appId/createRecord  # POST 本身表示创建",
              "GET /api/records?appId=123       # 子资源应嵌套在父资源下",
            ]}
          />
        </SubSection>
      </div>
    );
  }

  return (
    <div>
      <SectionTitle>URL命名規則</SectionTitle>

      <SubSection title="基本ルール">
        <List
          items={[
            "全て小文字、ハイフン区切り (Kebab-case)",
            "リソースは複数形名詞を使用",
            "階層構造: コレクション → ID → サブリソース",
          ]}
        />
        <GoodBadExample
          lang={lang}
          good={["/api/v1/user-profiles", "/api/apps", "/api/users"]}
          bad={["/api/v1/userProfiles", "/api/app", "/api/userList"]}
        />
      </SubSection>

      <SubSection title="ルート階層構造">
        <CodeBlock title="ルート構造例">
          {`/api                           # 非公開API ルートパス
├── /auth/*                    # 認証関連
├── /apps                      # アプリリソース
│   ├── GET    /               # アプリ一覧
│   ├── POST   /               # アプリ作成
│   └── /:appId                # 単一アプリ
│       ├── GET    /           # アプリ詳細
│       ├── PUT    /           # アプリ更新
│       ├── DELETE /           # アプリ削除
│       └── /records           # レコードサブリソース
│           ├── GET    /       # レコード一覧
│           ├── POST   /       # レコード作成
│           └── /:recordId     # 単一レコード

/api/v1                        # 外部API ルートパス (バージョン化)
└── /apps/:appId/records/*     # 外部レコードAPI`}
        </CodeBlock>
      </SubSection>

      <SubSection title="命名例">
        <GoodBadExample
          lang={lang}
          good={[
            "GET /api/apps                    # 複数形名詞でコレクション",
            "GET /api/apps/:appId             # 単一リソース",
            "GET /api/apps/:appId/records     # サブリソースコレクション",
            "POST /api/apps/:appId/records/search  # 動詞は非CRUDのみ",
          ]}
          bad={[
            "GET /api/getApps                 # URLに動詞を使わない",
            "GET /api/app/:appId              # コレクションは複数形",
            "POST /api/apps/:appId/createRecord  # POST自体が作成を表す",
            "GET /api/records?appId=123       # サブリソースは親にネスト",
          ]}
        />
      </SubSection>
    </div>
  );
}

function HttpMethodsSection({ lang }: { lang: Language }) {
  if (lang === "zh") {
    return (
      <div>
        <SectionTitle>HTTP 方法规范</SectionTitle>

        <SubSection title="方法语义">
          <Table
            headers={["方法", "用途", "幂等性", "Body", "示例"]}
            rows={[
              ["GET", "读取资源详情或列表", "是", "严禁", "GET /users, GET /users/1"],
              [
                "POST",
                "创建资源 / 复杂动作",
                "否",
                "必须",
                "POST /users, POST /users/search",
              ],
              ["PUT", "完全替换资源", "是", "必须", "PUT /configs/system"],
              ["PATCH", "部分更新资源 (推荐)", "否", "必须", "PATCH /users/1"],
              ["DELETE", "删除资源", "是", "不建议", "DELETE /users/1"],
            ]}
          />
        </SubSection>

        <SubSection title="使用示例">
          <CodeBlock title="CRUD 操作示例">
            {`// 创建资源 - POST
POST /api/apps/:appId/records
{ "values": { "title": "新记录" } }
// 返回 201 Created + 新资源

// 全量更新 - PUT (替换整个资源)
PUT /api/apps/:appId/records/:recordId
{ "values": { "title": "更新标题", "status": "done" } }
// 返回 200 OK + 更新后的资源

// 部分更新 - PATCH (仅更新指定字段)
PATCH /api/apps/:appId/records/:recordId
{ "values": { "status": "done" } }
// 返回 200 OK + 更新后的资源

// 删除资源 - DELETE
DELETE /api/apps/:appId/records/:recordId
// 返回 200 OK 或 204 No Content`}
          </CodeBlock>
        </SubSection>

        <SubSection title="批量操作">
          <CodeBlock title="批量删除示例">
            {`// 非公开 API - 批量删除
DELETE /api/apps/:appId/records/batch
{ "ids": ["id1", "id2", "id3"] }

// 公开 API - 批量删除 (保持一致性)
DELETE /api/v1/apps/:appId/records/batch
{ "ids": ["id1", "id2", "id3"] }`}
          </CodeBlock>
        </SubSection>
      </div>
    );
  }

  return (
    <div>
      <SectionTitle>HTTPメソッド仕様</SectionTitle>

      <SubSection title="メソッドセマンティクス">
        <Table
          headers={["メソッド", "用途", "冪等性", "Body", "例"]}
          rows={[
            ["GET", "リソース詳細/一覧取得", "はい", "禁止", "GET /users, GET /users/1"],
            [
              "POST",
              "リソース作成 / 複雑操作",
              "いいえ",
              "必須",
              "POST /users, POST /users/search",
            ],
            ["PUT", "リソース完全置換", "はい", "必須", "PUT /configs/system"],
            ["PATCH", "部分更新 (推奨)", "いいえ", "必須", "PATCH /users/1"],
            ["DELETE", "リソース削除", "はい", "非推奨", "DELETE /users/1"],
          ]}
        />
      </SubSection>

      <SubSection title="使用例">
        <CodeBlock title="CRUD操作例">
          {`// リソース作成 - POST
POST /api/apps/:appId/records
{ "values": { "title": "新規レコード" } }
// 201 Created + 新リソースを返す

// 全量更新 - PUT (リソース全体を置換)
PUT /api/apps/:appId/records/:recordId
{ "values": { "title": "更新タイトル", "status": "done" } }
// 200 OK + 更新後のリソースを返す

// 部分更新 - PATCH (指定フィールドのみ)
PATCH /api/apps/:appId/records/:recordId
{ "values": { "status": "done" } }
// 200 OK + 更新後のリソースを返す

// リソース削除 - DELETE
DELETE /api/apps/:appId/records/:recordId
// 200 OK または 204 No Contentを返す`}
        </CodeBlock>
      </SubSection>

      <SubSection title="バッチ操作">
        <CodeBlock title="バッチ削除例">
          {`// 非公開API - バッチ削除
DELETE /api/apps/:appId/records/batch
{ "ids": ["id1", "id2", "id3"] }

// 外部API - バッチ削除 (一貫性を保持)
DELETE /api/v1/apps/:appId/records/batch
{ "ids": ["id1", "id2", "id3"] }`}
        </CodeBlock>
      </SubSection>
    </div>
  );
}

function ParametersSection({ lang }: { lang: Language }) {
  if (lang === "zh") {
    return (
      <div>
        <SectionTitle>参数传递规范</SectionTitle>

        <div className="mb-6 rounded-md border border-warning/30 bg-warning/10 p-4">
          <div className="mb-2 flex items-center gap-2 font-medium text-warning">
            <AlertCircle className="h-5 w-5" />
            黄金法则：ID 进 Path，条件进 Query
          </div>
          <p className="text-sm text-muted-foreground">
            这是开发者最容易混淆的部分，请严格遵守
          </p>
        </div>

        <SubSection title="Path Params (路径参数)">
          <Paragraph>用途：唯一标识资源。场景：AppID, UserID, RecordID 等核心定位符。</Paragraph>
          <GoodBadExample
            lang={lang}
            good={["GET /users/1001  # 我要找 1001 号用户"]}
            bad={["GET /users?id=1001  # 过时写法"]}
          />
        </SubSection>

        <SubSection title="Query Params (查询参数)">
          <Paragraph>用途：筛选、分页、排序、视图修饰。</Paragraph>
          <CodeBlock title="查询参数示例">
            {`// 筛选
GET /api/apps/:appId/records?status=active&deptId=xxx

// 分页
?limit=20&offset=0

// 排序
?sort=-createdAt

// 字段选择
?fields=id,name`}
          </CodeBlock>
        </SubSection>

        <SubSection title="Request Body (请求体)">
          <Paragraph>
            用途：传输业务数据。通常用于 Create (POST) 和 Update (PATCH)。格式：统一使用 application/json。
          </Paragraph>
          <CodeBlock title="请求体示例">
            {`// 创建/更新记录
{
  "values": {
    "title": "记录标题",
    "status": "pending",
    "assignee": ["user-1", "user-2"]
  }
}

// 条件搜索
{
  "conditions": [
    { "field": "status", "operator": "eq", "value": "done" },
    { "field": "createdAt", "operator": "gte", "value": "2024-01-01" }
  ],
  "limit": 20,
  "offset": 0
}`}
          </CodeBlock>
        </SubSection>

        <SubSection title="条件操作符">
          <Table
            headers={["操作符", "说明", "示例"]}
            rows={[
              ["eq / equals", "等于", '{ "field": "status", "operator": "eq", "value": "done" }'],
              ["ne / neq", "不等于", '{ "field": "status", "operator": "ne", "value": "cancelled" }'],
              ["gt / gte", "大于 / 大于等于", '{ "field": "amount", "operator": "gt", "value": 100 }'],
              ["lt / lte", "小于 / 小于等于", '{ "field": "amount", "operator": "lt", "value": 1000 }'],
              ["contains", "包含", '{ "field": "title", "operator": "contains", "value": "重要" }'],
              ["in", "在列表中", '{ "field": "status", "operator": "in", "value": ["done", "pending"] }'],
            ]}
          />
        </SubSection>
      </div>
    );
  }

  return (
    <div>
      <SectionTitle>パラメータ仕様</SectionTitle>

      <div className="mb-6 rounded-md border border-warning/30 bg-warning/10 p-4">
        <div className="mb-2 flex items-center gap-2 font-medium text-warning">
          <AlertCircle className="h-5 w-5" />
          黄金ルール：IDはPath、条件はQuery
        </div>
        <p className="text-sm text-muted-foreground">
          開発者が最も混同しやすい部分です。厳格に従ってください
        </p>
      </div>

      <SubSection title="Path Params (パスパラメータ)">
        <Paragraph>用途：リソースの一意識別。場景：AppID, UserID, RecordID等のコア識別子。</Paragraph>
        <GoodBadExample
          lang={lang}
          good={["GET /users/1001  # ユーザー1001を取得"]}
          bad={["GET /users?id=1001  # 古い書き方"]}
        />
      </SubSection>

      <SubSection title="Query Params (クエリパラメータ)">
        <Paragraph>用途：フィルタリング、ページネーション、ソート、ビュー修飾。</Paragraph>
        <CodeBlock title="クエリパラメータ例">
          {`// フィルタリング
GET /api/apps/:appId/records?status=active&deptId=xxx

// ページネーション
?limit=20&offset=0

// ソート
?sort=-createdAt

// フィールド選択
?fields=id,name`}
        </CodeBlock>
      </SubSection>

      <SubSection title="Request Body (リクエストボディ)">
        <Paragraph>
          用途：ビジネスデータの送信。通常 Create (POST) と Update (PATCH)
          で使用。形式：application/json統一。
        </Paragraph>
        <CodeBlock title="リクエストボディ例">
          {`// レコード作成/更新
{
  "values": {
    "title": "レコードタイトル",
    "status": "pending",
    "assignee": ["user-1", "user-2"]
  }
}

// 条件検索
{
  "conditions": [
    { "field": "status", "operator": "eq", "value": "done" },
    { "field": "createdAt", "operator": "gte", "value": "2024-01-01" }
  ],
  "limit": 20,
  "offset": 0
}`}
        </CodeBlock>
      </SubSection>

      <SubSection title="条件演算子">
        <Table
          headers={["演算子", "説明", "例"]}
          rows={[
            ["eq / equals", "等しい", '{ "field": "status", "operator": "eq", "value": "done" }'],
            ["ne / neq", "等しくない", '{ "field": "status", "operator": "ne", "value": "cancelled" }'],
            ["gt / gte", "より大きい / 以上", '{ "field": "amount", "operator": "gt", "value": 100 }'],
            ["lt / lte", "より小さい / 以下", '{ "field": "amount", "operator": "lt", "value": 1000 }'],
            ["contains", "含む", '{ "field": "title", "operator": "contains", "value": "重要" }'],
            ["in", "リスト内", '{ "field": "status", "operator": "in", "value": ["done", "pending"] }'],
          ]}
        />
      </SubSection>
    </div>
  );
}

function ResponseSection({ lang }: { lang: Language }) {
  if (lang === "zh") {
    return (
      <div>
        <SectionTitle>响应格式规范</SectionTitle>

        <SubSection title="成功响应">
          <CodeBlock title="响应格式示例">
            {`// 单资源
{
  "id": "rec_123",
  "appId": "app_456",
  "values": { "title": "记录标题" },
  "createdAt": "2024-01-15T10:30:00Z",
  "createdBy": "user_789"
}

// 集合 + 分页
{
  "data": [
    { "id": "rec_1", ... },
    { "id": "rec_2", ... }
  ],
  "pagination": {
    "total": 100,
    "limit": 20,
    "offset": 0
  }
}

// 操作结果
{
  "success": true,
  "message": "操作成功"
}`}
          </CodeBlock>
        </SubSection>

        <SubSection title="错误响应">
          <CodeBlock title="错误格式示例">
            {`// 标准错误格式
{
  "statusCode": 400,
  "message": "请求参数错误",
  "error": "Bad Request",
  "details": [
    { "field": "values.title", "message": "标题不能为空" }
  ]
}

// 认证错误
{
  "statusCode": 401,
  "message": "认证失败: Token 无效",
  "error": "Unauthorized"
}

// 权限错误
{
  "statusCode": 403,
  "message": "无权访问此应用",
  "error": "Forbidden"
}`}
          </CodeBlock>
        </SubSection>

        <SubSection title="HTTP 状态码">
          <Table
            headers={["状态码", "含义", "使用场景"]}
            rows={[
              ["200", "OK", "GET/PUT/PATCH/DELETE 成功"],
              ["201", "Created", "POST 创建成功"],
              ["204", "No Content", "DELETE 成功，无返回内容"],
              ["400", "Bad Request", "请求参数错误"],
              ["401", "Unauthorized", "未认证或认证失败"],
              ["403", "Forbidden", "无权限访问"],
              ["404", "Not Found", "资源不存在"],
              ["409", "Conflict", "资源冲突 (如唯一性约束)"],
              ["422", "Unprocessable Entity", "业务规则校验失败"],
              ["429", "Too Many Requests", "限流"],
              ["500", "Private Server Error", "服务器内部错误"],
            ]}
          />
        </SubSection>
      </div>
    );
  }

  return (
    <div>
      <SectionTitle>レスポンス形式仕様</SectionTitle>

      <SubSection title="成功レスポンス">
        <CodeBlock title="レスポンス形式例">
          {`// 単一リソース
{
  "id": "rec_123",
  "appId": "app_456",
  "values": { "title": "レコードタイトル" },
  "createdAt": "2024-01-15T10:30:00Z",
  "createdBy": "user_789"
}

// コレクション + ページネーション
{
  "data": [
    { "id": "rec_1", ... },
    { "id": "rec_2", ... }
  ],
  "pagination": {
    "total": 100,
    "limit": 20,
    "offset": 0
  }
}

// 操作結果
{
  "success": true,
  "message": "操作成功"
}`}
        </CodeBlock>
      </SubSection>

      <SubSection title="エラーレスポンス">
        <CodeBlock title="エラー形式例">
          {`// 標準エラー形式
{
  "statusCode": 400,
  "message": "リクエストパラメータエラー",
  "error": "Bad Request",
  "details": [
    { "field": "values.title", "message": "タイトルは必須です" }
  ]
}

// 認証エラー
{
  "statusCode": 401,
  "message": "認証失敗: Token無効",
  "error": "Unauthorized"
}

// 権限エラー
{
  "statusCode": 403,
  "message": "このアプリへのアクセス権限がありません",
  "error": "Forbidden"
}`}
        </CodeBlock>
      </SubSection>

      <SubSection title="HTTPステータスコード">
        <Table
          headers={["ステータス", "意味", "使用場面"]}
          rows={[
            ["200", "OK", "GET/PUT/PATCH/DELETE 成功"],
            ["201", "Created", "POST 作成成功"],
            ["204", "No Content", "DELETE 成功、内容なし"],
            ["400", "Bad Request", "リクエストパラメータエラー"],
            ["401", "Unauthorized", "未認証または認証失敗"],
            ["403", "Forbidden", "アクセス権限なし"],
            ["404", "Not Found", "リソースが存在しない"],
            ["409", "Conflict", "リソース競合 (ユニーク制約等)"],
            ["422", "Unprocessable Entity", "ビジネスルール検証失敗"],
            ["429", "Too Many Requests", "レート制限"],
            ["500", "Private Server Error", "サーバー内部エラー"],
          ]}
        />
      </SubSection>
    </div>
  );
}

function AuthArchitectureSection({ lang }: { lang: Language }) {
  if (lang === "zh") {
    return (
      <div>
        <SectionTitle>认证规范</SectionTitle>
        <Paragraph>
          Nata 平台支持以下认证方式。认证方式和优先级逻辑参考自 kintone REST API 标准。
        </Paragraph>

        <SubSection title="1. 认证方式">
          <Table
            headers={["方式", "有效标头 (Header)", "使用场景"]}
            rows={[
              [
                "API Token 认证",
                "Authorization: Bearer <TOKEN>",
                "外部系统集成、自动化脚本、三方服务",
              ],
              [
                "Session 认证 (Cookie)",
                "Cookie: access_token=... 和 X-Requested-With: XMLHttpRequest",
                "官方客户端 (PC/Mobile/MP)、内部 JS SDK 脚本",
              ],
            ]}
          />
        </SubSection>

        <SubSection title="2. API 类型与支持情况">
          <Paragraph>
            我们根据使用场景对 API 的认证支持进行了差异化设计：
          </Paragraph>
          <Table
            headers={["API 类型", "路径前缀", "支持认证方式"]}
            rows={[
              ["Private API (非公开)", "/api/*", "仅 Session (Cookie)"],
              ["Public API (公开)", "/api/v1/*", "API Token 或 Session (Cookie)"],
            ]}
          />
          
          <ul className="mb-4 space-y-6">
            <li className="flex items-start gap-2 text-muted-foreground">
              <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-primary" />
              <span>
                <strong className="text-foreground">Private API：</strong>
                专门服务于官方客户端（包括 PC 端、移动端、小程序等），仅支持用户登录后的 Session 认证方案。
              </span>
            </li>
            <li className="flex flex-col gap-3">
              <div className="flex items-start gap-2 text-muted-foreground">
                <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-primary" />
                <span>
                  <strong className="text-foreground">Public API：</strong>
                  采用混合认证方案以适应多元场景。**外部系统主要使用 API Token (Bearer Token)** 进行集成；而**内部 JS SDK 或第一方客户端**则可根据上下文灵活选择 Session (Cookie) 或 API Token。哪怕是官方客户端，在调用公开 API 时也能利用 Token 机制绕过特定的 Session 限制。
                </span>
              </div>
              <AuthScenarioDiagram lang="zh" />
            </li>
          </ul>

          <div className="mt-4 rounded-md border border-warning/30 bg-warning/10 p-4">
            <div className="mb-2 flex items-center gap-2 font-medium text-warning text-sm">
              <AlertCircle className="h-4 w-4" />
              安全提示：Public API 使用 Session 认证时，必须携带 X-Requested-With 标头以防止 CSRF。
            </div>
          </div>
        </SubSection>

        <SubSection title="3. API 分类与定位">
          <Paragraph>
            为了平衡开发效率与系统的稳定性，我们将 API 分为两类。
          </Paragraph>
          <Table
            headers={["维度", "Private API (非公开)", "Public API (公开)"]}
            rows={[
              ["主供对象", "官方客户端 (PC/Mobile/MP)", "第三方集成、内部 SDK"],
              ["稳定性", "可能频繁变更", "极端注重兼容性"],
              ["版本管理", "无明确版本控制", "严格版本化 (/v1/...)"],
              ["限流策略", "通常不限流", "严格限流 (防止过载)"],
            ]}
          />
        </SubSection>

        <SubSection title="4. 认证优先级">
          <Paragraph>
            当请求中同时包含多种认证信息时，服务端将按以下优先级进行验证：
          </Paragraph>
          <div className="flex items-center gap-4 py-4 px-6 bg-muted/30 rounded-md border border-border">
            <div className="font-semibold text-primary">API Token</div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <div className="text-foreground">Session (Cookie)</div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground italic">
            * 一经匹配高优先级认证（无论验证成功或失败），将不再尝试后续认证方式。
          </p>
        </SubSection>

        <SubSection title="5. 架构优势：底层统一与平滑迁移">
          <Paragraph>
            虽然 API 在访问层进行了物理隔离，但底层的业务逻辑完全共享：
          </Paragraph>
          <div className="rounded-md border border-primary/20 bg-primary/5 p-4">
            <h4 className="mb-2 font-medium text-foreground text-sm">统一 Service 层</h4>
            <p className="text-sm text-muted-foreground">
              Private 与 Public Controller 共同调用同一套 Service。这意味着任何业务逻辑的更新会同步生效于两类 API，且将内部 API 转化为公开 API 只需增加路由配置及 DTO 过滤，极大降低了维护成本，确保了行为的高度一致性。
            </p>
          </div>
        </SubSection>
      </div>
    );
  }

  // Japanese version
  return (
    <div>
      <SectionTitle>認証仕様</SectionTitle>
      <Paragraph>
        Nata プラットフォームは以下の認証方式をサポートしています。認証方式と優先順位のロジックは kintone REST API 標準を参考にしています。
      </Paragraph>

      <SubSection title="1. 認証方式">
        <Table
          headers={["方式", "有効なヘッダー (Header)", "使用場面"]}
          rows={[
            [
              "API Token 認証",
              "Authorization: Bearer <TOKEN>",
              "外部システム統合、自動化スクリプト、サードパーティサービス",
            ],
            [
              "Session 認証 (Cookie)",
              "Cookie: access_token=... および X-Requested-With: XMLHttpRequest",
              "公式クライアント (PC/Mobile/MP)、内部 JS SDK スクリプト",
            ],
          ]}
        />
      </SubSection>

      <SubSection title="2. API タイプとサポート状況">
        <Paragraph>
          ユースケースに基づいて、API の認証サポートを階層化しています：
        </Paragraph>
        <Table
          headers={["API タイプ", "パスプレフィックス", "サポートする認証方式"]}
          rows={[
            ["Private API (非公開)", "/api/*", "Session (Cookie) のみ"],
            ["Public API (公開)", "/api/v1/*", "API Token または Session (Cookie)"],
          ]}
        />
        
        <ul className="mb-4 space-y-6">
          <li className="flex items-start gap-2 text-muted-foreground">
            <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-primary" />
            <span>
              <strong className="text-foreground">Private API：</strong>
              公式クライアント（PC、モバイル、ミニアプリなど）専用であり、ユーザーログイン後の Session 認証のみをサポートします。
            </span>
          </li>
          <li className="flex flex-col gap-3">
            <div className="flex items-start gap-2 text-muted-foreground">
              <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-primary" />
              <span>
                <strong className="text-foreground">Public API：</strong>
                多様なシナリオに対応するため、混合認証を採用しています。**外部システムは主に API Token (Bearer Token)** を使用して連携しますが、**内部 JS SDK や公式クライアント**は、コンテキストに応じて Session (Cookie) または API Token を柔軟に選択できます。公式クライアントであっても、公開 API を呼び出す際に Token メカニズムを利用して特定の Session 制限を回避することが可能です。
              </span>
            </div>
            <AuthScenarioDiagram lang="ja" />
          </li>
        </ul>

        <div className="mt-4 rounded-md border border-warning/30 bg-warning/10 p-4">
          <div className="mb-2 flex items-center gap-2 font-medium text-warning text-sm">
            <AlertCircle className="h-4 w-4" />
            セキュリティ上の注意：Public API で Session 認証を使用する場合、CSRF 防御のために X-Requested-With ヘッダーが必須です。
          </div>
        </div>
      </SubSection>

      <SubSection title="3. API 分類と位置づけ">
        <Paragraph>
          開発効率とシステムの安定性のバランスをとるため、API を 2 つのカテゴリに分類しています。
        </Paragraph>
        <Table
          headers={["次元", "Private API (非公開)", "Public API (公開)"]}
          rows={[
            ["主な対象", "公式クライアント (PC/Mobile/MP)", "外部連携、内部 SDK"],
            ["安定性", "頻繁に変更される可能性あり", "互換性を極めて重視"],
            ["バージョン管理", "明確な管理なし", "厳格なバージョン化 (/v1/...)"],
            ["レート制限", "通常制限なし", "厳格な制限 (過負荷防止)"],
          ]}
        />
      </SubSection>

      <SubSection title="4. 認証の優先順位">
        <Paragraph>
          リクエストに複数の認証情報が含まれている場合、サーバーは以下の優先順位で検証を行います：
        </Paragraph>
        <div className="flex items-center gap-4 py-4 px-6 bg-muted/30 rounded-md border border-border">
          <div className="font-semibold text-primary">API Token</div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <div className="text-foreground">Session (Cookie)</div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground italic">
          * 高い優先順位の認証が一致した場合（検証の成功・失敗に関わらず）、後続の認証方式は試行されません。
        </p>
      </SubSection>

      <SubSection title="5. アーキテクチャの利点：統一されたコアとスムーズな移行">
        <Paragraph>
          API アクセス層は物理的に分離されていますが、基礎となるビジネスロジックは完全に共有されています：
        </Paragraph>
        <div className="rounded-md border border-primary/20 bg-primary/5 p-4">
          <h4 className="mb-2 font-medium text-foreground text-sm">統一された Service 層</h4>
          <p className="text-sm text-muted-foreground">
            Private と Public の両コントローラーは、同じ Service セットを呼び出します。これにより、ビジネスロジックの更新は両方の API に同時に反映されます。内部 API を公開 API に変換するには、新しいルートの追加と DTO フィルタリングのみが必要であり、メンテナンスコストを大幅に削減しながら、高度な動作の一貫性を保証します。
          </p>
        </div>
      </SubSection>
    </div>
  );
}

function ImplementationSection({ lang }: { lang: Language }) {
  if (lang === "zh") {
    return (
      <div>
        <SectionTitle>NestJS 实现规范</SectionTitle>

        <SubSection title="Controller 结构">
          <CodeBlock title="records.controller.ts">
            {`@ApiTags('Records')
@ApiBearerAuth('JWT-auth')
@Controller('apps/:appId/records')
@UseGuards(UnifiedAuthGuard, ScopeGuard)  // 认证 + Scope 检查
@UseInterceptors(AppAccessInterceptor)    // 应用访问检查
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  // 查询接口 - 可公开或需要读权限
  @Get()
  @Public()  // 或 @RequireScope('records:read')
  @ApiParam({ name: 'appId', description: '应用 ID' })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  async findAll(
    @Param('appId') appId: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.recordsService.findAll(appId, {
      limit: limit ? parseInt(limit, 10) : 15,
      offset: offset ? parseInt(offset, 10) : 0,
    });
  }

  // 写入接口 - 需要认证和权限
  @Post()
  @RequireScope('records:create')
  async create(
    @Param('appId') appId: string,
    @Body() dto: CreateRecordDto,
    @CurrentActor() actor: Actor,
  ) {
    return this.recordsService.create(appId, dto, actor);
  }
}`}
          </CodeBlock>
        </SubSection>

        <SubSection title="DTO 定义规范">
          <CodeBlock title="dto/records.dto.ts">
            {`import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// 创建记录 DTO
const createRecordSchema = z.object({
  values: z.record(z.string(), z.unknown()).default({}),
});
export class CreateRecordDto extends createZodDto(createRecordSchema) {}

// 更新记录 DTO
const updateRecordSchema = z.object({
  values: z.record(z.string(), z.unknown()).optional(),
});
export class UpdateRecordDto extends createZodDto(updateRecordSchema) {}

// 搜索 DTO
const searchRecordsSchema = z.object({
  conditions: z.array(z.object({
    field: z.string(),
    operator: z.enum(['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'contains', 'in']),
    value: z.unknown(),
  })),
  limit: z.number().int().positive().optional().default(15),
  offset: z.number().int().nonnegative().optional().default(0),
});
export class SearchRecordsDto extends createZodDto(searchRecordsSchema) {}`}
          </CodeBlock>
        </SubSection>

        <SubSection title="装饰器使用">
          <CodeBlock title="装饰器示例">
            {`// @Public() - 标记公开访问的端点
@Get()
@Public()
async findAll() { }

// @RequireScope() - 声明需要的权限
@Post()
@RequireScope('records:create')
async create() { }

// @CurrentActor() - 注入当前调用者身份
@Post()
async create(@CurrentActor() actor: Actor) { }

// 多个 scope (需要全部满足)
@Delete()
@RequireScope('records:delete', 'admin:records')
async remove() { }`}
          </CodeBlock>
        </SubSection>

        <SubSection title="目录结构推荐">
          <CodeBlock title="src/api/ 目录结构">
            {`src/api/
├── private/          # 内部接口 (Controller 路由不带 private, 如 'apps')
│   ├── apps/
│   │   ├── apps.controller.ts
│   │   ├── apps.service.ts
│   │   └── dto/
│   └── users/
└── public/          # 外部接口 (Controller 路由带版本, 如 'v1/records')
    └── v1/            # 版本隔离
        └── records/   # 对应资源
            ├── records.controller.ts
            ├── records.service.ts
            └── dto/   # DTO 必须独立定义，严禁复用内部 DTO`}
          </CodeBlock>
        </SubSection>
      </div>
    );
  }

  return (
    <div>
      <SectionTitle>NestJS実装仕様</SectionTitle>

      <SubSection title="Controller構造">
        <CodeBlock title="records.controller.ts">
          {`@ApiTags('Records')
@ApiBearerAuth('JWT-auth')
@Controller('apps/:appId/records')
@UseGuards(UnifiedAuthGuard, ScopeGuard)  // 認証 + Scopeチェック
@UseInterceptors(AppAccessInterceptor)    // アプリアクセスチェック
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  // クエリインターフェース - 公開または読み取り権限が必要
  @Get()
  @Public()  // または @RequireScope('records:read')
  @ApiParam({ name: 'appId', description: 'アプリ ID' })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  async findAll(
    @Param('appId') appId: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.recordsService.findAll(appId, {
      limit: limit ? parseInt(limit, 10) : 15,
      offset: offset ? parseInt(offset, 10) : 0,
    });
  }

  // 書き込みインターフェース - 認証と権限が必要
  @Post()
  @RequireScope('records:create')
  async create(
    @Param('appId') appId: string,
    @Body() dto: CreateRecordDto,
    @CurrentActor() actor: Actor,
  ) {
    return this.recordsService.create(appId, dto, actor);
  }
}`}
        </CodeBlock>
      </SubSection>

      <SubSection title="DTO定義仕様">
        <CodeBlock title="dto/records.dto.ts">
          {`import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// レコード作成 DTO
const createRecordSchema = z.object({
  values: z.record(z.string(), z.unknown()).default({}),
});
export class CreateRecordDto extends createZodDto(createRecordSchema) {}

// レコード更新 DTO
const updateRecordSchema = z.object({
  values: z.record(z.string(), z.unknown()).optional(),
});
export class UpdateRecordDto extends createZodDto(updateRecordSchema) {}

// 検索 DTO
const searchRecordsSchema = z.object({
  conditions: z.array(z.object({
    field: z.string(),
    operator: z.enum(['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'contains', 'in']),
    value: z.unknown(),
  })),
  limit: z.number().int().positive().optional().default(15),
  offset: z.number().int().nonnegative().optional().default(0),
});
export class SearchRecordsDto extends createZodDto(searchRecordsSchema) {}`}
        </CodeBlock>
      </SubSection>

      <SubSection title="デコレーター使用">
        <CodeBlock title="デコレーター例">
          {`// @Public() - 公開アクセスエンドポイントをマーク
@Get()
@Public()
async findAll() { }

// @RequireScope() - 必要な権限を宣言
@Post()
@RequireScope('records:create')
async create() { }

// @CurrentActor() - 現在の呼び出し元IDを注入
@Post()
async create(@CurrentActor() actor: Actor) { }

// 複数scope (すべて満たす必要あり)
@Delete()
@RequireScope('records:delete', 'admin:records')
async remove() { }`}
        </CodeBlock>
      </SubSection>

      <SubSection title="ディレクトリ構造推奨">
        <CodeBlock title="src/api/ ディレクトリ構造">
          {`src/api/
├── private/          # 内部インターフェース (Controllerルートにinternalなし, 例: 'apps')
│   ├── apps/
│   │   ├── apps.controller.ts
│   │   ├── apps.service.ts
│   │   └── dto/
│   └── users/
└── public/          # 外部インターフェース (Controllerルートにバージョンあり, 例: 'v1/records')
    └── v1/            # バージョン分離
        └── records/   # 対応リソース
            ├── records.controller.ts
            ├── records.service.ts
            └── dto/   # DTOは独立定義必須、内部DTOの再利用禁止`}
        </CodeBlock>
      </SubSection>
    </div>
  );
}

function BestPracticesSection({ lang }: { lang: Language }) {
  if (lang === "zh") {
    return (
      <div>
        <SectionTitle>最佳实践</SectionTitle>

        <SubSection title="DO (推荐做法)">
          <CodeBlock>
            {`// 使用复数名词
GET /api/apps
GET /api/apps/:appId/records

// 资源嵌套表达层级
GET /api/apps/:appId/records/:recordId

// 查询参数用于过滤
GET /api/apps/:appId/records?status=done&limit=20

// POST 用于复杂查询
POST /api/apps/:appId/records/search

// 统一错误格式
{ "statusCode": 400, "message": "...", "error": "Bad Request" }

// 分页信息包含在响应中
{ "data": [...], "pagination": { "total": 100, "limit": 20 } }`}
          </CodeBlock>
        </SubSection>

        <SubSection title="DON'T (避免做法)">
          <CodeBlock>
            {`// URL 中使用动词
GET /api/getApps
POST /api/apps/:appId/createRecord

// 资源 ID 放在查询参数
GET /api/records?appId=123

// 嵌套过深 (超过 3 层)
GET /api/orgs/:orgId/workspaces/:wsId/apps/:appId/records/:recordId/comments/:commentId

// 混用命名风格
GET /api/apps/:app_id/records/:recordId  // 混用下划线和驼峰`}
          </CodeBlock>
        </SubSection>

        <SubSection title="版本管理规则">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-md border border-success/30 bg-success/10 p-4">
              <h4 className="mb-3 flex items-center gap-2 font-medium text-success">
                <Check className="h-4 w-4" />
                向后兼容的变更
              </h4>
              <List
                items={[
                  "新增可选字段",
                  "新增新端点",
                  "新增新的查询参数 (可选)",
                  "扩展枚举值",
                ]}
              />
            </div>
            <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4">
              <h4 className="mb-3 flex items-center gap-2 font-medium text-destructive">
                <X className="h-4 w-4" />
                破坏性变更 (需要新版本)
              </h4>
              <List
                items={[
                  "删除字段",
                  "重命名字段",
                  "修改字段类型",
                  "修改端点路径",
                  "修改必填性",
                  "删除枚举值",
                ]}
              />
            </div>
          </div>
        </SubSection>

        <SubSection title="公开 API 设计特别规范">
          <List
            items={[
              "必须显式版本化：URL 必须包含版本号 /api/v1/apps/...",
              "严格的分页与限流：必须强制分页，禁止全量返回。默认 limit=20，最大 limit=100",
              "DTO 必须独立定义：严禁复用内部的 DTO，保持精简和稳定",
              "即使是微小的改动，如果可能影响客户代码，也尽量通过新增字段而非修改字段类型来实现",
            ]}
          />
        </SubSection>

        <SubSection title="废弃流程">
          <div className="rounded-md border border-border bg-muted/30 p-4">
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  1
                </div>
                <div className="h-12 w-px bg-border" />
              </div>
              <div className="pb-8">
                <h4 className="font-medium text-foreground">标记废弃 (deprecated)</h4>
                <p className="text-sm text-muted-foreground">
                  在 Swagger 文档中标记，返回 Warning 响应头，通知使用方
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  2
                </div>
                <div className="h-12 w-px bg-border" />
              </div>
              <div className="pb-8">
                <h4 className="font-medium text-foreground">过渡期 (至少 6 个月)</h4>
                <p className="text-sm text-muted-foreground">
                  保持旧版本可用，提供迁移指南，监控使用情况
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  3
                </div>
              </div>
              <div>
                <h4 className="font-medium text-foreground">移除</h4>
                <p className="text-sm text-muted-foreground">
                  确认无调用后移除，返回 410 Gone
                </p>
              </div>
            </div>
          </div>
        </SubSection>
      </div>
    );
  }

  return (
    <div>
      <SectionTitle>ベストプラクティス</SectionTitle>

      <SubSection title="DO (推奨する方法)">
        <CodeBlock>
          {`// 複数形名詞を使用
GET /api/apps
GET /api/apps/:appId/records

// リソースネストで階層を表現
GET /api/apps/:appId/records/:recordId

// クエリパラメータでフィルタリング
GET /api/apps/:appId/records?status=done&limit=20

// 複雑なクエリにはPOSTを使用
POST /api/apps/:appId/records/search

// 統一エラー形式
{ "statusCode": 400, "message": "...", "error": "Bad Request" }

// ページネーション情報をレスポンスに含める
{ "data": [...], "pagination": { "total": 100, "limit": 20 } }`}
        </CodeBlock>
      </SubSection>

      <SubSection title="DON'T (避けるべき方法)">
        <CodeBlock>
          {`// URLに動詞を使用
GET /api/getApps
POST /api/apps/:appId/createRecord

// リソースIDをクエリパラメータに
GET /api/records?appId=123

// 深すぎるネスト (3層超)
GET /api/orgs/:orgId/workspaces/:wsId/apps/:appId/records/:recordId/comments/:commentId

// 命名スタイルの混在
GET /api/apps/:app_id/records/:recordId  // アンダースコアとキャメルケースの混在`}
        </CodeBlock>
      </SubSection>

      <SubSection title="バージョン管理ルール">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-md border border-success/30 bg-success/10 p-4">
            <h4 className="mb-3 flex items-center gap-2 font-medium text-success">
              <Check className="h-4 w-4" />
              後方互換性のある変更
            </h4>
            <List
              items={[
                "オプショナルフィールドの追加",
                "新規エンドポイントの追加",
                "新規クエリパラメータの追加 (オプショナル)",
                "列挙値の拡張",
              ]}
            />
          </div>
          <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4">
            <h4 className="mb-3 flex items-center gap-2 font-medium text-destructive">
              <X className="h-4 w-4" />
              破壊的変更 (新バージョンが必要)
            </h4>
            <List
              items={[
                "フィールドの削除",
                "フィールドの名前変更",
                "フィールド型の変更",
                "エンドポイントパスの変更",
                "必須性の変更",
                "列挙値の削除",
              ]}
            />
          </div>
        </div>
      </SubSection>

      <SubSection title="外部API設計特別仕様">
        <List
          items={[
            "明示的バージョン化必須：URLにバージョン番号を含める /api/v1/apps/...",
            "厳格なページネーションとレート制限：必須ページネーション、全量返却禁止。デフォルト limit=20、最大 limit=100",
            "DTO独立定義必須：内部DTOの再利用禁止、簡潔さと安定性を維持",
            "軽微な変更でも顧客コードに影響する可能性がある場合、フィールド型の変更ではなく新規フィールド追加で対応",
          ]}
        />
      </SubSection>

      <SubSection title="廃止プロセス">
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                1
              </div>
              <div className="h-12 w-px bg-border" />
            </div>
            <div className="pb-8">
              <h4 className="font-medium text-foreground">廃止マーク (deprecated)</h4>
              <p className="text-sm text-muted-foreground">
                Swaggerドキュメントでマーク、Warningレスポンスヘッダーを返す、利用者に通知
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                2
              </div>
              <div className="h-12 w-px bg-border" />
            </div>
            <div className="pb-8">
              <h4 className="font-medium text-foreground">移行期間 (最低6ヶ月)</h4>
              <p className="text-sm text-muted-foreground">
                旧バージョンを維持、移行ガイドを提供、使用状況を監視
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                3
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground">削除</h4>
              <p className="text-sm text-muted-foreground">
                呼び出しがないことを確認後削除、410 Goneを返す
              </p>
            </div>
          </div>
        </div>
      </SubSection>
    </div>
  );
}
