import { MemoryStore } from "../memory/memoryStore";

const INITIAL_LEARNED_CONFIDENCE = 0.8; // configurable demo value

export class LearningEngine {
  static learnFromHuman(
    invoiceId: string,
    vendor: string,
    corrections: any[],
    approved: boolean
  ) {
    console.log("🔔 LearningEngine.learnFromHuman called", { invoiceId, vendor, correctionsLength: corrections?.length, approved });

    if (!approved || !corrections || corrections.length === 0) {
      console.log("ℹ️ No learning: either not approved or no corrections.");
      return;
    }

    const store = MemoryStore.load();

    for (const correction of corrections) {
      console.log("🔁 Processing correction:", correction);

      const existing = store.corrections.find(
        (c: any) => c.vendor === vendor && c.field === correction.field
      );

      if (existing) {
        const before = existing.confidence;
        existing.confidence = Math.min(1, existing.confidence + 0.1);
        existing.usageCount = (existing.usageCount || 0) + 1;
        existing.lastUsed = new Date().toISOString();
        console.log(`🔼 Reinforced existing correction for ${vendor}.${correction.field}: ${before} -> ${existing.confidence}`);
      } else {
        const newEntry = {
          vendor,
          field: correction.field,
          from: correction.from ?? null,
          to: correction.value,
          reason: correction.reason,
          confidence: INITIAL_LEARNED_CONFIDENCE,
          usageCount: 1,
          lastUsed: new Date().toISOString()
        };
        store.corrections.push(newEntry);
        console.log("➕ Added new correction memory:", newEntry);
      }
    }

    store.resolutions.push({
      invoiceId,
      decision: "approved",
      notes: "Human approved correction",
      timestamp: new Date().toISOString()
    });

    MemoryStore.save(store);
    console.log("✅ LearningEngine: saved memory and resolution");
  }
}
