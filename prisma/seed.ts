
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const daysAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

const daysFromNow = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

async function main() {
  console.log("Starting database seed...");

  // 1. Create or find the dedicated demo user.
  const user = await prisma.user.upsert({
    where: { username: "demo-business" },
    update: {},
    create: {
      username: "demo-business",
      email: "demo@business.test",
      passwordHash: "DEMO_ONLY_NOT_A_REAL_PASSWORD_HASH",
    },
  });

  // 2. Reset only this demo user's existing sample records.
  await prisma.$transaction(async (tx) => {
    await tx.transaction.deleteMany({
      where: { userId: user.id },
    });

    await tx.invoice.deleteMany({
      where: { userId: user.id },
    });

    await tx.customer.deleteMany({
      where: { userId: user.id },
    });

    await tx.supplier.deleteMany({
      where: { userId: user.id },
    });

    await tx.account.deleteMany({
      where: { userId: user.id },
    });

    // 3. Create the business profile.
    await tx.userProfile.upsert({
      where: { userId: user.id },
      update: {
        companyName: "Gerhard's Creative Studio",
        currency: "USD",
      },
      create: {
        userId: user.id,
        companyName: "Gerhard's Creative Studio",
        currency: "USD",
      },
    });

    // 4. Create customers.
    const customerNames = [
      "Acme Solutions",
      "Bright Future Co.",
      "Creative Minds Ltd.",
      "Digital Works",
      "Green Leaf Studio",
    ];

    for (const name of customerNames) {
      await tx.customer.create({
        data: {
          userId: user.id,
          name,
          email: `${name.toLowerCase().replaceAll(" ", ".")}@example.com`,
        },
      });
    }

    const customers = await tx.customer.findMany({
      where: { userId: user.id },
      orderBy: { id: "asc" },
    });

    // 5. Create suppliers.
    for (const supplier of [
      "Office Supplies Co.",
      "Cloud Services Ltd.",
      "Internet Provider",
    ]) {
      await tx.supplier.create({
        data: {
          userId: user.id,
          companyName: supplier,
        },
      });
    }

    const suppliers = await tx.supplier.findMany({
      where: { userId: user.id },
      orderBy: { id: "asc" },
    });

    // 6. Create accounts.
    const bank = await tx.account.create({
      data: {
        userId: user.id,
        accountName: "Business Bank",
        accountType: "Bank",
      },
    });

    const cash = await tx.account.create({
      data: {
        userId: user.id,
        accountName: "Cash",
        accountType: "Cash",
      },
    });

    const creditCard = await tx.account.create({
      data: {
        userId: user.id,
        accountName: "Business Credit Card",
        accountType: "Credit Card",
      },
    });

    // 7. Create invoices.
    const invoiceData = [
      {
        number: "INV-001",
        customerId: customers[0].id,
        total: "1200.00",
        status: "Paid",
        issue: daysAgo(12),
        due: daysAgo(2),
        description: "Website Development",
      },
      {
        number: "INV-002",
        customerId: customers[1].id,
        total: "850.00",
        status: "Paid",
        issue: daysAgo(10),
        due: daysAgo(1),
        description: "Brand Design",
      },
      {
        number: "INV-003",
        customerId: customers[2].id,
        total: "2500.00",
        status: "Pending",
        issue: daysAgo(3),
        due: daysFromNow(10),
        description: "Software Consulting",
      },
      {
        number: "INV-004",
        customerId: customers[3].id,
        total: "1800.00",
        status: "Pending",
        issue: daysAgo(2),
        due: daysFromNow(14),
        description: "UI/UX Design",
      },
      {
        number: "INV-005",
        customerId: customers[4].id,
        total: "950.00",
        status: "Overdue",
        issue: daysAgo(20),
        due: daysAgo(5),
        description: "Maintenance Services",
      },
    ];

    for (const invoice of invoiceData) {
      const createdInvoice = await tx.invoice.create({
        data: {
          userId: user.id,
          customerId: invoice.customerId,
          invoiceNumber: invoice.number,
          totalAmount: invoice.total,
          status: invoice.status,
          issueDate: invoice.issue,
          dueDate: invoice.due,
          items: {
            create: [
              {
                description: invoice.description,
                quantity: 1,
                unitPrice: invoice.total,
                subtotal: invoice.total,
              },
            ],
          },
        },
      });

      // Paid invoices automatically have corresponding income transactions.
      if (invoice.status === "Paid") {
        await tx.transaction.create({
          data: {
            userId: user.id,
            accountId: bank.id,
            customerId: invoice.customerId,
            invoiceId: createdInvoice.id,
            type: "Income",
            amount: invoice.total,
            transactionDate: invoice.issue,
            category: "Sales",
            paymentMethod: "Bank Transfer",
            description: `Invoice #${invoice.number} Payment`,
          },
        });
      }
    }

    // 8. Create additional income and expense transactions.
    const additionalTransactions = [
      {
        accountId: bank.id,
        type: "Income",
        amount: "3500.00",
        days: 5,
        category: "Services",
        description: "Service Contract Payment",
      },
      {
        accountId: creditCard.id,
        type: "Expense",
        amount: "240.50",
        days: 4,
        category: "Office Supplies",
        description: "Office Supplies Purchase",
        supplierId: suppliers[0].id,
      },
      {
        accountId: bank.id,
        type: "Expense",
        amount: "320.75",
        days: 3,
        category: "Utilities",
        description: "Monthly Utility Bill",
        supplierId: suppliers[2].id,
      },
      {
        accountId: bank.id,
        type: "Income",
        amount: "1500.00",
        days: 2,
        category: "Services",
        description: "Consulting Service Payment",
      },
      {
        accountId: cash.id,
        type: "Expense",
        amount: "85.00",
        days: 2,
        category: "Transportation",
        description: "Business Transportation",
      },
      {
        accountId: bank.id,
        type: "Expense",
        amount: "99.00",
        days: 1,
        category: "Software",
        description: "Monthly Software Subscription",
        supplierId: suppliers[1].id,
      },
      {
        accountId: cash.id,
        type: "Income",
        amount: "450.00",
        days: 1,
        category: "Sales",
        description: "Walk-in Customer Payment",
      },
      {
        accountId: bank.id,
        type: "Expense",
        amount: "175.00",
        days: 0,
        category: "Marketing",
        description: "Social Media Advertising",
      },
    ];

    for (const transaction of additionalTransactions) {
      await tx.transaction.create({
        data: {
          userId: user.id,
          accountId: transaction.accountId,
          supplierId: transaction.supplierId,
          type: transaction.type,
          amount: transaction.amount,
          transactionDate: daysAgo(transaction.days),
          category: transaction.category,
          description: transaction.description,
        },
      });
    }
  });

  console.log("Database seed completed successfully!");
  console.log("Demo user: demo-business");
  console.log("Customers: 5");
  console.log("Suppliers: 3");
  console.log("Accounts: 3");
  console.log("Invoices: 5");
  console.log("Transactions: 10");
}

main()
  .catch((error) => {
    console.error("Database seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
