# AI Memory-Based Invoice Processor

## What it is
A memory-driven invoice decision engine that learns from human corrections without ML. It stores vendor/correction/resolution memory with confidence scores and uses them to auto-correct and auto-approve invoices over time.

## How to run
1. Install deps: `npm install`
2. (Optional) Reset memory: delete `data/memory.json` or set to `{"vendors":[],"corrections":[],"resolutions":[]}`
3. Run demo: `npx ts-node src/index.ts`

## Demo flow
1. First run: system suggests a correction and requests human review.
2. Simulated human approval: the system stores memory with confidence >= 0.8.
3. Second run: system auto-applies the correction and auto-approves.

## Files of interest
- `src/engine/*` - decision, apply, recall, learning, duplicate logic
- `src/memory/memoryStore.ts` - persistence
- `src/index.ts` - demo runner

## Design notes
- Confidence threshold for auto-approve: 0.8
- New learned memory initial confidence: 0.8
- Confidence reinforcement: +0.1 on approved repeats
- Memory persists in `data/memory.json` for reproducible runs
