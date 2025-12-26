export type Confidence = number; // 0.0 - 1.0

export interface AuditLog {
  step: "recall" | "apply" | "decide" | "learn";
  timestamp: string;
  details: string;
}

export interface VendorMemory {
  vendor: string;
  learnedFields: {
    field: string;
    pattern: string;
    confidence: Confidence;
    usageCount: number;
    lastUsed?: string;
  }[];
}

export interface CorrectionMemory {
  vendor: string;
  field: string;
  from: any;
  to: any;
  reason: string;
  confidence: Confidence;
  usageCount: number;
  lastUsed?: string;
}

export interface ResolutionMemory {
  invoiceId: string;
  decision: "approved" | "rejected";
  notes?: string;
  timestamp?: string;
}

export interface MemoryStoreSchema {
  vendors: VendorMemory[];
  corrections: CorrectionMemory[];
  resolutions: ResolutionMemory[];
}
