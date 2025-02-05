-- CreateTable
CREATE TABLE "desenvolvedores" (
    "id" SERIAL NOT NULL,
    "nivelId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "hobby" TEXT NOT NULL,

    CONSTRAINT "desenvolvedores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "niveis" (
    "id" SERIAL NOT NULL,
    "nivel" TEXT NOT NULL,

    CONSTRAINT "niveis_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "desenvolvedores" ADD CONSTRAINT "desenvolvedores_nivelId_fkey" FOREIGN KEY ("nivelId") REFERENCES "niveis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
