/*
  Warnings:

  - You are about to drop the column `theme_id` on the `checklist_item` table. All the data in the column will be lost.
  - You are about to drop the column `theme_id` on the `note` table. All the data in the column will be lost.
  - You are about to drop the `theme` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `theme_progress` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `topic_id` to the `checklist_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topic_id` to the `note` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "checklist_item" DROP CONSTRAINT "checklist_item_theme_id_fkey";

-- DropForeignKey
ALTER TABLE "note" DROP CONSTRAINT "note_theme_id_fkey";

-- DropForeignKey
ALTER TABLE "theme" DROP CONSTRAINT "theme_user_id_fkey";

-- DropForeignKey
ALTER TABLE "theme_progress" DROP CONSTRAINT "theme_progress_theme_id_fkey";

-- DropForeignKey
ALTER TABLE "theme_progress" DROP CONSTRAINT "theme_progress_user_id_fkey";

-- AlterTable
ALTER TABLE "checklist_item" DROP COLUMN "theme_id",
ADD COLUMN     "topic_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "note" DROP COLUMN "theme_id",
ADD COLUMN     "topic_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "theme";

-- DropTable
DROP TABLE "theme_progress";

-- CreateTable
CREATE TABLE "topic" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topic_progress" (
    "id" TEXT NOT NULL,
    "percent" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "topic_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "topic_progress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "topic" ADD CONSTRAINT "topic_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checklist_item" ADD CONSTRAINT "checklist_item_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic_progress" ADD CONSTRAINT "topic_progress_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic_progress" ADD CONSTRAINT "topic_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
