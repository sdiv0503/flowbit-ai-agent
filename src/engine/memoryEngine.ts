import { VendorMemoryManager } from "../memory/vendorMemory";
import { CorrectionMemoryManager } from "../memory/correctionMemory";
import { ResolutionMemoryManager } from "../memory/resolutionMemory";

export class MemoryEngine {
  static learnFromHumanCorrection(
    invoiceId: string,
    vendor: string,
    field: string,
    from: any,
    to: any,
    reason: string
  ) {
    VendorMemoryManager.addOrUpdateField(
      vendor,
      field,
      reason
    );

    CorrectionMemoryManager.saveCorrection(
      vendor,
      field,
      from,
      to,
      reason
    );

    ResolutionMemoryManager.saveResolution(
      invoiceId,
      "approved",
      reason
    );
  }
}
