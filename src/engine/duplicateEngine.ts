import { MemoryStore } from "../memory/memoryStore";

export class DuplicateEngine {
  static isDuplicate(invoice: any) {
    const store = MemoryStore.load();
    // Conservative duplicate logic: same vendor & invoiceNumber exists in resolutions
    return store.resolutions.some(r => r.invoiceId === invoice.invoiceId);
  }
}
