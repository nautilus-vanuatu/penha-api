-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "originalFileName" TEXT NOT NULL,
    "complaintId" INTEGER NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_complaintId_fkey" FOREIGN KEY ("complaintId") REFERENCES "Complaint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
