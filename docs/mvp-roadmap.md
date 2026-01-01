# APIShift MVP开发计划

> 目标：2周内完成可用产品并获取首批用户

---

## 开发原则

```
1. 先能用，再好用
2. 手动优先于自动（验证需求）
3. 尽量用现成服务，不造轮子
4. 每天可部署，持续验证
```

---

## Week 1：核心功能

### Day 1：项目初始化 ✓

**上午（4h）**
```bash
# 创建项目
npx create-next-app@latest apishift --typescript --tailwind --app --src-dir

# 安装核心依赖
npm install @tanstack/react-query zod
npm install @trpc/server @trpc/client @trpc/react-query @trpc/next
npm install next-auth @auth/prisma-adapter
npm install prisma @prisma/client
npm install @upstash/redis @upstash/ratelimit
npm install resend
npm install lucide-react

# 安装UI组件
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input label toast alert badge
```

**下午（4h）**
- [ ] 配置 Prisma schema（基础表）
- [ ] 配置 NextAuth（GitHub登录）
- [ ] 创建 tRPC 基础结构
- [ ] 部署到 Vercel（空项目）
- [ ] 配置 Supabase 数据库

**交付物**
- 可访问的空白应用
- 可登录的认证系统

---

### Day 2：数据库与认证

**上午（4h）**
```typescript
// 完成 Prisma schema
// 运行 migration
npx prisma migrate dev --name init

// 创建种子数据
npx prisma db seed
```

- [ ] 完善 User, Api, ApiSnapshot 表
- [ ] 配置 NextAuth adapter
- [ ] 创建认证中间件

**下午（4h）**
- [ ] 登录页面 UI
- [ ] 注册流程（如需要）
- [ ] Session 管理
- [ ] 受保护路由测试

**交付物**
- 完整的用户认证流程
- 数据库表结构就绪

---

### Day 3：API CRUD

**上午（4h）**
```typescript
// tRPC router: api.ts
- api.list    // 列出用户的所有API
- api.create  // 创建新API
- api.get     // 获取单个API详情
- api.update  // 更新API配置
- api.delete  // 删除API
```

**下午（4h）**
- [ ] Dashboard 页面布局
- [ ] API 列表组件
- [ ] 添加 API 表单
- [ ] 删除 API 功能

**交付物**
- 用户可以添加/查看/删除API

---

### Day 4：Schema检测核心

**上午（4h）**
```typescript
// lib/schema.ts
- inferSchema(data)      // 从JSON推断schema
- compareSchemas(a, b)   // 比较两个schema
- formatDiff(diffs)      // 格式化差异
```

- [ ] 实现 schema 推断算法
- [ ] 实现 diff 比较算法
- [ ] 单元测试覆盖

**下午（4h）**
- [ ] API 详情页面
- [ ] Schema 可视化展示
- [ ] Diff 可视化组件
- [ ] 手动检查按钮

**交付物**
- 用户可以手动检查API并看到schema

---

### Day 5：定时任务

**上午（4h）**
```typescript
// 配置 Trigger.dev
npm install @trigger.dev/sdk @trigger.dev/nextjs

// jobs/apiCheck.ts
- 定时获取待检查的API
- 批量执行检查
- 保存结果到数据库
```

**下午（4h）**
- [ ] 配置 cron schedule
- [ ] 实现检查任务逻辑
- [ ] 错误处理和重试
- [ ] 检查历史记录

**交付物**
- 自动定时检查运行
- 历史记录可查看

---

### Day 6-7：通知系统 + 测试

**Day 6**
- [ ] Resend 邮件集成
- [ ] 邮件模板设计
- [ ] 变更通知发送
- [ ] 通知设置页面

**Day 7**
- [ ] 端到端测试
- [ ] 修复 bugs
- [ ] 性能优化
- [ ] 文档整理

**交付物**
- 完整的 MVP 功能
- 变更时收到邮件通知

---

## Week 2：打磨与发布

### Day 8：Landing Page

