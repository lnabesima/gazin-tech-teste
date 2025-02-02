/*
  Warnings:

  - A unique constraint covering the columns `[nivel]` on the table `niveis` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "niveis_nivel_key" ON "niveis"("nivel");
