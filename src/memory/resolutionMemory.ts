import { MemoryStore } from "./memoryStore";

export class ResolutionMemoryManager {
  static saveResolution(
    invoiceId: string,
    decision: "approved" | "rejected",
    notes: string
  ) {
    const store = MemoryStore.load();

    store.resolutions.push({
      invoiceId,
      decision,
      notes
    });

    MemoryStore.save(store);
  }
}
