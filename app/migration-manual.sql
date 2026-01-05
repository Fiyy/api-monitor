-- ====================================
-- 管理员功能数据库迁移
-- 运行此脚本以添加管理后台和统计功能
-- ====================================

-- 1. 创建 UserRole 枚举
DO $$ BEGIN
    CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. 添加 role 列到 User 表
ALTER TABLE "User"
ADD COLUMN IF NOT EXISTS "role" "UserRole" NOT NULL DEFAULT 'USER';

-- 3. 创建 UserActivity 表
CREATE TABLE IF NOT EXISTS "UserActivity" (
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
CREATE TABLE IF NOT EXISTS "DailyStats" (
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
CREATE INDEX IF NOT EXISTS "UserActivity_userId_idx" ON "UserActivity"("userId");
CREATE INDEX IF NOT EXISTS "UserActivity_createdAt_idx" ON "UserActivity"("createdAt");
CREATE INDEX IF NOT EXISTS "UserActivity_action_idx" ON "UserActivity"("action");
CREATE UNIQUE INDEX IF NOT EXISTS "DailyStats_date_key" ON "DailyStats"("date");
CREATE INDEX IF NOT EXISTS "DailyStats_date_idx" ON "DailyStats"("date");
CREATE INDEX IF NOT EXISTS "User_createdAt_idx" ON "User"("createdAt");

-- 6. 添加外键约束
DO $$ BEGIN
    ALTER TABLE "UserActivity"
    ADD CONSTRAINT "UserActivity_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 7. 授予自己管理员权限（替换为你的邮箱）
-- 取消注释并替换邮箱地址
-- UPDATE "User" SET "role" = 'ADMIN' WHERE email = 'your@email.com';

-- 验证迁移
SELECT 'Migration completed successfully!' as status;
SELECT COUNT(*) as user_count FROM "User";
SELECT COUNT(*) as activity_count FROM "UserActivity";
SELECT COUNT(*) as stats_count FROM "DailyStats";
