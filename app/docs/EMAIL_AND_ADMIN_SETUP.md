# 邮件服务和管理后台设置指南

## 📧 问题1: 邮件推送方案

### 当前使用: Resend

**为什么选择Resend:**
- ✅ **不需要企业邮箱** - 只需验证域名DNS
- ✅ **免费额度充足** - 每月3,000封邮件免费
- ✅ **专业可靠** - Next.js官方推荐
- ✅ **简单易用** - REST API，无需SMTP配置

---

## 🔧 Resend 完整设置步骤

### 步骤1: 注册Resend账号
1. 访问 https://resend.com
2. 使用你的邮箱注册（免费）
3. 验证邮箱

### 步骤2: 验证域名 apishift.site

1. **在Resend后台添加域名**
   - 进入 Resend Dashboard
   - 点击 "Domains" → "Add Domain"
   - 输入: `apishift.site`

2. **添加DNS记录到你的域名提供商**

   你需要在域名DNS管理面板（如Cloudflare、Namecheap等）添加以下3条记录：

   ```
   记录类型    名称        值
   --------------------------------------------------------
   TXT        @           v=spf1 include:resend.com ~all

   MX         @           feedback-smtp.resend.com (优先级10)

   TXT        _resend     [Resend提供的验证码，类似: resend_xxx123]

   CNAME      em          [Resend提供的域名，类似: u123.wl.sendgrid.net]
   ```

   **注意:** 具体的值会在Resend后台显示，每个账号不同

3. **等待DNS验证**
   - DNS传播通常需要5-30分钟
   - Resend会自动检测并验证
   - 验证成功后，域名状态会显示为 "Verified"

4. **测试发送**
   - 在Resend后台可以发送测试邮件
   - 使用 `alerts@apishift.site` 或 `reports@apishift.site`

### 步骤3: 获取API密钥

1. 在Resend后台进入 "API Keys"
2. 点击 "Create API Key"
3. 名称填写: `APIShift Production`
4. 权限选择: `Sending access`
5. 复制生成的密钥（以 `re_` 开头）

### 步骤4: 配置Vercel环境变量

在Vercel项目设置中添加:

```
RESEND_API_KEY=re_your_actual_api_key_here
ADMIN_EMAIL=your_personal_email@example.com
```

**ADMIN_EMAIL说明:**
- 这是你个人邮箱，用于接收每日统计报告
- 可以是Gmail、QQ邮箱等任何邮箱
- 用户收到的通知邮件来自 `alerts@apishift.site`
- 你收到的管理报告来自 `reports@apishift.site`

---

## 🎛️ 问题2: 管理后台和每日报告

### ✅ 已完成功能

#### 1. 完整的管理后台 (`/dashboard/admin`)

**功能包括:**
- 📊 **实时统计看板**
  - 总用户数、今日新增、本周新增
  - 活跃用户（有API的用户）
  - 总API数量和告警数
  - 付费用户和试用用户统计

- 👥 **最近7天新增用户列表**
  - 用户名和邮箱
  - 注册地理位置（国家和城市）
  - 订阅计划（FREE/PRO/TEAM）
  - 创建的API数量
  - 注册时间

- 🌍 **地理位置分布**
  - 按国家统计用户活动
  - Top 10国家排名
  - 实时活动计数

- ⚠️ **系统健康监控**
  - 最后一次Cron任务执行时间
  - 过期未检查的API数量
  - 未确认的严重告警数

#### 2. 每日邮件报告（自动化）

**发送时间:** 每天上午9点

**报告内容:**
1. **统计卡片**
   - 新增用户数（总用户数）
   - 新增API数（总API数）
   - API检查次数
   - 创建的告警数

2. **新用户详情表格**
   - 序号、用户名、邮箱
   - 地理位置（城市+国家）
   - 订阅计划
   - 创建的API数量
   - 注册时间

3. **地理分布**
   - Top 10国家及活动次数

4. **快捷操作**
   - "查看完整仪表板"按钮链接到管理后台

**邮件样式:**
- 专业的HTML模板
- 渐变色卡片设计
- 响应式布局
- 品牌一致性（APIShift紫色渐变）

---

## 🚀 如何访问管理后台

### 首次设置管理员权限

1. **登录到数据库**

   如果使用Supabase:
   ```bash
   # 在Supabase后台的SQL Editor中运行
   ```

   如果使用本地数据库:
   ```bash
   psql -d apishift
   ```

2. **授予管理员权限**
   ```sql
   UPDATE "User"
   SET role = 'ADMIN'
   WHERE email = 'your@email.com';
   ```

   将 `your@email.com` 替换为你的注册邮箱

3. **验证权限**
   ```sql
   SELECT id, email, name, role
   FROM "User"
   WHERE role = 'ADMIN';
   ```

### 访问后台

1. 登录网站: https://www.apishift.site/login
2. 使用管理员账号登录
3. 访问: https://www.apishift.site/dashboard/admin

**安全性:**
- 只有role为ADMIN的用户可以访问
- 非管理员访问会自动重定向到普通仪表板
- 所有管理API都有权限检查

---

## 📊 IP地理位置追踪

### 工作原理

