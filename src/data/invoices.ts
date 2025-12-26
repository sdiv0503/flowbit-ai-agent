export const invoices = [
  {
    invoiceId: "INV-A-001",
    vendor: "Supplier GmbH",
    fields: {
      invoiceNumber: "INV-2024-001",
      serviceDate: null,
      currency: "EUR",
      netTotal: 2500,
      taxRate: 0.19,
      taxTotal: 475,
      grossTotal: 2975
    },
    rawText: "Rechnungsnr: INV-2024-001\nLeistungsdatum: 01.01.2024\nBestellnr: PO-A-050\n..."
  },
  {
    invoiceId: "INV-B-001",
    vendor: "Parts AG",
    fields: {
      invoiceNumber: "PA-7781",
      currency: "EUR",
      netTotal: 2000,
      taxRate: 0.19,
      taxTotal: 400,
      grossTotal: 2400
    },
    rawText: "Invoice No: PA-7781\nPrices incl. VAT\nTotal: 2400.00 EUR\n..."
  }
];
