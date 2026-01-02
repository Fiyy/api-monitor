# APIShift 测试指南

## 🧪 本地开发环境测试

### 前置准备

1. **安装PostgreSQL**
```bash
# macOS (使用 Homebrew)
brew install postgresql@16
brew services start postgresql@16

# Linux (Ubuntu/Debian)
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql

# 验证安装
psql --version
```

2. **创建数据库**
```bash
# 使用 postgres 用户
sudo -u postgres psql

# 在 psql 中执行
CREATE DATABASE apishift;
CREATE USER apishift_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE apishift TO apishift_user;
\q
```

### 步骤1: 克隆和安装

```bash
# 如果还没有克隆
git clone https://github.com/Fiyy/api-monitor.git
cd api-monitor/app

# 安装依赖
npm install --legacy-peer-deps
```

### 步骤2: 配置OAuth应用

#### GitHub OAuth (推荐)

1. 访问 https://github.com/settings/developers
2. 点击 "New OAuth App"
3. 填写信息:
   - Application name: `APIShift Dev`
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. 点击 "Register application"
5. 复制 **Client ID** 和生成 **Client Secret**

#### Google OAuth (可选)

1. 访问 https://console.cloud.google.com/
2. 创建新项目或选择现有项目
3. 启用 "Google+ API"
4. 凭据 > 创建凭据 > OAuth 客户端 ID
5. 应用类型: Web应用
6. 授权重定向 URI: `http://localhost:3000/api/auth/callback/google`
7. 复制 Client ID 和 Client Secret

### 步骤3: 配置环境变量

```bash
# 复制示例文件
cp .env.example .env

# 编辑 .env 文件
nano .env  # 或使用你喜欢的编辑器
```

**最小配置 (.env):**
```bash
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/apishift?schema=public"

# Next Auth
NEXTAUTH_SECRET="运行这个命令生成: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# GitHub OAuth (必须)
GITHUB_ID="你的GitHub Client ID"
GITHUB_SECRET="你的GitHub Client Secret"

# Google OAuth (可选)
GOOGLE_ID="你的Google Client ID"
GOOGLE_SECRET="你的Google Client Secret"

# Cron Jobs (开发环境)
CRON_SECRET="development-cron-secret-123"
```

**生成NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 步骤4: 初始化数据库

```bash
# 生成 Prisma Client
npx prisma generate

# 运行数据库迁移
npx prisma migrate dev --name init

# (可选) 打开 Prisma Studio 查看数据库
npx prisma studio
```

### 步骤5: 启动开发服务器

```bash
npm run dev
```

服务器应该在 http://localhost:3000 启动

---

## ✅ 完整功能测试清单

### 1. 认证流程测试

**测试目标**: 验证OAuth登录和注销

- [ ] 访问 http://localhost:3000
- [ ] 点击 "Get Started Free"
- [ ] 点击 "Continue with GitHub"
- [ ] 授权应用
- [ ] 应该重定向到 `/dashboard`
- [ ] 检查右上角显示你的用户名和头像
- [ ] 点击头像 > "Log out"
- [ ] 应该重定向回首页

**预期结果**:
- ✅ 登录成功后看到Dashboard
- ✅ 用户信息正确显示
- ✅ 登出后回到首页

### 2. API管理测试

**测试目标**: CRUD操作完整流程

#### 2.1 创建API

- [ ] 点击侧边栏 "APIs"
- [ ] 点击 "Add API" 按钮
- [ ] 填写表单:
  - Name: `GitHub User API`
  - URL: `https://api.github.com/users/octocat`
  - Method: `GET`
  - Headers: 留空或填写 `{"Accept": "application/json"}`
  - Check Interval: `Every hour`
- [ ] 点击 "Add API"
- [ ] 应该重定向回API列表
- [ ] 看到新创建的API卡片

**预期结果**:
- ✅ API创建成功
- ✅ 显示在列表中
- ✅ 所有信息正确

#### 2.2 手动检查API

- [ ] 在API卡片上点击 "Check Now" 按钮
- [ ] 按钮应显示 "Checking..." 和旋转图标
- [ ] 几秒后显示成功Toast: "No changes detected"
- [ ] 卡片上的 "Last Check" 更新为 "a few seconds ago"

**预期结果**:
- ✅ 检查成功完成
- ✅ Toast通知显示
- ✅ 时间戳更新

#### 2.3 再次检查(应该没有变化)

- [ ] 再次点击 "Check Now"
- [ ] 应该显示 "No changes detected"

**预期结果**:
- ✅ 相同的schema不会产生alerts

#### 2.4 编辑API

- [ ] 点击API卡片右上角的 "⋮" 菜单
- [ ] 点击 "Edit"
- [ ] 修改名称为: `GitHub User API - Updated`
- [ ] 点击 "Update API"
- [ ] 应该重定向回列表
- [ ] 看到更新后的名称

**预期结果**:
- ✅ 更新成功
- ✅ 新名称显示

#### 2.5 禁用/启用API

- [ ] 点击 "⋮" > "Disable"
- [ ] API卡片上的Status应该变为 "Disabled"
- [ ] 点击 "⋮" > "Enable"
- [ ] Status变回 "Active"