1. **IP获取**
   - 从请求头自动提取IP地址
   - 支持 `x-forwarded-for`, `x-real-ip`, `cf-connecting-ip`
   - Vercel和Cloudflare环境兼容

2. **地理位置解析**
   - 使用免费的 ip-api.com API
   - 每分钟45次请求限制（足够使用）
   - 返回国家、城市、ISP等信息
   - 本地IP自动识别为"Localhost"

3. **数据存储**
   - UserActivity 表记录每次活动
   - 包含: 用户ID、操作类型、IP、国家、城市
   - 支持时间范围查询和统计

4. **隐私保护**
   - IP地址不对普通用户展示
   - 仅管理员可见统计数据
   - 符合GDPR要求（仅用于分析）

---

## 🔄 定时任务配置

现在有3个定时任务:

| 任务 | 时间 | 功能 |
|------|------|------|
| `/api/cron/check-apis` | 每天0点 | 检查所有到期的API |
| `/api/cron/check-trials` | 每6小时 | 检查试用到期，发送提醒 |
| `/api/cron/daily-report` | 每天9点 | 生成统计，发送管理员报告 |

**查看日志:**
- Vercel Dashboard → Deployments → Functions
- 点击对应的cron任务查看执行日志

---

## 📝 环境变量清单

确保在Vercel中设置以下变量:

```bash
# 数据库
DATABASE_URL=postgresql://...

# 认证
NEXTAUTH_SECRET=xxx
NEXTAUTH_URL=https://www.apishift.site
GITHUB_ID=xxx
GITHUB_SECRET=xxx

# Cron保护
CRON_SECRET=xxx

# 邮件服务 (必需)
RESEND_API_KEY=re_xxx              # Resend API密钥
ADMIN_EMAIL=your@email.com         # 你的个人邮箱，接收报告

# 分析
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-xxx

# Stripe (可选，付费功能)
# STRIPE_SECRET_KEY=sk_xxx
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_xxx
```

---

## 🧪 测试

### 测试邮件发送
```bash
curl -X POST https://www.apishift.site/api/cron/daily-report \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

### 测试管理后台
1. 授予自己管理员权限（见上方SQL）
2. 访问 /dashboard/admin
3. 查看统计数据是否正确加载

### 测试IP追踪
1. 注册新用户
2. 在管理后台查看"Recent Users"
3. 确认显示正确的国家和城市

---

## 💡 实用技巧

### 1. 批量授予管理员权限
```sql
-- 授予多个用户管理员权限
UPDATE "User"
SET role = 'ADMIN'
WHERE email IN ('admin1@example.com', 'admin2@example.com');
```

### 2. 查看今日新增用户
```sql
SELECT
  email,
  name,
  "createdAt"::date as signup_date,
  (SELECT country FROM "UserActivity" WHERE "userId" = "User".id LIMIT 1) as country
FROM "User"
WHERE "createdAt"::date = CURRENT_DATE
ORDER BY "createdAt" DESC;
```

### 3. 手动生成昨天的统计
```bash
curl -X POST https://www.apishift.site/api/cron/daily-report \
  -H "Authorization: Bearer $CRON_SECRET"
```

### 4. 自定义邮件发送者名称

当前使用:
- 用户通知: `APIShift Alerts <alerts@apishift.site>`
- 管理报告: `APIShift Reports <reports@apishift.site>`

可以在代码中修改为其他名称，但域名部分必须是已验证的 `@apishift.site`

---

## ❓ 常见问题

**Q: 为什么选择Resend而不是用个人邮箱？**
A: 个人邮箱（Gmail/QQ等）有每日发送限制，且容易被标记为垃圾邮件。Resend使用你的域名发送，更专业且到达率更高。

**Q: 3000封/月够用吗？**
A: 假设每个用户每天收到1封通知，可支持100个活跃用户。如果不够，可升级Resend付费计划（$20/月50K封邮件）。

**Q: IP地理位置准确吗？**
A: 国家级别非常准确（>99%），城市级别约80-90%准确。足够用于统计分析。

**Q: 管理后台有权限风险吗？**
A: 只有数据库中role为ADMIN的用户可以访问，且所有操作都经过tRPC权限检查，非常安全。

**Q: 可以添加更多管理员吗？**
A: 可以，使用SQL授权多个用户即可。所有ADMIN都有相同权限。

---

## 🎉 总结

### 已实现的功能

✅ 邮件服务（Resend + apishift.site域名）
✅ 管理后台（实时统计、用户列表、地理分布）
✅ IP地理位置追踪（自动记录国家和城市）
✅ 每日邮件报告（自动发送给管理员）
✅ 系统健康监控
✅ 管理员权限控制

### 下一步行动

1. **设置Resend**
   - [ ] 注册账号
   - [ ] 验证域名DNS
   - [ ] 获取API密钥

2. **配置Vercel**
   - [ ] 添加 RESEND_API_KEY
   - [ ] 添加 ADMIN_EMAIL

3. **授予管理员权限**
   - [ ] 连接数据库
   - [ ] 运行SQL授权

4. **验证功能**
   - [ ] 访问管理后台
   - [ ] 等待明天9点收到邮件报告
   - [ ] 检查用户地理位置显示

---

生成时间: 2026-01-05
版本: 1.0
