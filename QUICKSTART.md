# 🚀 APIShift 快速开始

10分钟内启动并测试APIShift！

## 📋 前置条件

- Node.js 18+ (推荐 22.17.1)
- PostgreSQL 14+
- GitHub账号

## ⚡ 5步快速启动

### 1️⃣ 安装PostgreSQL并创建数据库

```bash
# macOS
brew install postgresql@16
brew services start postgresql@16

# Linux
sudo apt install postgresql
sudo systemctl start postgresql

# 创建数据库
psql postgres
CREATE DATABASE apishift;
\q
```

### 2️⃣ 克隆项目并安装依赖

```bash
git clone https://github.com/Fiyy/api-monitor.git
cd api-monitor/app
npm install --legacy-peer-deps
```

### 3️⃣ 创建GitHub OAuth App

1. 访问: https://github.com/settings/developers
2. 点击 "New OAuth App"
3. 填写:
   - Name: `APIShift Dev`
   - URL: `http://localhost:3000`
   - Callback: `http://localhost:3000/api/auth/callback/github`
4. 复制 **Client ID** 和 **Client Secret**

### 4️⃣ 配置环境变量

```bash
cp .env.example .env
```

编辑 `.env`，填入：

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/apishift?schema=public"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
NEXTAUTH_URL="http://localhost:3000"
GITHUB_ID="粘贴你的GitHub Client ID"
GITHUB_SECRET="粘贴你的GitHub Client Secret"
CRON_SECRET="dev-secret-123"
```

### 5️⃣ 初始化数据库并启动

```bash
# 生成Prisma Client
npx prisma generate

# 运行数据库迁移
npx prisma migrate dev --name init

# 启动开发服务器
npm run dev
```

访问: **http://localhost:3000** 🎉

---

## 🧪 快速测试流程

### 第一次使用 (5分钟)

1. **登录**
   - 点击 "Get Started Free"
   - 选择 "Continue with GitHub"
   - 授权应用

2. **添加第一个API**
   - 点击侧边栏 "APIs"
   - 点击 "Add API"
   - 填写:
     ```
     Name: GitHub User API
     URL: https://api.github.com/users/octocat
     Method: GET
     Check Interval: Every hour
     ```
   - 点击 "Add API"

3. **手动检查**
   - 在API卡片上点击 "Check Now"
   - 等待几秒
   - 看到成功提示 ✅

4. **查看Dashboard**
   - 点击 "Overview"
   - 查看统计卡片更新

### 测试Schema变化检测 (进阶)

**方法1: 使用测试服务器**

启动一个简单的测试API:

```bash
# 新终端窗口
cd ~
mkdir test-api && cd test-api
npm init -y
npm install express

# 创建server.js
cat > server.js << 'EOF'
const express = require('express');
const app = express();
let v = 1;

app.get('/api', (req, res) => {
  res.json(v === 1
    ? { id: 1, name: "Test" }
    : { id: 1, name: "Test", newField: "Added!" }
  );
});

app.get('/toggle', (req, res) => {
  v = v === 1 ? 2 : 1;
  res.json({ version: v });
});

app.listen(3001, () => console.log('http://localhost:3001'));
EOF

node server.js
```

然后在APIShift中:

1. 添加API: `http://localhost:3001/api`
2. 点击 "Check Now" (第一次检查)
3. 在浏览器访问: `http://localhost:3001/toggle`
4. 再次点击 "Check Now" (第二次检查)
5. 点击侧边栏 "Alerts" 查看检测到的变化！

**方法2: 使用Prisma Studio手动修改**

```bash
# 新终端窗口
cd api-monitor/app
npx prisma studio
```

1. 打开 `Api` 表
2. 找到你的API
3. 点击 `lastSchema` 字段编辑
4. 修改任意字段类型或添加字段
5. 保存
6. 回到UI点击 "Check Now"
7. 查看Alerts！

---

## 🎯 推荐测试API列表

直接复制使用:

| Name | URL | 特点 |
|------|-----|------|
| GitHub User | `https://api.github.com/users/octocat` | 稳定，简单 |
| GitHub Repo | `https://api.github.com/repos/facebook/react` | 复杂结构 |
| JSON Placeholder | `https://jsonplaceholder.typicode.com/posts/1` | 免费可靠 |
| Dog API | `https://dog.ceo/api/breeds/image/random` | 简单随机 |
| IP API | `https://api.ipify.org?format=json` | 极简 |
| Countries API | `https://restcountries.com/v3.1/name/china` | 嵌套深 |

---

## 🐛 遇到问题？

### OAuth不工作
```bash
# 检查配置
cat .env | grep GITHUB

# 确保callback URL完全匹配
http://localhost:3000/api/auth/callback/github
```

### 数据库连接失败
```bash
# 检查PostgreSQL运行
sudo systemctl status postgresql  # Linux
brew services list                # macOS

# 测试连接
psql "postgresql://postgres:postgres@localhost:5432/apishift"
```

### Prisma错误
```bash
# 重新生成
npx prisma generate

# 重置数据库(⚠️ 会删除数据)
npx prisma migrate reset
```

---

## 📚 下一步

测试满意后:

1. **查看完整测试指南**: `docs/testing-guide.md`
2. **部署到生产环境**: `docs/deployment-guide.md`
3. **查看项目进度**: `PROGRESS.md`

---

## 🎉 完成！

现在你已经有了一个完全运行的API监控系统！

**提示**:
- 查看Alerts页面了解如何管理变化
- 测试Cron endpoint: `curl -X POST http://localhost:3000/api/cron/check-apis -H "Authorization: Bearer dev-secret-123"`
- 使用Prisma Studio查看数据: `npx prisma studio`

享受使用APIShift！ 🚀
