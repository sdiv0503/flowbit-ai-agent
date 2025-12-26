import { invoices } from "./data/invoices";
import { DecisionEngine } from "./engine/decisionEngine";
import fs from "fs";
import path from "path";

const MEMORY_PATH = path.join(__dirname, "../data/memory.json");

function printMemory() {
  try {
    const raw = fs.readFileSync(MEMORY_PATH, "utf-8");
    console.log("\n📚 Current memory.json:\n", raw);
  } catch (e) {
    console.log("\n📚 memory.json not found.");
  }
}

console.log("\n🚀 PHASE 4 FINAL DEMO\n");

// Reset memory manually if you want a clean demo (do it externally)
// Show starting memory
printMemory();

console.log("\n--- FIRST RUN (Before Learning) ---\n");
const firstRun = DecisionEngine.processInvoice(invoices[0]);
console.log(JSON.stringify(firstRun, null, 2));

console.log("\n--- HUMAN APPROVES CORRECTION ---\n");
// Human approves correction (simulate)
DecisionEngine.processInvoice(invoices[0], true);

console.log("\n--- Memory after human approval ---\n");
printMemory();

console.log("\n--- SECOND RUN (After Learning) ---\n");
const secondRun = DecisionEngine.processInvoice(invoices[0]);
console.log(JSON.stringify(secondRun, null, 2));
