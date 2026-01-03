# 🚀 APIShift 生产环境上线检查清单

## 📊 当前状态

✅ **已完成（开发环境）**
- [x] 数据库配置（本地 PostgreSQL）
- [x] 所有功能页面开发完成
- [x] GitHub OAuth 配置（开发环境）
- [x] 基本功能测试通过
- [x] 开发服务器运行正常

⚠️ **运行模式**: 开发模式 (`npm run dev`)
⚠️ **数据库**: 本地 PostgreSQL
⚠️ **访问方式**: IP 地址 + HTTP

---

## 🎯 距离正式上线的差距分析

### 🔴 必须完成（Critical）

#### 1. 域名和 SSL（优先级：最高）
**当前状态**: ❌ 使用 IP 地址 `http://170.106.105.120:3000`
**需要完成**:
- [ ] 购买域名（如 `apishift.com`）
- [ ] 配置 DNS A 记录指向 `170.106.105.120`
- [ ] 配置 SSL 证书（推荐使用 Vercel 自动配置）
- [ ] 更新 OAuth 回调 URL

**影响**:
- ❌ 无法使用 Gmail 登录
- ❌ 不符合生产环境安全标准
- ❌ 浏览器会显示"不安全"警告

---

#### 2. 生产环境数据库（优先级：最高）
**当前状态**: ❌ 本地 PostgreSQL，密码弱，无备份
**需要完成**:
- [ ] 选择托管数据库服务（推荐 Supabase 或 Railway）
- [ ] 创建生产数据库实例
- [ ] 运行 Prisma 迁移到生产数据库
- [ ] 配置数据库连接池
- [ ] 设置自动备份策略

**推荐方案**:
```bash
# Supabase（推荐）
1. 注册 https://supabase.com
2. 创建项目
3. 获取数据库连接串
4. 更新 DATABASE_URL
```

**当前风险**:
- ❌ 数据无备份，服务器重启可能丢失
- ❌ 单点故障
- ❌ 性能未优化

---

#### 3. 安全密钥更新（优先级：高）
**当前状态**: ❌ 使用开发环境弱密钥
**需要完成**:
- [ ] 生成强 NEXTAUTH_SECRET
- [ ] 生成强 CRON_SECRET
- [ ] 更新生产环境变量

**操作命令**:
```bash
# 生成强密钥
openssl rand -base64 32  # 用于 NEXTAUTH_SECRET
openssl rand -base64 32  # 用于 CRON_SECRET
```

**当前风险**:
- ❌ 弱密钥可被破解
- ❌ Session 可被伪造
- ❌ Cron 任务可被未授权调用

---

#### 4. 部署方式选择（优先级：高）
**当前状态**: ❌ 开发模式运行，进程未持久化
**需要完成**: 选择以下方案之一

##### 方案 A: Vercel 部署（推荐，最简单）
- [ ] 推送代码到 GitHub
- [ ] 导入项目到 Vercel
- [ ] 配置环境变量
- [ ] 自动获得 HTTPS + CDN

**优点**:
- ✅ 零配置 SSL
- ✅ 全球 CDN
- ✅ 自动扩展
- ✅ CI/CD 集成
- ✅ Vercel Cron 自动启用

**缺点**:
- ⚠️ 免费版有限制
- ⚠️ 需要域名

##### 方案 B: 当前服务器（需要配置）
- [ ] 构建生产版本
- [ ] 配置进程管理器（PM2）
- [ ] 配置 Nginx 反向代理
- [ ] 配置 SSL 证书（Let's Encrypt）
- [ ] 配置开机自启动

**优点**:
- ✅ 完全控制
- ✅ 无第三方依赖

**缺点**:
- ⚠️ 需要手动配置
- ⚠️ 需要自己维护
- ⚠️ 需要设置监控

---

### 🟡 强烈推荐（Important）

#### 5. 环境变量完整配置
**需要完成**:
- [ ] 创建 `.env.production` 文件
- [ ] 配置所有生产环境变量
- [ ] 移除开发环境注释

**生产环境 `.env.production` 示例**:
```bash
# Production Database
DATABASE_URL="postgresql://user:password@db.supabase.co:5432/postgres"

# NextAuth (HTTPS + 域名)
NEXTAUTH_SECRET="[用 openssl rand -base64 32 生成]"
NEXTAUTH_URL="https://yourdomain.com"

# GitHub OAuth
GITHUB_ID="Ov23li5YLHZjgAM3gl77"
GITHUB_SECRET="37297ffed42b400c66d15e080e96998479e0540f"

# Google OAuth (可选)
GOOGLE_ID="your-google-client-id"
GOOGLE_SECRET="your-google-client-secret"

# Cron Security
CRON_SECRET="[用 openssl rand -base64 32 生成]"

# Optional: Email notifications
RESEND_API_KEY="re_xxxxxxxxxxxx"
```

