# 🚀 APIShift Vercel 部署完整指南

## 📋 部署概览

**域名**: apishift.site
**部署平台**: Vercel
**数据库**: Supabase PostgreSQL
**预计时间**: 30-45 分钟
**难度**: ⭐⭐☆☆☆

---

## ✅ 准备工作检查清单

在开始之前，确保您已准备好：

- [x] 域名 `apishift.site` 已购买
- [ ] GitHub 账号
- [ ] Vercel 账号（免费）
- [ ] Supabase 账号（免费）
- [ ] 代码已推送到 GitHub 仓库

---

## 📦 第一步：推送代码到 GitHub

### 1.1 初始化 Git 仓库（如果还没有）

```bash
cd /root/code/products/api-monitor/app

# 初始化 Git
git init

# 添加所有文件
git add .

# 创建首次提交
git commit -m "Initial commit: APIShift ready for production

🚀 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

### 1.2 创建 GitHub 仓库

访问 https://github.com/new 创建新仓库：

- **Repository name**: `apishift`
- **Description**: `API monitoring and change detection tool`
- **Visibility**: Private（推荐）或 Public
- **不要勾选** "Initialize this repository with a README"

### 1.3 推送代码到 GitHub

```bash
# 添加远程仓库（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/apishift.git

# 推送代码
git branch -M main
git push -u origin main
```

**完成标志**: 在 GitHub 上能看到您的代码

---

## 🗄️ 第二步：配置 Supabase 数据库

### 2.1 创建 Supabase 项目

1. 访问 https://supabase.com
2. 点击 "New Project"
3. 填写项目信息：
   - **Name**: `apishift`
   - **Database Password**: 设置一个强密码（建议使用生成的密码）
   - **Region**: 选择最近的区域（如 `Northeast Asia (Tokyo)` 或 `Southeast Asia (Singapore)`）
4. 点击 "Create new project"（需要等待 1-2 分钟）

### 2.2 获取数据库连接串

1. 项目创建完成后，进入 **Settings** > **Database**
2. 找到 **Connection String** 部分
3. 选择 **URI** 格式
4. 复制连接串，格式类似：
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
   ```
5. 将 `[YOUR-PASSWORD]` 替换为您设置的数据库密码

**重要**: 保存此连接串，稍后配置环境变量时需要使用

### 2.3 运行数据库迁移

在本地测试数据库连接并运行迁移：

```bash
cd /root/code/products/api-monitor/app

# 临时设置环境变量（仅用于迁移）
export DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres"

# 运行 Prisma 迁移
npx prisma migrate deploy

# 验证迁移成功
npx prisma db push
```

**完成标志**: 看到 "Migration applied successfully" 消息

**常见问题**:
- 如果连接超时，检查 Supabase 项目是否已完全启动
- 确保密码中的特殊字符已正确 URL 编码

---

## 🌐 第三步：部署到 Vercel

### 3.1 导入 GitHub 项目到 Vercel

1. 访问 https://vercel.com
2. 点击 "Add New..." > "Project"
3. 选择 "Import Git Repository"
4. 找到并选择您的 `apishift` 仓库
5. 点击 "Import"

### 3.2 配置项目设置

在 "Configure Project" 页面：

**Framework Preset**: Next.js（应该自动检测）

**Root Directory**: `./`（保持默认）

**Build and Output Settings**:
- **Build Command**: 自动使用 `vercel.json` 中的配置
- **Output Directory**: `.next`（默认）
- **Install Command**: 自动使用 `vercel.json` 中的配置

### 3.3 配置环境变量

点击 "Environment Variables" 展开，添加以下变量：

#### 必需变量

