/*
  Warnings:

  - Changed the type of `installationId` on the `pull_request` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SubscriptionPlan" AS ENUM ('Free', 'Pro');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('Active', 'Canceled', 'Trailing');

-- AlterTable
ALTER TABLE "pull_request" DROP COLUMN "installationId",
ADD COLUMN     "installationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "subscriptionId" TEXT,
ADD COLUMN     "subscriptionPlan" "SubscriptionPlan" NOT NULL DEFAULT 'Free',
ADD COLUMN     "subscriptionRenewsAt" TIMESTAMP(3),
ADD COLUMN     "subscriptionStatus" "SubscriptionStatus";

-- CreateIndex
CREATE UNIQUE INDEX "pull_request_installationId_prNumber_key" ON "pull_request"("installationId", "prNumber");
