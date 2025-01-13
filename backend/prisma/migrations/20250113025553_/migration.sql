-- CreateTable
CREATE TABLE "SleepRecords" (
    "id" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,
    "hours" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SleepRecords_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SleepRecords" ADD CONSTRAINT "SleepRecords_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
