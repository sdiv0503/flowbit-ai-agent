# 🧠 AI Memory-Based Invoice Processor

> A memory-driven invoice decision engine that learns from human corrections without machine learning

**Author:** Divyansh Sharma  
**Assignment:** AI Agent Development Intern — Flowbit

---

## 📋 Overview

A TypeScript-based invoice processing system that **remembers and learns** from human corrections. The engine persists memory, applies vendor-specific rules, tracks confidence scores, and auto-approves invoices once confidence reaches a threshold—all without requiring ML training.

### Why This Approach?

Flowbit's assignment calls for an explainable, auditable system that **remembers** repeated human corrections and vendor patterns, reducing manual intervention over time. This project implements that vision using a rule-based memory system with confidence reinforcement and decay mechanisms.

---

## ✨ Key Features

- 💾 **Persistent Memory** — JSON-based storage for vendor, correction, and resolution entries
- 🎯 **Decision Engine** — Recall → Apply → Decide → Learn pipeline
- 🔒 **Confidence-Based Auto-Approval** — Configurable threshold system
- 📊 **Explainable Decisions** — Full `reasoning` and `auditTrail` per invoice
- 🔍 **Duplicate Detection** — Prevents contradictory learning
- 🚀 **Live Demo Runner** — Shows learning progression across invoice batches

---

## 🏗️ Architecture

[Invoice Input] --> [Decision Engine]
                     /     |      \
            [Recall]   [Apply]   [Duplicate Check]
               |         |              |
           memory.json  rules         memory.json
               |         |              |
             [Learning Engine] <--- Human Approval
                    |
                memory.json (persisted)


### Processing Flow

1. **Recall** — Loads past memories (vendor/correction/resolution)
2. **Apply** — Executes heuristics and learned rules to generate corrections
3. **Decide** — Uses confidence threshold to determine if human review is needed
4. **Learn** — Updates memory when human approves corrections
5. **Audit** — Logs each step for full explainability

---

## 📁 Project Structure

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
---

## 📤 Output Contract

Every processed invoice returns a structured JSON response:
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


---
## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation
Clone the repository
git clone https://github.com/sdiv0503/flowbit-ai-agent.git
cd flowbit-ai-agent

Install dependencies
npm install

### Reset Memory (Recommended Before Demo)

**macOS / Linux:**
rm -f data/memory.json
echo '{"vendors":[],"corrections":[],"resolutions":[]}' > data/memory.json

**Windows PowerShell:**
Remove-Item data\memory.json -ErrorAction SilentlyContinue
Set-Content -Path data\memory.json -Value '{"vendors":[],"corrections":[],"resolutions":[]}'

> **Note:** `data/memory.json` is gitignored and won't be committed

---

## 🎬 Running the Demo

npx ts-node src/index.ts


### Demo Flow

The demo script demonstrates the learning process across three stages:

1. **First Run** — Processes `INV-A-001`, proposes correction, returns `confidenceScore: 0.7` and `requiresHumanReview: true`

2. **Human Approval** — Simulates approval, updates memory with `confidence: 0.8`

3. **Second Run** — Processes same vendor, achieves `confidenceScore: 0.8`, auto-approves with `requiresHumanReview: false`

### Expected Output Examples

**Before Learning:**
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

**After Learning:**
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

---

## 🔍 Key Design Decisions

- **No ML Required** — Pure rule-based system with memory reinforcement
- **Explainable AI** — Every decision includes reasoning and audit trail
- **Confidence Scoring** — Gradual trust building through repeated approvals
- **Duplicate Prevention** — Avoids learning conflicting patterns
- **JSON Persistence** — Simple, readable memory storage

---

## 👤 Contact

**Divyansh Sharma**  
GitHub: [@sdiv0503](https://github.com/sdiv0503)
E-Mail: [sdivyansh0503@gmail.com]

---

<p align="center">Built with ❤️ for Flowbit AI Agent Assignment</p>

