# 🗄️ Supabase 数据库配置快速参考

## 📋 Supabase 设置步骤

### 1️⃣ 创建 Supabase 账号和项目

1. 访问 https://supabase.com
2. 使用 GitHub 账号登录（推荐）
3. 点击 "New Project"

**项目配置**:
```
Name: apishift
Organization: 选择或创建一个组织
Database Password: [使用生成的强密码，务必保存！]
Region: Northeast Asia (Tokyo) 或 Southeast Asia (Singapore)
Pricing Plan: Free（足够使用）
```

4. 点击 "Create new project"
5. 等待 1-2 分钟项目初始化

---

### 2️⃣ 获取数据库连接串

1. 项目创建完成后，点击左侧菜单 **Settings** (齿轮图标)
2. 选择 **Database**
3. 滚动到 **Connection string** 部分
4. 选择 **URI** 格式（不是 Session mode）
5. 复制连接串

**连接串格式示例**:
```
postgresql://postgres:[YOUR-PASSWORD]@db.abcdefghijklmn.supabase.co:5432/postgres
```

**重要**: 将 `[YOUR-PASSWORD]` 替换为您在步骤 1 设置的密码

---

### 3️⃣ 本地测试数据库连接

在部署到 Vercel 之前，先在本地测试连接：

```bash
cd /root/code/products/api-monitor/app

# 临时设置环境变量
export DATABASE_URL="postgresql://postgres:YOUR-PASSWORD@db.xxxxx.supabase.co:5432/postgres"

# 测试连接
npx prisma db pull

# 如果成功，运行迁移
npx prisma migrate deploy
```

**预期输出**:
```
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "postgres", schema "public"

All migrations have been successfully applied.
```

---

### 4️⃣ 验证数据库表

在 Supabase Dashboard 中验证：

1. 点击左侧 **Table Editor**
2. 应该能看到以下表：
   - ✅ User
   - ✅ Account
   - ✅ Session
   - ✅ VerificationToken
   - ✅ Subscription
   - ✅ Api
   - ✅ ApiSnapshot
   - ✅ ChangeAlert
   - ✅ Notification

**如果没有看到表**，重新运行迁移命令。

---

## 🔧 常见问题排查

### 问题 1: 连接超时

**错误信息**:
```
Error: P1001: Can't reach database server
```

**解决方案**:
1. 检查 Supabase 项目是否完全启动（需要 1-2 分钟）
2. 刷新 Supabase Dashboard 查看项目状态
3. 检查网络连接

---

### 问题 2: 密码认证失败

**错误信息**:
```
Error: P1001: Authentication failed
```

**解决方案**:
1. 确认数据库密码正确
2. 检查连接串中的密码是否已 URL 编码
3. 在 Supabase Settings > Database 中重置密码

**密码中的特殊字符需要编码**:
```
# 特殊字符映射
@ → %40
# → %23
$ → %24
& → %26
+ → %2B
```

---

### 问题 3: 迁移失败

**错误信息**:
```
Error: Migration failed to apply cleanly
```

**解决方案**:
```bash
# 重置数据库（仅限测试环境）
npx prisma migrate reset --force

# 重新应用迁移
npx prisma migrate deploy
```

---

### 问题 4: Prisma Client 未生成

**错误信息**:
```
Cannot find module '@prisma/client'
```

**解决方案**:
```bash
# 生成 Prisma Client
npx prisma generate

# 重新安装依赖
npm install @prisma/client
```

---

## 📊 Supabase 免费版限额

| 资源 | 免费版限额 | 说明 |
|------|-----------|------|
| 数据库大小 | 500 MB | 足够早期使用 |
| 带宽 | 5 GB/月 | 监控请求流量 |
| API 请求 | 无限 | ✅ |
| 行数 | 无限 | ✅ |
| 并发连接 | 60 | 对小项目足够 |
| 自动备份 | 7 天 | 每日自动备份 |
| Paused after | 1周不活动 | 访问即恢复 |

**升级建议**:
- 如果数据量超过 500 MB，升级到 Pro ($25/月)
- 免费版暂停后，访问 Dashboard 即可恢复

---

## 🔐 安全最佳实践

### 1. 使用强密码

```bash
# 生成强密码（建议使用此密码）
openssl rand -base64 24
```

### 2. 启用行级安全（RLS）

在 Supabase SQL Editor 中执行（可选，NextAuth 已处理权限）:

```sql
-- 为 User 表启用 RLS
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;

-- 为 Api 表启用 RLS
ALTER TABLE "Api" ENABLE ROW LEVEL SECURITY;

-- 创建策略：用户只能看到自己的 API
CREATE POLICY "Users can only see their own APIs"
ON "Api"
FOR ALL
USING (auth.uid()::text = "userId");
```

### 3. 限制数据库访问

- ❌ 不要将数据库密码提交到 Git
- ✅ 仅在 Vercel 环境变量中存储
- ✅ 使用 `.env.local` 本地开发（已在 .gitignore）

---

## 📈 监控数据库使用情况

### 在 Supabase Dashboard 查看:

1. **Database** > **Usage**
   - 存储使用量
   - 连接数
   - API 请求数

2. **Reports** > **Database**
   - 查询性能
   - 慢查询分析
   - 缓存命中率

3. **Logs** > **Postgres Logs**
   - 实时数据库日志
   - 错误信息

---

## 🔄 数据库备份

### 自动备份（免费版）

- ✅ 每日自动备份
- ✅ 保留 7 天
- ✅ 在 Database > Backups 查看

### 手动备份

```bash
# 导出整个数据库
pg_dump "postgresql://postgres:PASSWORD@db.xxxxx.supabase.co:5432/postgres" > backup.sql

# 导入备份
psql "postgresql://postgres:PASSWORD@db.xxxxx.supabase.co:5432/postgres" < backup.sql
```

---

## 🚀 Vercel 集成

### 在 Vercel 配置 DATABASE_URL

1. Vercel Dashboard > 项目 > Settings > Environment Variables
2. 添加变量：
   ```
   Key: DATABASE_URL
   Value: postgresql://postgres:PASSWORD@db.xxxxx.supabase.co:5432/postgres
   ```
3. 选择: ✅ Production, ✅ Preview, ✅ Development
4. 点击 "Save"

### 测试连接

部署后在 Vercel Function Logs 中检查：
- 没有数据库连接错误
- Prisma migrations 成功应用

---

## 📞 获取帮助

**Supabase 文档**: https://supabase.com/docs
**Prisma 文档**: https://www.prisma.io/docs
**社区支持**: https://github.com/supabase/supabase/discussions

---

## ✅ 配置完成检查清单

部署前确保：

- [ ] Supabase 项目已创建
- [ ] 数据库密码已安全保存
- [ ] 连接串已获取
- [ ] 本地测试迁移成功（10 个表已创建）
- [ ] 连接串已添加到 Vercel 环境变量
- [ ] 在 Supabase Table Editor 能看到所有表

**完成后您就可以开始 Vercel 部署了！** 🚀

参考完整部署指南: `/root/code/products/api-monitor/VERCEL_DEPLOYMENT_GUIDE.md`
