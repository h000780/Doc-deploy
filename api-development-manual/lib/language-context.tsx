"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type Language = "zh" | "ja"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  zh: {
    // Header
    "header.title": "Nata API 设计规范",
    "header.subtitle": "后端接口设计手册",
    "header.search": "搜索文档...",
    
    // Navigation
    "nav.overview": "概述",
    "nav.core-principles": "核心原则",
    "nav.url-naming": "URL 命名规范",
    "nav.http-methods": "HTTP 方法",
    "nav.parameter-passing": "参数传递规范",
    "nav.special-patterns": "特殊场景",
    "nav.pagination": "分页与响应",
    "nav.error-handling": "错误处理",
    "nav.private-vs-public": "非公开 vs 公开 API",
    "nav.nestjs-implementation": "NestJS 实现",
    "nav.best-practices": "最佳实践",
    "nav.version-management": "版本管理",
    "nav.examples": "完整示例",
    "nav.appendix": "附录",
    
    // Core Principles
    "principles.title": "核心原则",
    "principles.restful.title": "RESTful 优先",
    "principles.restful.desc": "资源导向设计，URL 代表资源，HTTP Method 代表动作。",
    "principles.semantic.title": "语义清晰",
    "principles.semantic.desc": "接口路径和参数应具有明确的业务含义，优先使用英语名词。",
    "principles.flattening.title": "扁平化与关联",
    "principles.flattening.desc": "强依赖用嵌套，弱关联用打平。不要为了表达关系而无限加深 URL 路径。",
    "principles.consistency.title": "一致性",
    "principles.consistency.desc": "整个系统的分页、筛选、错误码格式必须完全统一。",
    
    // URL Naming
    "url.title": "URL 命名规范",
    "url.kebab.title": "全小写，连字符分隔 (Kebab-case)",
    "url.plural.title": "资源使用复数名词",
    "url.hierarchy.title": "层级结构",
    "url.hierarchy.desc": "集合 → ID → 子资源",
    
    // HTTP Methods
    "http.title": "HTTP 方法规范",
    "http.method": "方法",
    "http.purpose": "用途",
    "http.idempotent": "幂等性",
    "http.example": "示例",
    "http.body": "是否允许 Body",
    "http.get.purpose": "读取资源详情或列表",
    "http.post.purpose": "创建资源 / 复杂动作",
    "http.put.purpose": "完全替换资源 (较少用)",
    "http.patch.purpose": "部分更新资源 (推荐)",
    "http.delete.purpose": "删除资源",
    "http.yes": "是",
    "http.no": "否",
    "http.required": "必须",
    "http.forbidden": "严禁",
    "http.notrecommended": "不建议",
    
    // Parameters
    "params.title": "参数传递规范",
    "params.golden.title": "黄金法则：ID 进 Path，条件进 Query",
    "params.path.title": "Path Params (路径参数)",
    "params.path.desc": "用途：唯一标识资源。场景：AppID, UserID, RecordID 等核心定位符。",
    "params.query.title": "Query Params (查询参数)",
    "params.query.desc": "用途：筛选、分页、排序、视图修饰。场景：筛选、分页、排序、字段选择。",
    "params.body.title": "Request Body (请求体)",
    "params.body.desc": "用途：传输业务数据。通常用于 Create (POST) 和 Update (PATCH)。格式：统一使用 application/json。",
    
    // Special Patterns
    "special.title": "特殊场景规范",
    "special.search.title": "复杂搜索 (Complex Search)",
    "special.search.desc": "当筛选条件非常复杂，或者包含数组、范围查询，导致 Query String 过长甚至被 URL 截断时，允许使用 POST 替代 GET。",
    "special.actions.title": "资源动作 (RPC Style Actions)",
    "special.actions.desc": "当标准 REST 动词无法表达业务动作时（如：登录、禁用、重置密码、发布），可以将动作名词化放在 URL 末尾。",
    "special.batch.title": "批量操作 (Batch Operations)",
    "special.batch.desc": "建议使用 DELETE 或 POST 配合 Body 来传输 ID 列表。",
    
    // Response
    "response.title": "分页与响应标准",
    "response.pagination.title": "分页参数命名",
    "response.pagination.desc": "推荐使用 limit (条数) 和 offset (偏移量) 风格。",
    "response.format.title": "响应格式",
    "response.format.desc": "列表使用标准结构包裹，单体直接返回。",
    
    // Errors
    "error.title": "错误处理规范",
    "error.400": "参数校验失败（必填缺失、格式错误）",
    "error.401": "未登录或 Token 过期",
    "error.403": "已登录但无权限操作此资源",
    "error.404": "资源不存在",
    "error.409": "资源冲突（如唯一性约束）",
    "error.422": "业务规则校验失败",
    "error.429": "限流",
    "error.500": "服务器内部错误",
    
    // Private vs Public
    "api.title": "非公开 API vs 公开 API",
    "api.private": "非公开 API",
    "api.public": "公开 API",
    "api.audience": "受众",
    "api.audience.private": "仅限自带的前端调用",
    "api.audience.public": "第三方系统、客户集成脚本调用",
    "api.stability": "稳定性",
    "api.stability.private": "可能会随前端需求频繁变更",
    "api.stability.public": "极端注重兼容性，一旦发布严禁破坏性变更",
    "api.version": "版本控制",
    "api.version.private": "通常不严格区分版本",
    "api.version.public": "强制版本化 (如 /v1/, /v2/)",
    "api.ratelimit": "限流策略",
    "api.ratelimit.private": "较宽松 (主要防 DDoS)",
    "api.ratelimit.public": "严格限流 (如 100条限制)",
    "api.auth": "认证方式",
    "api.auth.private": "Cookie / JWT",
    "api.auth.public": "API Key (Bearer Token)",
    "api.prefix": "路径前缀",
    "api.prefix.private": "/api/...",
    "api.prefix.public": "/api/v1/...",
    
    // Best Practices
    "best.title": "最佳实践",
    "best.do": "推荐做法",
    "best.dont": "避免做法",
    
    // Version Management
    "version.title": "版本管理",
    "version.strategy.title": "版本策略",
    "version.compatibility.title": "兼容性规则",
    "version.compatible": "向后兼容的变更",
    "version.breaking": "破坏性变更 (需要新版本)",
    
    // Examples
    "examples.title": "完整示例：Records API",
    "examples.private": "非公开 API",
    "examples.public": "公开 API",
    
    // Appendix
    "appendix.title": "附录",
    "appendix.docs": "相关文档",
    "appendix.refs": "参考资料",
    "appendix.glossary": "术语表",
    "appendix.term": "术语",
    "appendix.definition": "定义",
    
    // Footer
    "footer.version": "文档版本 1.0",
    "footer.updated": "更新时间",
    
    // Common
    "common.correct": "正确",
    "common.incorrect": "错误",
    "common.example": "示例",
    "common.note": "注意",
    "common.tip": "提示",
    "common.warning": "警告",
  },
  ja: {
    // Header
    "header.title": "Nata API 設計規範",
    "header.subtitle": "バックエンドインターフェース設計マニュアル",
    "header.search": "ドキュメントを検索...",
    
    // Navigation
    "nav.overview": "概要",
    "nav.core-principles": "コア原則",
    "nav.url-naming": "URL 命名規則",
    "nav.http-methods": "HTTP メソッド",
    "nav.parameter-passing": "パラメータ渡し規則",
    "nav.special-patterns": "特殊シナリオ",
    "nav.pagination": "ページネーションとレスポンス",
    "nav.error-handling": "エラーハンドリング",
    "nav.private-vs-public": "非公開 vs 公開 API",
    "nav.nestjs-implementation": "NestJS 実装",
    "nav.best-practices": "ベストプラクティス",
    "nav.version-management": "バージョン管理",
    "nav.examples": "完全な例",
    "nav.appendix": "付録",
    
    // Core Principles
    "principles.title": "コア原則",
    "principles.restful.title": "RESTful 優先",
    "principles.restful.desc": "リソース指向設計、URL は「リソース」を表し、HTTP Method は「アクション」を表す。",
    "principles.semantic.title": "意味論の明確さ",
    "principles.semantic.desc": "インターフェースパスとパラメータは明確なビジネス意味を持ち、英語名詞を優先する。",
    "principles.flattening.title": "フラット化と関連付け",
    "principles.flattening.desc": "強い依存関係にはネストを使用し、弱い関連にはフラット化を使用する。「関係」を表現するためにURL パスを無限に深くしない。",
    "principles.consistency.title": "一貫性",
    "principles.consistency.desc": "システム全体のページネーション、フィルタリング、エラーコード形式は完全に統一されなければならない。",
    
    // URL Naming
    "url.title": "URL 命名規則",
    "url.kebab.title": "すべて小文字、ハイフン区切り（Kebab-case）",
    "url.plural.title": "リソースには複数名詞を使用",
    "url.hierarchy.title": "階層構造",
    "url.hierarchy.desc": "コレクション → ID → サブリソース",
    
    // HTTP Methods
    "http.title": "HTTP メソッド規範",
    "http.method": "メソッド",
    "http.purpose": "用途",
    "http.idempotent": "冪等性",
    "http.example": "例",
    "http.body": "Body 許可",
    "http.get.purpose": "リソースの詳細またはリストを読み取る",
    "http.post.purpose": "リソースの作成 / 複雑なアクション",
    "http.put.purpose": "リソースを完全に置換（使用頻度低）",
    "http.patch.purpose": "リソースの部分更新（推奨）",
    "http.delete.purpose": "リソースを削除",
    "http.yes": "はい",
    "http.no": "いいえ",
    "http.required": "必須",
    "http.forbidden": "禁止",
    "http.notrecommended": "非推奨",
    
    // Parameters
    "params.title": "パラメータ渡し規範",
    "params.golden.title": "黄金ルール：ID は Path へ、条件は Query へ",
    "params.path.title": "Path Params（パスパラメータ）",
    "params.path.desc": "用途：リソースを一意に識別する。シナリオ：AppID、UserID、RecordID などのコア識別子。",
    "params.query.title": "Query Params（クエリパラメータ）",
    "params.query.desc": "用途：フィルタリング、ページネーション、ソート、ビュー修飾。シナリオ：フィルタリング、ページネーション、ソート、フィールド選択。",
    "params.body.title": "Request Body（リクエストボディ）",
    "params.body.desc": "用途：ビジネスデータの伝送。通常は Create（POST）と Update（PATCH）に使用。形式：application/json を統一使用。",
    
    // Special Patterns
    "special.title": "特殊シナリオ規範",
    "special.search.title": "複雑な検索（Complex Search）",
    "special.search.desc": "フィルタ条件が非常に複雑な場合、または配列や範囲クエリを含む場合、Query String が長すぎたり URL が切り捨てられたりする場合は、GET の代わりに POST を使用することが許可される。",
    "special.actions.title": "リソースアクション（RPC Style Actions）",
    "special.actions.desc": "標準の REST 動詞がビジネスアクションを表現できない場合（例：ログイン、無効化、パスワードリセット、公開）、アクションを名詞化して URL の末尾に配置できる。",
    "special.batch.title": "バッチ操作（Batch Operations）",
    "special.batch.desc": "DELETE または POST と Body を組み合わせて ID リストを伝送することを推奨。",
    
    // Response
    "response.title": "ページネーションとレスポンス標準",
    "response.pagination.title": "ページネーションパラメータ命名",
    "response.pagination.desc": "limit（件数）と offset（オフセット）スタイルの使用を推奨。",
    "response.format.title": "レスポンス形式",
    "response.format.desc": "リストは標準構造でラップし、単体は直接返す。",
    
    // Errors
    "error.title": "エラーハンドリング規範",
    "error.400": "パラメータ検証失敗（必須項目の欠落、形式エラー）",
    "error.401": "未ログインまたは Token 期限切れ",
    "error.403": "ログイン済みだがこのリソースへの操作権限なし",
    "error.404": "リソースが存在しない",
    "error.409": "リソース競合（一意性制約など）",
    "error.422": "ビジネスルール検証失敗",
    "error.429": "レート制限",
    "error.500": "サーバー内部エラー",
    
    // Private vs Public
    "api.title": "非公開 API vs 公開 API",
    "api.private": "非公開 API",
    "api.public": "公開 API",
    "api.audience": "対象",
    "api.audience.private": "自社フロントエンドのみ",
    "api.audience.public": "サードパーティシステム、顧客統合スクリプト",
    "api.stability": "安定性",
    "api.stability.private": "フロントエンドの要件に応じて頻繁に変更される可能性あり",
    "api.stability.public": "互換性を極めて重視、公開後は破壊的変更を厳禁",
    "api.version": "バージョン管理",
    "api.version.private": "通常、バージョンを厳密に区別しない",
    "api.version.public": "強制バージョン化（/v1/、/v2/ など）",
    "api.ratelimit": "レート制限ポリシー",
    "api.ratelimit.private": "緩い（主に DDoS 防止）",
    "api.ratelimit.public": "厳格なレート制限（100件制限など）",
    "api.auth": "認証方式",
    "api.auth.private": "Cookie / JWT",
    "api.auth.public": "API Key（Bearer Token）",
    "api.prefix": "パスプレフィックス",
    "api.prefix.private": "/api/...",
    "api.prefix.public": "/api/v1/...",
    
    // Best Practices
    "best.title": "ベストプラクティス",
    "best.do": "推奨事項",
    "best.dont": "避けるべき事項",
    
    // Version Management
    "version.title": "バージョン管理",
    "version.strategy.title": "バージョン戦略",
    "version.compatibility.title": "互換性ルール",
    "version.compatible": "後方互換性のある変更",
    "version.breaking": "破壊的変更（新バージョンが必要）",
    
    // Examples
    "examples.title": "完全な例：Records API",
    "examples.private": "非公開 API",
    "examples.public": "公開 API",
    
    // Appendix
    "appendix.title": "付録",
    "appendix.docs": "関連ドキュメント",
    "appendix.refs": "参考資料",
    "appendix.glossary": "用語集",
    "appendix.term": "用語",
    "appendix.definition": "定義",
    
    // Footer
    "footer.version": "ドキュメントバージョン 1.0",
    "footer.updated": "更新日",
    
    // Common
    "common.correct": "正しい",
    "common.incorrect": "誤り",
    "common.example": "例",
    "common.note": "注意",
    "common.tip": "ヒント",
    "common.warning": "警告",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("zh")

  const t = useCallback(
    (key: string) => {
      return translations[language][key] || key
    },
    [language]
  )

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
