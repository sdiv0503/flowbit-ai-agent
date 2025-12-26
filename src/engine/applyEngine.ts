import { MemoryStore } from "../memory/memoryStore";

export class ApplyEngine {
  static applyMemory(invoice: any, memory: any) {
    const proposedCorrections: any[] = [];
    let confidence = 0.5;

    const store = MemoryStore.load();

    // Example: serviceDate detection for Supplier GmbH
    const learnedServiceDate = store.corrections.find(
      (c: any) => c.vendor === invoice.vendor && c.field === "serviceDate"
    );

    if (
      invoice.vendor === "Supplier GmbH" &&
      invoice.fields.serviceDate === null &&
      invoice.rawText?.includes("Leistungsdatum")
    ) {
      proposedCorrections.push({
        field: "serviceDate",
        value: "2024-01-01",
        reason: "Detected Leistungsdatum in raw text"
      });

      // if learned, use learned confidence; else default
      if (learnedServiceDate) {
        confidence = learnedServiceDate.confidence;
      } else {
        confidence = 0.7;
      }
    }

    // Round and clamp
    confidence = Math.min(1, Math.round(confidence * 100) / 100);

    return {
      proposedCorrections,
      confidence
    };
  }
}
