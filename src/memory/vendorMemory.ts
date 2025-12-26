import { MemoryStore } from "./memoryStore";
import { VendorMemory } from "../models/types";

export class VendorMemoryManager {
  static getVendor(vendor: string): VendorMemory | null {
    const store = MemoryStore.load();
    return store.vendors.find(v => v.vendor === vendor) || null;
  }

  static addOrUpdateField(
    vendor: string,
    field: string,
    pattern: string
  ) {
    const store = MemoryStore.load();

    let vendorMemory = store.vendors.find(v => v.vendor === vendor);

    if (!vendorMemory) {
      vendorMemory = { vendor, learnedFields: [] };
      store.vendors.push(vendorMemory);
    }

    const existing = vendorMemory.learnedFields.find(f => f.field === field);

    if (existing) {
      existing.confidence += 0.1;
      existing.usageCount += 1;
    } else {
      vendorMemory.learnedFields.push({
        field,
        pattern,
        confidence: 0.6,
        usageCount: 1
      });
    }

    MemoryStore.save(store);
  }
}
