-- CreateEnum
CREATE TYPE "PullRequestStatus" AS ENUM ('Review', 'Pending', 'Processing', 'Reviewed', 'RateLimited');

-- CreateEnum
CREATE TYPE "RepoSyncStatus" AS ENUM ('Pending', 'Synced', 'Syncing', 'Failed');

-- CreateTable
CREATE TABLE "github_installation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "installationId" INTEGER NOT NULL,
    "accountLogin" TEXT,
    "accountType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "github_installation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pull_request" (
    "id" TEXT NOT NULL,
    "installationId" TEXT NOT NULL,
    "repoFullName" TEXT NOT NULL,
    "prNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "authorLogin" TEXT,
    "headSha" TEXT NOT NULL,
    "baseBranch" TEXT NOT NULL,
    "status" "PullRequestStatus" NOT NULL,
    "reviewComment" TEXT NOT NULL,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pull_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "repo_sync" (
    "id" TEXT NOT NULL,
    "installationId" INTEGER NOT NULL,
    "repoFullName" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "status" "RepoSyncStatus" NOT NULL,
    "chunkCount" INTEGER NOT NULL DEFAULT 0,
    "syncedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "repo_sync_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "github_installation_userId_key" ON "github_installation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "pull_request_installationId_prNumber_key" ON "pull_request"("installationId", "prNumber");

-- CreateIndex
CREATE UNIQUE INDEX "repo_sync_repoFullName_key" ON "repo_sync"("repoFullName");

-- AddForeignKey
ALTER TABLE "github_installation" ADD CONSTRAINT "github_installation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