---

#### 6. OAuth 回调 URL 更新
**当前状态**: ❌ 配置为开发环境 IP
**需要完成**:

**GitHub OAuth**:
- [ ] 访问 https://github.com/settings/developers
- [ ] 更新 Homepage URL: `https://yourdomain.com`
- [ ] 更新 Callback URL: `https://yourdomain.com/api/auth/callback/github`

**Google OAuth** (如果使用):
- [ ] 访问 https://console.cloud.google.com
- [ ] 更新授权重定向 URI: `https://yourdomain.com/api/auth/callback/google`

---

#### 7. 生产构建和测试
**需要完成**:
- [ ] 运行生产构建测试
- [ ] 检查构建错误
- [ ] 测试生产模式运行

**操作命令**:
```bash
cd /root/code/products/api-monitor/app

# 构建生产版本
npm run build

# 测试生产模式
npm run start

# 检查是否有错误
```

---

### 🟢 建议完成（Nice to have）

#### 8. 监控和日志
- [ ] 配置错误监控（如 Sentry）
- [ ] 配置日志收集
- [ ] 配置性能监控
- [ ] 配置正常运行时间监控

#### 9. 备份策略
- [ ] 数据库自动备份（每日）
- [ ] 代码版本控制（已有 Git）
- [ ] 环境变量备份

#### 10. 性能优化
- [ ] 启用数据库连接池
- [ ] 配置 CDN（Vercel 自带）
- [ ] 启用缓存策略
- [ ] 图片优化

#### 11. 文档和运维
- [ ] 编写部署文档
- [ ] 编写故障恢复文档
- [ ] 配置监控告警

---

## 📋 快速上线路径推荐

### 🚀 方案一：Vercel 快速部署（推荐）

**时间**: 30 分钟
**难度**: ⭐⭐☆☆☆

1. **准备工作** (10分钟)
   - [ ] 购买域名（如 Namecheap, 阿里云）
   - [ ] 注册 Supabase 账号
   - [ ] 注册 Vercel 账号

2. **数据库配置** (10分钟)
   - [ ] Supabase 创建项目
   - [ ] 获取数据库连接串
   - [ ] 运行 Prisma 迁移

3. **Vercel 部署** (10分钟)
   - [ ] 推送代码到 GitHub
   - [ ] Vercel 导入项目
   - [ ] 配置环境变量
   - [ ] 绑定域名

**完成后即可上线！**

---

### 🖥️ 方案二：当前服务器部署

**时间**: 2-3 小时
**难度**: ⭐⭐⭐⭐☆

1. **数据库配置** (30分钟)
   - [ ] 使用托管数据库或配置生产 PostgreSQL
   - [ ] 设置备份

2. **应用配置** (30分钟)
   - [ ] 生成安全密钥
   - [ ] 配置生产环境变量
   - [ ] 构建生产版本

3. **服务器配置** (1小时)
   - [ ] 安装 PM2
   - [ ] 配置 Nginx
   - [ ] 配置 SSL（Let's Encrypt）
   - [ ] 配置防火墙

4. **域名配置** (30分钟)
   - [ ] DNS 解析
   - [ ] 更新 OAuth 回调

---

## ⚠️ 当前最大风险

| 风险 | 影响 | 解决方案 |
|------|------|----------|
| **开发模式运行** | 进程不稳定，性能差 | 切换到生产模式 |
| **本地数据库** | 数据可能丢失 | 使用托管数据库 |
| **HTTP 访问** | 不安全，OAuth 受限 | 配置域名 + SSL |
| **弱密钥** | 安全漏洞 | 生成强密钥 |
| **无进程管理** | 崩溃无法恢复 | 使用 PM2 或 Vercel |

---

## ✅ 最小上线配置（MVP）

如果要**最快上线**，最少需要完成：

1. ✅ 购买域名
2. ✅ 配置托管数据库（Supabase）
3. ✅ 部署到 Vercel
4. ✅ 更新 OAuth 回调 URL
5. ✅ 生成强密钥

**总时间**: 约 1 小时
**成本**:
- 域名: ~$10-15/年
- Supabase: 免费版足够
- Vercel: 免费版足够

---

## 📞 需要帮助？

选择您的上线方案后，我可以：
- ✅ 帮您配置 Vercel 部署
- ✅ 帮您配置 PM2 + Nginx
- ✅ 帮您生成所有必需的密钥
- ✅ 帮您配置数据库迁移
- ✅ 提供完整的部署脚本

**请告诉我您选择哪个方案，我立即协助您完成！**