| Key | Value | 说明 |
|-----|-------|------|
| `DATABASE_URL` | `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres` | Supabase 数据库连接串 |
| `NEXTAUTH_SECRET` | `7H+OdBzWe8xFhqquTGIljpxJi0rrNoyoWzoEZwJs40A=` | 已生成的强密钥 |
| `NEXTAUTH_URL` | `https://apishift.site` | 生产环境 URL |
| `GITHUB_ID` | `Ov23li5YLHZjgAM3gl77` | GitHub OAuth Client ID |
| `GITHUB_SECRET` | `37297ffed42b400c66d15e080e96998479e0540f` | GitHub OAuth Secret |
| `CRON_SECRET` | `LXHMxzCNOijHheJU7YmVzudTMdvsnmkFa+gu2zo2D4w=` | Cron 任务密钥 |

**所有环境变量都选择**: Production, Preview, Development

#### 可选变量（稍后可添加）

- `GOOGLE_ID`: Google OAuth Client ID
- `GOOGLE_SECRET`: Google OAuth Secret
- `RESEND_API_KEY`: 邮件通知 API Key

### 3.4 部署

1. 检查所有配置无误
2. 点击 "Deploy"
3. 等待构建完成（约 2-3 分钟）

**完成标志**: 看到 "Congratulations!" 页面和 Vercel 提供的临时域名（如 `apishift-xxx.vercel.app`）

---

## 🌍 第四步：绑定自定义域名

### 4.1 在 Vercel 中添加域名

1. 进入项目 Dashboard
2. 点击 "Settings" > "Domains"
3. 在 "Add Domain" 输入框中输入: `apishift.site`
4. 点击 "Add"

Vercel 会提示您配置 DNS 记录。

### 4.2 配置 DNS 记录

根据 Vercel 的提示，在您的域名注册商处添加以下 DNS 记录：

**方式一：使用 A 记录（推荐）**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: Auto 或 3600
```

**方式二：使用 CNAME（如果支持）**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
TTL: Auto 或 3600
```

**添加 www 子域名（可选）**:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: Auto 或 3600
```

### 4.3 等待 DNS 生效

- DNS 传播通常需要 **5-30 分钟**
- 部分地区可能需要 **最多 48 小时**
- Vercel 会自动检测并配置 SSL 证书

**检查方式**:
```bash
# 检查 DNS 是否生效
nslookup apishift.site

# 或使用
dig apishift.site
```

**完成标志**: 访问 `https://apishift.site` 能看到您的网站

---

## 🔐 第五步：更新 GitHub OAuth 配置

### 5.1 更新 GitHub OAuth App

1. 访问 https://github.com/settings/developers
2. 找到 `APIShift Production` OAuth App
3. 点击 "Edit"
4. 更新以下配置：

**Homepage URL**:
```
https://apishift.site
```

**Authorization callback URL**:
```
https://apishift.site/api/auth/callback/github
```

5. 点击 "Update application"

### 5.2 测试 GitHub 登录

1. 访问 `https://apishift.site`
2. 点击 "Sign in with GitHub"
3. 授权应用
4. 应该能成功登录

**完成标志**: GitHub 登录功能正常工作

---

## 🎯 第六步（可选）：配置 Google OAuth

如果需要支持 Gmail 登录：

### 6.1 创建 Google OAuth 凭证

1. 访问 https://console.cloud.google.com/
2. 创建新项目或选择现有项目
3. 启用 "Google+ API"
4. 进入 "Credentials" > "Create Credentials" > "OAuth client ID"
5. 选择 "Web application"
6. 配置：
   - **Name**: `APIShift`
   - **Authorized JavaScript origins**: `https://apishift.site`
   - **Authorized redirect URIs**: `https://apishift.site/api/auth/callback/google`

### 6.2 添加环境变量到 Vercel

1. 进入 Vercel 项目 Settings > Environment Variables
2. 添加：
   - `GOOGLE_ID`: 您的 Google Client ID
   - `GOOGLE_SECRET`: 您的 Google Client Secret
3. 点击 "Save"
4. 重新部署项目：Deployments > 最新部署 > ⋯ > "Redeploy"

**完成标志**: Gmail 登录按钮出现并可用

---

## ✅ 第七步：验证部署成功

