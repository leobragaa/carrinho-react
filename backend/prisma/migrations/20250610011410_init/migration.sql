/*
  Warnings:

  - You are about to drop the column `cep` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `numero` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `rua` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the `Carrinho` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Carrinho" DROP CONSTRAINT "Carrinho_produtoId_fkey";

-- DropForeignKey
ALTER TABLE "Carrinho" DROP CONSTRAINT "Carrinho_usuarioId_fkey";

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "cep",
DROP COLUMN "numero",
DROP COLUMN "rua",
DROP COLUMN "tipo";

-- DropTable
DROP TABLE "Carrinho";

-- CreateTable
CREATE TABLE "ItemCarrinho" (
    "id" SERIAL NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "ItemCarrinho_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ItemCarrinho" ADD CONSTRAINT "ItemCarrinho_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemCarrinho" ADD CONSTRAINT "ItemCarrinho_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
