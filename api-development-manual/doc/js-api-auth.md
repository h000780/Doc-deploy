# API 访问架构与认证规范

## 1. 概述

本规范定义了 Nata 平台的 API 架构分层、访问模式及相应的认证安全策略。旨在明确内部系统、外部集成以及前端 JS SDK 如何正确、安全地访问平台能力。

## 2. API 分类与定位

### 2.1 Private API (`/api/*`)

- **定位**: 平台私有 API。
- **服务对象**: Nata 官方前端 (`nata-pc`)、官方移动端。
- **特性**:
  - 快速迭代，不保证向下兼容。
  - 功能全集，暴露系统底层能力。
  - **限流**: 内部受信环境，按需管控。
- **认证方式**: 仅支持 Cookie (Session)。

### 2.2 Public API (`/api/v1/*`)

- **定位**: 开放平台 API。
- **服务对象**: 第三方系统集成、自动化脚本、**平台内运行的 JS 代码 (JS SDK)**。
- **特性**:
  - 严格版本控制，保证兼容性。
  - 遵循 RESTful 规范。
  - **限流**: 严格限流与配额管理，保障系统可用性。
- **认证方式**: **全场景支持** API Key (Bearer Token) 和 Cookie (Session) 混合模式。

## 3. 访问场景与规范

### 场景 A: 官方客户端访问 (Private Client -> Private API)

即用户在浏览器中使用 Nata 平台。

- **路径**: `/api/*`
- **认证**: `Cookie: access_token=...`
- **CSRF 防护**: 依赖标准 SameSite 属性及框架级防护。
- **客户端行为**: 浏览器自动携带 Cookie。

### 场景 B: 外部系统集成 (System -> Public API)

即外部开发者使用 Python/Node.js/Postman 调用平台。

- **路径**: `/api/v1/*`
- **认证**: `Authorization: Bearer <API_KEY>`
- **CSRF 防护**: 不适用 (非浏览器环境)。
- **服务端行为**:
  - 优先检查 Authorization 头。
  - 忽略 Cookie (即使存在)。
  - **不检查** Anti-CSRF Header。

### 场景 C: 内部 JS SDK 访问 (PC Client JS -> Public API)

即用户在 PC Client 的自定义页面/脚本中，使用 `nata.api` 访问稳定接口。
这是**跨上下文**的特殊场景：访问的是"外部"接口，但环境是"内部"浏览器。

- **路径**: `/api/v1/*`
- **认证**: 支持**双模式**：
  1.  `Authorization: Bearer <API_KEY>` (优先，用于获取特定应用权限)。
  2.  `Cookie: access_token=...` (复用当前登录态)。
- **安全风险**: 仅 Cookie 模式存在 CSRF 风险。
- **CSRF 防护**: **仅 Cookie 认证时强制启用** 自定义 Header 检查。
- **客户端行为 (JS SDK)**:
  1.  `credentials: 'include'` (发送 Cookie)。
  2.  Header: `X-Nata-Client: js-sdk` (通过 CORS 预检证明身份)。
- **服务端行为**:
  1.  未发现 Authorization 头。
  2.  发现 Cookie。
  3.  **强制检查** `X-Nata-Client` 头。若缺失，返回 401。

## 4. 认证层实现规范 (`UnifiedAuthGuard`)

服务端 `UnifiedAuthGuard` 需实现以下**优先级逻辑**以支持上述所有场景：

```mermaid
graph TD
    Start[请求进入] --> CheckAuthHeader{是否存在 Authorization 头?};

    CheckAuthHeader -- YES --> AuthKey[进入: API Key 认证模式];
    AuthKey --> VerifyKey[验证签名/有效性];
    VerifyKey -- Pass --> ResultKey[认证成功: ApiKeyActor (权限取决于 Key)];

    CheckAuthHeader -- NO --> CheckCookie{是否存在 Cookie?};

    CheckCookie -- YES --> AuthCookie[进入: Cookie 认证模式];
    AuthCookie --> CheckPath{请求路径类型?};

    CheckPath -- Private API --> VerifyJWT[验证 Session/JWT];

    CheckPath -- Public API --> CheckCSRF{存在 X-Nata-Client 头?};
    CheckCSRF -- NO --> Reject[拒绝: 401 CSRF Error];
    CheckCSRF -- YES --> VerifyJWT;

    VerifyJWT -- Pass --> ResultUser[认证成功: UserActor];

    CheckCookie -- NO --> Fail[认证失败: Anonymous];
```

## 5. 客户端开发规范

### 5.1 外部开发者 (Python/Curl)

- 必须申请 API Key。
- 请求头必须包含 `Authorization: Bearer nata_...`。
- 无需关注 Cookie 或 CSRF Header。

### 5.2 内部脚本开发者 (JS SDK)

- 直接使用 `nata.api(path, method, data)`。
- **禁止** 手动拼接 `fetch` (除非显式添加 Header)。
- 无需管理 Token，能够无缝复用当前操作者的权限。

## 6. 总结

本架构通过**混合认证策略**，实现了：

1.  **内外隔离**: 内部 API 保持灵活，外部 API 保持稳定。
2.  **无缝融合**: 允许内部 JS 安全地调用外部稳定能力，无需繁琐的 Token 管理。
3.  **安全闭环**: 针对 Cookie 认证场景，利用 CORS 机制通过 Header 检查严格防御 CSRF。

## 7. 底层抽象与代码共享

平台通过 **Service 层共享** 实现 Private 与 Public API 的平滑转化。

- **核心抽象**：Private 与 Public Controller 共同调用同一个底层 Service。
- **快速转化**：若需将私有 API 转为公开，仅需在 Public Controller 增加一个端点，并使用 DTO 进行字段过滤与鉴权配置，无需重复编写业务逻辑。
