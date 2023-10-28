-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "imageURL" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);
