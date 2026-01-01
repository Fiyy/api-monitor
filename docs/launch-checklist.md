# APIShift 上线清单

> 从代码到收款的完整检查清单

---

## 🔧 技术准备

### 基础设施
- [ ] 域名注册并配置DNS
  - 主域名：apishift.dev
  - 备选：tryapishift.com, apishift.io
- [ ] SSL证书配置（Vercel自动）
- [ ] 生产环境变量配置
- [ ] 数据库生产实例就绪
- [ ] Redis生产实例就绪

### 部署
- [ ] Vercel项目配置完成
- [ ] 生产分支保护设置
- [ ] 自动部署流水线工作
- [ ] Preview部署可用
- [ ] 回滚策略确认

### 监控与日志
- [ ] Sentry错误监控配置
- [ ] Vercel Analytics启用
- [ ] 关键路径日志记录
- [ ] 告警规则设置
- [ ] On-call联系方式配置

### 安全
- [ ] 环境变量加密存储
- [ ] API密钥不在代码中
- [ ] Rate limiting配置
- [ ] CORS策略正确
- [ ] CSP headers配置

### 备份
- [ ] 数据库自动备份
- [ ] 备份恢复测试
- [ ] 关键数据导出功能

---

## 💳 支付系统

### Stripe配置
- [ ] Stripe账户激活
- [ ] 银行账户绑定
- [ ] 税务信息填写
- [ ] 产品创建
  - [ ] Pro Monthly ($9)
  - [ ] Pro Yearly ($90)
  - [ ] Team Monthly ($29)
  - [ ] Team Yearly ($290)
  - [ ] Lifetime ($99)

### Webhook配置
- [ ] Webhook endpoint配置
- [ ] 签名验证实现
- [ ] 以下事件处理：
  - [ ] checkout.session.completed
  - [ ] customer.subscription.created
  - [ ] customer.subscription.updated
  - [ ] customer.subscription.deleted
  - [ ] invoice.payment_failed

### 测试
- [ ] 测试模式支付流程
- [ ] 订阅升级测试
- [ ] 订阅取消测试
- [ ] 支付失败处理测试
- [ ] 退款流程测试

---

## 📧 邮件系统

### Resend配置
- [ ] 域名验证
- [ ] 发送域名DNS记录配置
- [ ] SPF/DKIM/DMARC配置

### 邮件模板
- [ ] 欢迎邮件
- [ ] 验证邮件（如需要）
- [ ] API变更通知邮件
- [ ] 付款成功邮件
- [ ] 付款失败邮件
- [ ] 订阅到期提醒

### 测试
- [ ] 所有邮件模板测试发送
- [ ] 邮件到达率检查
- [ ] 垃圾邮件评分检查

---

## 📱 产品功能

### 核心功能
- [ ] 用户注册/登录
- [ ] GitHub OAuth登录
- [ ] Google OAuth登录
- [ ] 添加API监控
- [ ] 自动schema检测
- [ ] 定时检查运行
- [ ] 变更通知发送
- [ ] 历史记录查看

### 付费功能
- [ ] 免费版限制生效
- [ ] Pro版功能解锁
- [ ] Team版功能解锁
- [ ] 升级流程顺畅
- [ ] 降级流程处理

### 用户体验
- [ ] 加载状态显示
- [ ] 错误信息友好
- [ ] 空状态设计
- [ ] 新用户引导
- [ ] 移动端可用

---

## 🎨 Landing Page

### 内容
- [ ] Hero section清晰
- [ ] 价值主张明确
- [ ] 功能介绍完整
- [ ] 截图/视频就绪
- [ ] 定价表准确
- [ ] FAQ完整
- [ ] 客户证言（可选）

### SEO
- [ ] Title标签优化
- [ ] Meta description
- [ ] OG图片
- [ ] Twitter Card
- [ ] Sitemap
- [ ] Robots.txt

### 技术
- [ ] 响应式设计
- [ ] Core Web Vitals合格
- [ ] 无明显bug

---

## 📜 法律合规

### 页面
- [ ] 隐私政策
- [ ] 服务条款
- [ ] Cookie政策
- [ ] 退款政策

### GDPR（如适用）
- [ ] 数据处理同意
- [ ] 数据删除功能
- [ ] 数据导出功能

---

## 🚀 发布准备

### 账号准备
- [ ] Product Hunt账号
- [ ] Hacker News账号（有历史）
- [ ] Reddit账号（有karma）
- [ ] Twitter/X账号
- [ ] 独立开发者社群账号

### 发布材料
- [ ] Product Hunt发布页面
- [ ] Hacker News帖子草稿
- [ ] Reddit帖子草稿
- [ ] Twitter发布帖草稿
- [ ] 演示视频（1分钟）
- [ ] 高质量截图（5张）
- [ ] Logo和品牌素材

### 预热
- [ ] 邮件列表收集（如有）
- [ ] 早期支持者通知
- [ ] 社交媒体预告

---

## 📊 分析设置

### 工具
- [ ] Plausible Analytics配置
- [ ] 转化事件追踪
- [ ] 用户行为追踪
- [ ] 收入追踪

### 关键事件
- [ ] 注册
- [ ] 添加第一个API
- [ ] 完成支付
- [ ] 升级订阅

---

## 🆘 支持准备

### 渠道
- [ ] 支持邮箱配置 (support@apishift.dev)
- [ ] Crisp/Intercom配置（可选）
- [ ] 反馈收集渠道

### 文档
- [ ] 快速开始指南
- [ ] 常见问题解答
- [ ] API文档（如有公开API）

---

## ✅ 最终检查

### 发布前24小时
- [ ] 全流程端到端测试
- [ ] 支付流程测试（真实小额）
- [ ] 邮件送达测试
- [ ] 移动端测试
- [ ] 不同浏览器测试
- [ ] 加载速度检查
- [ ] 安全扫描

### 发布日
- [ ] 监控仪表盘打开
- [ ] 支持渠道在线
- [ ] 团队（自己）待命
- [ ] 回滚方案就绪

---

## 🎉 发布后

### 第一周
- [ ] 每日监控关键指标
- [ ] 快速响应用户反馈
- [ ] 修复关键bug
- [ ] 发布更新日志
- [ ] 感谢早期支持者

### 第一月
- [ ] 用户访谈（5-10个）
- [ ] 分析用户行为数据
- [ ] 迭代产品功能
- [ ] 内容营销启动
- [ ] 第一个案例研究

---

## 🔗 关键链接

```
生产环境：https://apishift.dev
Staging：https://staging.apishift.dev
Vercel Dashboard：https://vercel.com/...
Supabase Dashboard：https://app.supabase.com/...
Stripe Dashboard：https://dashboard.stripe.com
Sentry：https://sentry.io/...
Resend：https://resend.com/...
```

---

*上线清单版本: v1.0*
*更新日期: 2026年1月*