**全天（8h）**
```
结构：
1. Hero - 一句话价值主张
2. Problem - 痛点描述
3. Solution - 产品展示
4. Features - 核心功能
5. Pricing - 定价表
6. CTA - 注册按钮
```

- [ ] 设计 Landing Page
- [ ] 响应式适配
- [ ] SEO meta tags
- [ ] OG images

**交付物**
- 专业的产品首页

---

### Day 9：Pricing + Stripe

**上午（4h）**
```typescript
npm install stripe @stripe/stripe-js

// 配置 Stripe
- 创建产品和价格
- Webhook 处理
- Customer Portal
```

**下午（4h）**
- [ ] Pricing 页面
- [ ] Checkout 流程
- [ ] 订阅状态同步
- [ ] 升级/降级处理

**交付物**
- 可接受付款的支付系统

---

### Day 10：用户限制 + 配额

**全天（8h）**
```typescript
// 按计划限制
const PLAN_LIMITS = {
  FREE: { apis: 3, interval: 1440 },      // 每日
  PRO: { apis: 50, interval: 60 },        // 每小时
  TEAM: { apis: 999, interval: 1 }        // 每分钟
};
```

- [ ] 实现配额检查
- [ ] 升级提示
- [ ] 使用量统计
- [ ] 接近限额通知

**交付物**
- 免费版限制生效
- 付费升级入口

---

### Day 11：Slack + Webhook 通知

**全天（8h）**
- [ ] Slack App 创建
- [ ] OAuth 授权流程
- [ ] Slack 消息发送
- [ ] 自定义 Webhook 支持
- [ ] 通知渠道管理 UI

**交付物**
- 多渠道通知支持

---

### Day 12：优化与细节

**全天（8h）**
- [ ] 加载状态优化
- [ ] 错误提示优化
- [ ] 空状态设计
- [ ] Onboarding 引导
- [ ] 键盘快捷键
- [ ] 移动端适配

**交付物**
- 更好的用户体验

---

### Day 13：发布准备

**上午（4h）**
- [ ] 生产环境检查
- [ ] 监控配置（Sentry）
- [ ] 日志配置
- [ ] 备份策略

**下午（4h）**
- [ ] 写 Product Hunt post
- [ ] 准备 Hacker News 帖子
- [ ] 录制 demo 视频
- [ ] 创建社交媒体账号

**交付物**
- 发布材料准备就绪

---

### Day 14：正式发布 🚀

**全天**
- [ ] 最终测试
- [ ] 发布到 Product Hunt
- [ ] 发布到 Hacker News
- [ ] 发布到 Reddit
- [ ] Twitter/X 宣传
- [ ] 监控反馈

---

## 技术债务清单

> MVP完成后需要处理

| 优先级 | 事项 | 说明 |
|--------|------|------|
| P1 | 测试覆盖 | 核心功能单元测试 |
| P1 | 错误监控 | 完善Sentry配置 |
| P2 | 性能优化 | 大量API时的查询优化 |
| P2 | 代码重构 | 提取公共组件 |
| P3 | 文档完善 | API文档、用户指南 |

---

## 每日检查清单

```markdown
□ 代码已推送
□ Vercel 部署成功
□ 核心功能可用
□ 无明显 bug
□ 今日任务完成
□ 明日任务清晰
```

---

## 风险与应对

| 风险 | 应对 |
|------|------|
| 某服务不可用 | 准备备选服务（如Resend → SendGrid） |
| 开发超时 | 砍掉非核心功能，先发布再迭代 |
| 技术难点 | 使用AI辅助，或找开源方案 |
| 疲劳 | 保证休息，马拉松不是冲刺 |

---

## 成功标准

**MVP 发布时必须有：**
- ✅ 用户可以注册/登录
- ✅ 用户可以添加API
- ✅ 系统自动检查API
- ✅ 变更时发送邮件
- ✅ 可以接受付款
- ✅ Landing Page 展示产品

**可以没有：**
- ❌ 完美的UI
- ❌ 所有边缘情况处理
- ❌ 完整的文档
- ❌ 移动端完美体验

---

*MVP开发计划版本: v1.0*
*更新日期: 2026年1月*
