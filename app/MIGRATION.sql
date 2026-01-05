-- ==========================================
-- 直接在 Supabase SQL Editor 运行此SQL
-- ==========================================

-- 1. 创建枚举
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- 2. 添加 role 列
ALTER TABLE "User" ADD COLUMN "role" "UserRole" NOT NULL DEFAULT 'USER';

-- 3. 创建 UserActivity 表
CREATE TABLE "UserActivity" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "ip" TEXT,
    "userAgent" TEXT,
    "country" TEXT,
    "city" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserActivity_pkey" PRIMARY KEY ("id")
);

-- 4. 创建 DailyStats 表
CREATE TABLE "DailyStats" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "newUsers" INTEGER NOT NULL DEFAULT 0,
    "totalUsers" INTEGER NOT NULL DEFAULT 0,
    "activeUsers" INTEGER NOT NULL DEFAULT 0,
    "newApis" INTEGER NOT NULL DEFAULT 0,
    "totalApis" INTEGER NOT NULL DEFAULT 0,
    "checksRun" INTEGER NOT NULL DEFAULT 0,
    "alertsCreated" INTEGER NOT NULL DEFAULT 0,
    "topCountries" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DailyStats_pkey" PRIMARY KEY ("id")
);

-- 5. 创建索引
CREATE INDEX "UserActivity_userId_idx" ON "UserActivity"("userId");
CREATE INDEX "UserActivity_createdAt_idx" ON "UserActivity"("createdAt");
CREATE INDEX "UserActivity_action_idx" ON "UserActivity"("action");
CREATE UNIQUE INDEX "DailyStats_date_key" ON "DailyStats"("date");
CREATE INDEX "DailyStats_date_idx" ON "DailyStats"("date");
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");

-- 6. 添加外键
ALTER TABLE "UserActivity"
ADD CONSTRAINT "UserActivity_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

-- 7. 授予你的账号管理员权限（修改邮箱）
UPDATE "User" SET "role" = 'ADMIN' WHERE email = 'YOUR_EMAIL@example.com';

-- 验证
SELECT 'Migration SUCCESS!' as result;
SELECT email, role FROM "User" WHERE role = 'ADMIN';
