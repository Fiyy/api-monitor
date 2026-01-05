-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "trialEndsAt" TIMESTAMP(3),
ADD COLUMN     "trialNotified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "trialStartsAt" TIMESTAMP(3);
