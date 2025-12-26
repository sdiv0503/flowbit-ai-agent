import { MemoryStore } from "../memory/memoryStore";

export class RecallEngine {
  static recall(vendor: string) {
    const store = MemoryStore.load();
    const vendorMemory = store.vendors.find(v => v.vendor === vendor) || null;
    const corrections = store.corrections.filter(c => c.vendor === vendor);
    return { vendorMemory, corrections, rawStore: store };
  }
}