### 7.1 功能测试清单

访问 `https://apishift.site` 并测试：

- [ ] 网站使用 HTTPS（地址栏显示锁图标）
- [ ] GitHub 登录成功
- [ ] 创建新 API 监控
- [ ] Dashboard 显示正常
- [ ] Analytics 页面可访问
- [ ] Billing 页面可访问
- [ ] Settings 页面可访问
- [ ] 数据持久化（刷新页面数据不丢失）

### 7.2 检查 Vercel Cron 任务

1. 进入 Vercel 项目 Dashboard
2. 点击 "Cron Jobs" 标签
3. 应该能看到 `/api/cron/check-apis` 每小时执行一次

### 7.3 监控部署日志

1. 进入 "Deployments" 标签
2. 点击最新部署
3. 查看 "Build Logs" 和 "Function Logs"
4. 确保没有错误

---

## 🎉 恭喜！部署完成

您的 APIShift 现在已成功部署到生产环境！

**生产环境 URL**: https://apishift.site

### 🔄 后续更新流程

每次更新代码后：

```bash
# 在本地开发完成后
git add .
git commit -m "描述您的更改"
git push

# Vercel 会自动检测并重新部署
```

### 📊 生产环境状态

| 项目 | 状态 | 说明 |
|------|------|------|
| ✅ 域名 | `apishift.site` | 已绑定 |
| ✅ SSL | HTTPS | Vercel 自动配置 |
| ✅ 数据库 | Supabase | 生产级 PostgreSQL |
| ✅ CDN | 全球加速 | Vercel Edge Network |
| ✅ 自动部署 | CI/CD | Git push 触发 |
| ✅ Cron 任务 | 每小时 | API 自动检查 |
| ✅ GitHub OAuth | 已配置 | 登录可用 |
| ⏳ Google OAuth | 可选 | 按需配置 |

---

## 🆘 常见问题排查

### 问题 1: 部署失败

**检查**:
- Vercel 构建日志中的错误信息
- 环境变量是否完整配置
- `DATABASE_URL` 格式是否正确

**解决**:
```bash
# 在本地测试生产构建
npm run build
```

### 问题 2: 数据库连接失败

**检查**:
- Supabase 项目是否处于活跃状态
- 数据库密码是否正确
- 连接串中的特殊字符是否已 URL 编码

**解决**:
- 在 Supabase Dashboard 重置数据库密码
- 更新 Vercel 环境变量

### 问题 3: GitHub 登录失败

**检查**:
- GitHub OAuth 回调 URL 是否更新为 `https://apishift.site/api/auth/callback/github`
- `GITHUB_ID` 和 `GITHUB_SECRET` 是否正确

**解决**:
- 访问 https://github.com/settings/developers 检查配置
- 确保 OAuth App 状态为 Active

### 问题 4: DNS 未生效

**检查**:
```bash
nslookup apishift.site
```

**解决**:
- 等待 DNS 传播（通常 5-30 分钟）
- 清除浏览器缓存
- 使用隐私/无痕模式测试

### 问题 5: Cron 任务未执行

**检查**:
- Vercel Dashboard > Cron Jobs 是否显示
- Function Logs 中是否有错误

**解决**:
- 确保 Vercel 免费版支持 Cron（Pro 版本保证）
- 检查 `CRON_SECRET` 是否配置正确

---

## 📞 需要帮助？

如果遇到任何问题，请提供：
1. 错误截图或日志
2. Vercel 部署日志
3. 浏览器控制台错误信息

---

## 📁 相关文件

- **环境变量模板**: `/root/code/products/api-monitor/app/.env.production.template`
- **Vercel 配置**: `/root/code/products/api-monitor/app/vercel.json`
- **生产检查清单**: `/root/code/products/api-monitor/PRODUCTION_CHECKLIST.md`
- **域名配置说明**: `/root/code/products/api-monitor/DOMAIN_SETUP_TODO.md`

---

**祝您部署顺利！** 🚀