**预期结果**:
- ✅ 状态切换正常工作

#### 2.6 删除API

- [ ] 点击 "⋮" > "Delete"
- [ ] 确认删除对话框
- [ ] API从列表中消失

**预期结果**:
- ✅ 删除成功

### 3. Schema变化检测测试

**测试目标**: 验证核心算法

#### 3.1 创建测试API

创建两个API用于测试不同的变化场景:

**API 1: JSONPlaceholder Post**
```
Name: Test Post API
URL: https://jsonplaceholder.typicode.com/posts/1
Method: GET
```

**API 2: GitHub Repo**
```
Name: Test GitHub Repo
URL: https://api.github.com/repos/facebook/react
Method: GET
```

#### 3.2 手动模拟Schema变化

由于真实API不会频繁变化，我们需要使用以下方法之一:

**方法1: 使用Prisma Studio手动修改**

```bash
npx prisma studio
```

1. 打开 `Api` 表
2. 找到你的测试API
3. 编辑 `lastSchema` 字段，修改其中的一个字段类型
4. 保存
5. 在UI中点击 "Check Now"
6. 应该检测到变化并创建alert

**方法2: 创建测试端点**

创建一个本地端点返回可变的schema:

```bash
# 创建简单的测试服务器
mkdir ~/test-api
cd ~/test-api
npm init -y
npm install express

# 创建 server.js
cat > server.js << 'EOF'
const express = require('express');
const app = express();

let version = 1;

app.get('/test', (req, res) => {
  if (version === 1) {
    res.json({
      id: 1,
      name: "Test",
      status: "active"
    });
  } else {
    res.json({
      id: 1,
      name: "Test",
      status: "active",
      newField: "added",  // 新字段
      count: 100          // 新字段
    });
  }
});

app.get('/toggle', (req, res) => {
  version = version === 1 ? 2 : 1;
  res.json({ version });
});

app.listen(3001, () => {
  console.log('Test API running on http://localhost:3001');
});
EOF

# 启动测试服务器
node server.js
```

然后在APIShift中:
1. 添加API: `http://localhost:3001/test`
2. 点击 "Check Now" - 第一次检查
3. 访问 `http://localhost:3001/toggle` 改变schema
4. 再次点击 "Check Now" - 应该检测到变化
5. 查看Dashboard上的alerts数量增加

**预期结果**:
- ✅ 检测到2个新字段被添加
- ✅ 创建了一个alert
- ✅ Severity为 LOW 或 MEDIUM

### 4. Alerts系统测试

**测试目标**: Alerts页面和功能

- [ ] 点击侧边栏 "Alerts"
- [ ] 看到上一步创建的alert
- [ ] 点击alert卡片
- [ ] 查看详情对话框
- [ ] 检查显示的变化:
  - 字段路径
  - 变化类型
  - 旧值/新值
- [ ] 点击 "Acknowledge" 按钮
- [ ] Alert应该移到 "Acknowledged" 标签
- [ ] 切换到 "Acknowledged" 标签查看

**预期结果**:
- ✅ Alert详情显示完整
- ✅ Acknowledge功能正常
- ✅ 标签切换正常

### 5. Dashboard统计测试

**测试目标**: 验证实时数据

- [ ] 回到Dashboard (点击侧边栏 "Overview")
- [ ] 检查统计卡片:
  - **Total APIs**: 应该显示你创建的API数量
  - **Active Alerts**: 应该显示未确认的alerts数量
  - **Healthy APIs**: 应该显示启用的API数量
  - **Last Check**: 应该显示最近的检查时间
- [ ] 检查 "Recent Alerts" 小部件
- [ ] 应该显示最近5个未确认的alerts
- [ ] 点击 "View all" 应该跳转到Alerts页面

**预期结果**:
- ✅ 所有数字实时更新
- ✅ Recent Alerts显示正确
- ✅ 链接正常工作

### 6. Settings页面测试

**测试目标**: 基本信息显示

- [ ] 点击侧边栏 "Settings"
- [ ] 检查 "Profile" 卡片
- [ ] 应该显示你的GitHub名称和邮箱
- [ ] 查看其他占位卡片(Notifications, Subscription, API Access)

**预期结果**:
- ✅ 个人信息正确显示
- ✅ 页面布局正常

### 7. 自动化Cron测试

**测试目标**: 验证定时任务

#### 方法1: 手动触发Cron端点

```bash
# 使用你的CRON_SECRET
curl -X POST http://localhost:3000/api/cron/check-apis \
  -H "Authorization: Bearer development-cron-secret-123"
```

**预期响应**:
```json
{
  "success": true,
  "timestamp": "2026-01-02T...",
  "summary": {
    "total": 3,
    "successful": 3,
    "failed": 0,
    "changesDetected": 0
  }
}
```

检查:
- [ ] 所有启用的API都被检查
- [ ] Last Check时间在所有API上更新
- [ ] 如果有变化，应该创建新的alerts

#### 方法2: 修改Cron频率(测试用)

