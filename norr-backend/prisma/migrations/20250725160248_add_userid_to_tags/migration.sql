/*
  Warnings:

  - A unique constraint covering the columns `[user_id,name]` on the table `tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "tag_name_key";

-- AlterTable
ALTER TABLE "tag" ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tag_user_id_name_key" ON "tag"("user_id", "name");

-- AddForeignKey
ALTER TABLE "tag" ADD CONSTRAINT "tag_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
