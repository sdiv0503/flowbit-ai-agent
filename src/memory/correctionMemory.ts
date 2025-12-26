import { MemoryStore } from "./memoryStore";

export class CorrectionMemoryManager {
  static saveCorrection(
    vendor: string,
    field: string,
    from: any,
    to: any,
    reason: string
  ) {
    const store = MemoryStore.load();

    store.corrections.push({
      vendor,
      field,
      from,
      to,
      reason,
      confidence: 0.7,
      usageCount: 1
    });

    MemoryStore.save(store);
  }
}
