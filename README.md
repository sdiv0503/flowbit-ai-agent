# AI Memory-Based Invoice Processor
**Author:** Divyansh Sharma  
**Assignment:** AI Agent Development Intern — Flowbit

---

## One-line summary
A memory-driven invoice decision engine (TypeScript + Node.js) that **learns from human corrections** (no ML). It persists memory, applies vendor-specific corrections, tracks confidence, and auto-approves once confidence reaches a threshold.

---

## Why this approach?   
Flowbit's assignment asks for an explainable, auditable system that **remembers** repeated human corrections and vendor patterns so future invoices require fewer manual fixes. This project implements that using a small rule + memory system with confidence reinforcement and decay hooks (no ML training required).

---

## Key features
- Persistent memory (JSON) for vendor, correction, and resolution entries  
- Decision engine: recall → apply → decide → learn  
- Confidence-based auto-approve (threshold configurable)  
- Explainable `reasoning` and `auditTrail` per invoice  
- Duplicate detection logic to avoid contradictory learning  
- Demo runner that shows learning over time (Invoice #1 → human correction → Invoice #2 smarter)

---

## Output contract (per invoice)
Every invoice processed returns JSON with this structure:

```json
{
  "normalizedInvoice": { "...": "..." },
  "proposedCorrections": [ { "field": "...", "value": "...", "reason": "..." } ],
  "requiresHumanReview": true,
  "reasoning": "Explain why memory was applied and why actions were taken",
  "confidenceScore": 0.0,
  "memoryUpdates": [ "..." ],
  "auditTrail": [
    { "step": "recall|apply|decide|learn", "timestamp": "...", "details": "..." }
  ]
}

Repository structure (what to expect)
flowbit-ai-agent/
├── src/
│   ├── data/
│   │   └── invoices.ts            # sample invoices used in demo
│   ├── engine/
│   │   ├── applyEngine.ts
│   │   ├── recallEngine.ts
│   │   ├── decisionEngine.ts
│   │   ├── learningEngine.ts
│   │   └── duplicateEngine.ts
│   ├── memory/
│   │   ├── memoryStore.ts
│   │   ├── vendorMemory.ts
│   │   ├── correctionMemory.ts
│   │   └── resolutionMemory.ts
│   ├── models/
│   │   └── types.ts
│   └── index.ts                   # demo runner (first-run -> approve -> second-run)
├── data/
│   └── memory.json                 # runtime memory (ignored by git)
├── package.json
├── tsconfig.json
└── README.md                       # this file

Architecture (ASCII diagram)
[Invoice Input] --> [Decision Engine]
                     /     |      \
            [Recall]   [Apply]   [Duplicate Check]
               |         |              |
           memory.json  rules         memory.json
               |         |              |
             [Learning Engine] <--- Human Approval
                    |
                memory.json (persisted)


Flow:

Recall loads past memories (vendor/correction/resolution).

Apply executes heuristics and learned rules to produce proposedCorrections and a confidence score.

Decide uses threshold (default 0.8) to auto-approve or require human review.

Learn runs when human approves and updates memory with reinforcement and persistence.

Audit trail logs each step (recall, apply, decide, learn) for explainability.

Configurable parameters

AUTO_APPROVE_THRESHOLD = 0.8 — invoices with confidence >= threshold auto-approved.

INITIAL_LEARNED_CONFIDENCE = 0.8 — initial confidence for a new human-approved memory.

REINFORCE_STEP = 0.1 — confidence increment on repeat approved usage.
These are set in the learningEngine / decisionEngine and are easy to change.

Installation (exact steps)

1. Clone repo (or put files into a folder):
git clone https://github.com/sdiv0503/flowbit-ai-agent.git
cd flowbit-ai-agent
2. Install dependencies:
npm install
(The project uses ts-node for quick running; TypeScript is in dev deps.)

Important: reset runtime memory (recommended before demo)

The engine persists runtime memory to data/memory.json. For a clean demo, reset it:

macOS / Linux:
rm -f data/memory.json
echo '{"vendors":[],"corrections":[],"resolutions":[]}' > data/memory.json

Windows PowerShell:
Remove-Item data\memory.json -ErrorAction SilentlyContinue
Set-Content -Path data\memory.json -Value '{"vendors":[],"corrections":[],"resolutions":[]}'

Note: data/memory.json is in .gitignore — you will not commit runtime memory by default.

Demo (exact commands and expected flow)

Reset the memory (see previous section).

Run the demo runner:

npx ts-node src/index.ts


The demo script runs three main steps:

First run: processes INV-A-001, proposes correction for serviceDate, returns confidenceScore: 0.7 and requiresHumanReview: true.

Simulated human approval: the demo calls the learning routine and writes the learned correction to data/memory.json with confidence: 0.8.

Second run: processes the same vendor invoice again and now confidenceScore: 0.8 (>= threshold) so requiresHumanReview: false and the correction is auto-applied.

Example expected outputs (snippets)

First run (before learning):

{
  "proposedCorrections": [
    {
      "field": "serviceDate",
      "value": "2024-01-01",
      "reason": "Detected Leistungsdatum in raw text"
    }
  ],
  "requiresHumanReview": true,
  "confidenceScore": 0.7
}


After human approval & second run:

{
  "proposedCorrections": [
    {
      "field": "serviceDate",
      "value": "2024-01-01",
      "reason": "Detected Leistungsdatum in raw text"
    }
  ],
  "requiresHumanReview": false,
  "confidenceScore": 0.8
}