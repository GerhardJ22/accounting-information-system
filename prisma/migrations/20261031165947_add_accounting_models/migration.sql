/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "USERS" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "password_Hash" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "USERS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "USER_PROFILES" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "company_name" VARCHAR(150) NOT NULL,
    "tax_id" VARCHAR(100),
    "currency" VARCHAR(10) NOT NULL,

    CONSTRAINT "USER_PROFILES_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CUSTOMERS" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "email" VARCHAR(255),
    "contact_number" VARCHAR(30),
    "address" TEXT,

    CONSTRAINT "CUSTOMERS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SUPPLIERS" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "company_name" VARCHAR(150) NOT NULL,
    "email" VARCHAR(255),
    "contact_number" VARCHAR(30),
    "address" TEXT,

    CONSTRAINT "SUPPLIERS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ACCOUNTS" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "account_name" VARCHAR(100) NOT NULL,
    "account_type" VARCHAR(50) NOT NULL,

    CONSTRAINT "ACCOUNTS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TRANSACTIONS" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "account_id" INTEGER NOT NULL,
    "customer_id" INTEGER,
    "supplier_id" INTEGER,
    "invoice_id" INTEGER,
    "type" VARCHAR(20) NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "payment_method" VARCHAR(30),
    "transaction_date" DATE NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "description" TEXT,

    CONSTRAINT "TRANSACTIONS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "INVOICES" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "invoice_number" VARCHAR(50) NOT NULL,
    "total_amount" DECIMAL(12,2) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "issue_date" DATE NOT NULL,
    "due_date" DATE NOT NULL,

    CONSTRAINT "INVOICES_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "INVOICE_ITEMS" (
    "id" SERIAL NOT NULL,
    "invoice_id" INTEGER NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" DECIMAL(12,2) NOT NULL,
    "subtotal" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "INVOICE_ITEMS_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "USERS_username_key" ON "USERS"("username");

-- CreateIndex
CREATE UNIQUE INDEX "USERS_email_key" ON "USERS"("email");

-- CreateIndex
CREATE UNIQUE INDEX "USER_PROFILES_user_id_key" ON "USER_PROFILES"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "TRANSACTIONS_invoice_id_key" ON "TRANSACTIONS"("invoice_id");

-- CreateIndex
CREATE UNIQUE INDEX "INVOICES_user_id_invoice_number_key" ON "INVOICES"("user_id", "invoice_number");

-- AddForeignKey
ALTER TABLE "USER_PROFILES" ADD CONSTRAINT "USER_PROFILES_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "USERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CUSTOMERS" ADD CONSTRAINT "CUSTOMERS_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "USERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SUPPLIERS" ADD CONSTRAINT "SUPPLIERS_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "USERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ACCOUNTS" ADD CONSTRAINT "ACCOUNTS_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "USERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TRANSACTIONS" ADD CONSTRAINT "TRANSACTIONS_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "USERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TRANSACTIONS" ADD CONSTRAINT "TRANSACTIONS_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "ACCOUNTS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TRANSACTIONS" ADD CONSTRAINT "TRANSACTIONS_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "CUSTOMERS"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TRANSACTIONS" ADD CONSTRAINT "TRANSACTIONS_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "SUPPLIERS"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TRANSACTIONS" ADD CONSTRAINT "TRANSACTIONS_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "INVOICES"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "INVOICES" ADD CONSTRAINT "INVOICES_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "USERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "INVOICES" ADD CONSTRAINT "INVOICES_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "CUSTOMERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "INVOICE_ITEMS" ADD CONSTRAINT "INVOICE_ITEMS_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "INVOICES"("id") ON DELETE CASCADE ON UPDATE CASCADE;