临时修改 `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/cron/check-apis",
    "schedule": "*/5 * * * *"  // 每5分钟
  }]
}
```

注意: 这只在Vercel生产环境有效，本地开发需要手动触发。

**预期结果**:
- ✅ Cron端点返回成功
- ✅ APIs被检查
- ✅ 数据库更新

---

## 🌐 生产环境测试

### 部署到Vercel

按照 `docs/deployment-guide.md` 完成部署后:

### 1. 生产环境OAuth测试

- [ ] 访问你的Vercel URL (https://your-app.vercel.app)
- [ ] 更新GitHub OAuth App的callback URL为生产URL
- [ ] 测试登录流程
- [ ] 验证用户信息正确

### 2. 生产环境功能测试

重复所有本地测试，但在生产环境:
- [ ] 创建API
- [ ] 手动检查
- [ ] 查看Alerts
- [ ] Dashboard统计

### 3. Vercel Cron测试

**在Vercel Dashboard:**
1. 访问你的项目
2. 点击 "Cron Jobs" 标签
3. 查看配置的cron任务
4. 等待下一次执行(每小时)
5. 检查Logs标签查看执行日志

**手动触发** (用于测试):
```bash
curl -X POST https://your-app.vercel.app/api/cron/check-apis \
  -H "Authorization: Bearer your-production-cron-secret"
```

### 4. 数据库连接测试

- [ ] 验证Supabase连接正常
- [ ] 检查表是否创建
- [ ] 使用Prisma Studio连接生产数据库:

```bash
# 临时修改 .env 使用生产数据库
DATABASE_URL="your-supabase-connection-string"
npx prisma studio
```

---

## 🐛 常见问题排查

### 问题1: OAuth重定向失败

**症状**: 登录后看到 "Configuration error"

**解决**:
- 检查 NEXTAUTH_URL 是否正确
- 检查OAuth App的callback URL是否匹配
- 检查 NEXTAUTH_SECRET 是否设置

### 问题2: 数据库连接失败

**症状**: "Can't reach database server"

**解决**:
```bash
# 检查PostgreSQL是否运行
sudo systemctl status postgresql  # Linux
brew services list                # macOS

# 检查连接字符串
psql "postgresql://postgres:postgres@localhost:5432/apishift"
```

### 问题3: Prisma Client未生成

**症状**: "Cannot find module '@prisma/client'"

**解决**:
```bash
npx prisma generate
```

### 问题4: Schema检查失败

**症状**: "Check failed" toast

**检查**:
1. 查看浏览器Console (F12)
2. 检查API URL是否可访问
3. 检查API是否返回JSON
4. 查看服务器日志

### 问题5: Cron任务不执行

**症状**: APIs没有自动检查

**检查**:
1. Vercel Pro计划是否激活 (Cron需要Pro)
2. vercel.json配置是否正确
3. CRON_SECRET是否配置
4. 查看Vercel Logs

---

## 📊 测试数据建议

### 推荐的测试API列表

```
1. GitHub User API
   URL: https://api.github.com/users/octocat
   特点: 稳定，结构简单

2. JSONPlaceholder Posts
   URL: https://jsonplaceholder.typicode.com/posts/1
   特点: 免费，可靠

3. GitHub Repo
   URL: https://api.github.com/repos/facebook/react
   特点: 公开，结构复杂

4. Random Dog
   URL: https://dog.ceo/api/breeds/image/random
   特点: 简单，随机数据

5. REST Countries
   URL: https://restcountries.com/v3.1/name/china
   特点: 嵌套结构

6. IP API
   URL: https://api.ipify.org?format=json
   特点: 极简结构
```

### 测试场景覆盖

- [ ] 简单JSON (1-2层)
- [ ] 嵌套对象 (3+层)
- [ ] 数组结构
- [ ] 混合结构 (对象+数组)
- [ ] 大型响应 (>100字段)
- [ ] 小型响应 (<10字段)

---

## ✅ 测试完成清单

### 本地开发环境
- [ ] 安装依赖成功
- [ ] 数据库初始化成功
- [ ] OAuth配置正确
- [ ] 登录/登出正常
- [ ] 创建API成功
- [ ] 手动检查成功
- [ ] Schema变化检测正确
- [ ] Alerts创建和显示
- [ ] Acknowledge功能
- [ ] Dashboard统计实时更新
- [ ] 所有页面可访问
- [ ] 响应式设计正常

### 生产环境
- [ ] Vercel部署成功
- [ ] 生产OAuth正常
- [ ] Supabase连接正常
- [ ] Cron任务配置
- [ ] 所有功能在生产环境正常

### 性能测试
- [ ] 页面加载 <2秒
- [ ] API检查 <5秒
- [ ] 无内存泄漏
- [ ] 移动端体验良好

---

## 🎯 下一步

测试完成后:

1. **记录Bug**: 在GitHub创建Issues
2. **性能优化**: 使用Chrome DevTools分析
3. **用户反馈**: 邀请1-2个朋友测试
4. **监控设置**: 配置Vercel Analytics
5. **文档完善**: 根据测试更新文档

---

**测试愉快！如有问题，查看GitHub Issues或文档。**
