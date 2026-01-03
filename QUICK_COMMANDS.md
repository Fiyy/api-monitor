# ⚡ 部署快速命令参考卡

## 📦 第一步：推送代码到 GitHub

```bash
cd /root/code/products/api-monitor/app

# 初始化 Git（如果还没有）
git init
git add .
git commit -m "Initial commit: APIShift ready for production

🚀 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# 添加远程仓库（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/apishift.git
git branch -M main
git push -u origin main
```

---

## 🗄️ 第二步：测试 Supabase 数据库

```bash
cd /root/code/products/api-monitor/app

# 设置 Supabase 连接串（替换为您的连接串）
export DATABASE_URL="postgresql://postgres:YOUR-PASSWORD@db.xxxxx.supabase.co:5432/postgres"

# 测试连接
npx prisma db pull

# 运行迁移
npx prisma migrate deploy

# 生成 Prisma Client
npx prisma generate
```

---

## 🌐 第三步：Vercel 环境变量（复制粘贴）

在 Vercel Project Settings > Environment Variables 中添加：

```bash
# 数据库（从 Supabase 获取）
DATABASE_URL=postgresql://postgres:YOUR-PASSWORD@db.xxxxx.supabase.co:5432/postgres

# NextAuth（已生成）
NEXTAUTH_SECRET=7H+OdBzWe8xFhqquTGIljpxJi0rrNoyoWzoEZwJs40A=
NEXTAUTH_URL=https://apishift.site

# GitHub OAuth（当前配置）
GITHUB_ID=Ov23li5YLHZjgAM3gl77
GITHUB_SECRET=37297ffed42b400c66d15e080e96998479e0540f

# Cron（已生成）
CRON_SECRET=LXHMxzCNOijHheJU7YmVzudTMdvsnmkFa+gu2zo2D4w=
```

---

## 🔧 本地测试生产构建

```bash
cd /root/code/products/api-monitor/app

# 安装依赖
npm install --legacy-peer-deps

# 生成 Prisma Client
npx prisma generate

# 构建生产版本
npm run build

# 测试生产模式
npm run start

# 访问 http://localhost:3000 测试
```

---

## 🌍 DNS 配置（在域名注册商处）

添加以下 A 记录：

```
Type: A
Name: @
Value: 76.76.21.21
TTL: Auto 或 3600
```

可选 www 子域名：

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: Auto 或 3600
```

---

## 🔄 更新 GitHub OAuth

访问: https://github.com/settings/developers

更新 `APIShift Production` OAuth App：

```
Homepage URL: https://apishift.site
Authorization callback URL: https://apishift.site/api/auth/callback/github
```

---

## 📊 验证部署成功

```bash
# 检查 DNS 是否生效
nslookup apishift.site

# 或使用 dig
dig apishift.site

# 测试 HTTPS 访问
curl -I https://apishift.site

# 应该看到 HTTP/2 200
```

---

## 🆘 故障排查命令

```bash
# 查看 Prisma 数据库状态
npx prisma db pull

# 查看所有表
npx prisma studio

# 重新生成 Prisma Client
npx prisma generate

# 测试数据库连接
npx prisma db execute --stdin <<< "SELECT 1;"

# 查看迁移状态
npx prisma migrate status
```

---

## 📂 快速导航

| 文档 | 命令 |
|------|------|
| 完整部署指南 | `cat VERCEL_DEPLOYMENT_GUIDE.md` |
| Supabase 参考 | `cat SUPABASE_QUICK_REFERENCE.md` |
| 域名配置清单 | `cat DOMAIN_SETUP_TODO.md` |
| 环境变量模板 | `cat app/.env.production.template` |
| 部署就绪说明 | `cat READY_TO_DEPLOY.md` |

---

## 🔐 重新生成密钥（如需要）

```bash
# 生成新的 NEXTAUTH_SECRET
openssl rand -base64 32

# 生成新的 CRON_SECRET
openssl rand -base64 32

# 生成新的数据库密码
openssl rand -base64 24
```

---

## 🚀 部署后测试清单

访问 https://apishift.site 并测试：

```bash
# 1. 检查 HTTPS
curl -I https://apishift.site | grep "HTTP"

# 2. 测试登录页面
curl https://apishift.site/login

# 3. 测试 API 健康检查（如果有）
curl https://apishift.site/api/health

# 4. 测试 Cron endpoint（需要 CRON_SECRET）
curl -H "Authorization: Bearer LXHMxzCNOijHheJU7YmVzudTMdvsnmkFa+gu2zo2D4w=" \
     https://apishift.site/api/cron/check-apis
```

---

## ⏩ 快速链接

| 服务 | URL |
|------|-----|
| Vercel Dashboard | https://vercel.com/dashboard |
| Supabase Dashboard | https://supabase.com/dashboard |
| GitHub OAuth Apps | https://github.com/settings/developers |
| Google Cloud Console | https://console.cloud.google.com |
| GitHub 仓库创建 | https://github.com/new |

---

**保存此文件以便快速参考！** 📌
