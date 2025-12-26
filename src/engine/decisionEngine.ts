import { RecallEngine } from "./recallEngine";
import { ApplyEngine } from "./applyEngine";
import { LearningEngine } from "./learningEngine";
import { DuplicateEngine } from "./duplicateEngine";

export class DecisionEngine {
  static processInvoice(invoice: any, humanFeedback?: boolean) {
    const auditTrail: any[] = [];

    if (DuplicateEngine.isDuplicate(invoice)) {
      return {
        normalizedInvoice: invoice.fields,
        proposedCorrections: [],
        requiresHumanReview: true,
        reasoning: "Possible duplicate invoice detected",
        confidenceScore: 0.0,
        memoryUpdates: [],
        auditTrail: [
          { step: "decide", timestamp: new Date().toISOString(), details: "Duplicate invoice detected" }
        ]
      };
    }

    const memory = RecallEngine.recall(invoice.vendor);
    auditTrail.push({ step: "recall", timestamp: new Date().toISOString(), details: "Fetched memory" });

    const result = ApplyEngine.applyMemory(invoice, memory);
    auditTrail.push({ step: "apply", timestamp: new Date().toISOString(), details: `Applied ${result.proposedCorrections.length} rules` });

    const requiresHumanReview = result.confidence < 0.8;
    auditTrail.push({ step: "decide", timestamp: new Date().toISOString(), details: requiresHumanReview ? "Needs human review" : "Auto-approved" });

    // Call learning only if explicitly approved by human
    let memoryUpdates: any[] = [];
    if (humanFeedback === true) {
      console.log("🧠 DecisionEngine: humanFeedback=true => calling LearningEngine with corrections:", result.proposedCorrections);
      if (result.proposedCorrections && result.proposedCorrections.length > 0) {
        LearningEngine.learnFromHuman(invoice.invoiceId, invoice.vendor, result.proposedCorrections, true);
        memoryUpdates = result.proposedCorrections.map((p: any) => ({ vendor: invoice.vendor, field: p.field }));
        auditTrail.push({ step: "learn", timestamp: new Date().toISOString(), details: "Learning updated from human feedback" });
      } else {
        console.log("ℹ️ DecisionEngine: No proposed corrections to learn from.");
      }
    }

    return {
      normalizedInvoice: invoice.fields,
      proposedCorrections: result.proposedCorrections,
      requiresHumanReview,
      reasoning: result.proposedCorrections.map((p: any) => p.reason).join("; "),
      confidenceScore: result.confidence,
      memoryUpdates,
      auditTrail
    };
  }
}
