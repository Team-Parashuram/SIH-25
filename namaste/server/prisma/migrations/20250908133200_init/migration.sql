-- CreateTable
CREATE TABLE "public"."namaste_codes" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "display" TEXT NOT NULL,
    "definition" TEXT,
    "system" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'en',
    "synonyms" TEXT[],
    "parent" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "namaste_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."processing_stats" (
    "id" TEXT NOT NULL,
    "system" TEXT NOT NULL,
    "totalRecords" INTEGER NOT NULL DEFAULT 0,
    "validRecords" INTEGER NOT NULL DEFAULT 0,
    "lastUpload" TIMESTAMP(3),
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "processing_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."who_codes" (
    "id" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "definition" TEXT,
    "system" TEXT NOT NULL DEFAULT 'ICD-11',
    "language" TEXT NOT NULL DEFAULT 'en',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "who_codes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "namaste_codes_system_idx" ON "public"."namaste_codes"("system");

-- CreateIndex
CREATE INDEX "namaste_codes_display_idx" ON "public"."namaste_codes"("display");

-- CreateIndex
CREATE INDEX "namaste_codes_code_idx" ON "public"."namaste_codes"("code");

-- CreateIndex
CREATE UNIQUE INDEX "namaste_codes_system_code_key" ON "public"."namaste_codes"("system", "code");

-- CreateIndex
CREATE UNIQUE INDEX "processing_stats_system_key" ON "public"."processing_stats"("system");

-- CreateIndex
CREATE UNIQUE INDEX "who_codes_entityId_key" ON "public"."who_codes"("entityId");

-- CreateIndex
CREATE INDEX "who_codes_entityId_idx" ON "public"."who_codes"("entityId");
