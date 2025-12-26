import fs from "fs";
import path from "path";
import { MemoryStoreSchema } from "../models/types";

const MEMORY_PATH = path.join(__dirname, "../../data/memory.json");

const DEFAULT_MEMORY: MemoryStoreSchema = {
  vendors: [],
  corrections: [],
  resolutions: [],
};

export class MemoryStore {
  static load(): MemoryStoreSchema {
    try {
      // If file doesn't exist → create it
      if (!fs.existsSync(MEMORY_PATH)) {
        fs.writeFileSync(MEMORY_PATH, JSON.stringify(DEFAULT_MEMORY, null, 2));
        return DEFAULT_MEMORY;
      }

      const raw = fs.readFileSync(MEMORY_PATH, "utf-8").trim();

      // If file is empty → reset it
      if (!raw) {
        fs.writeFileSync(MEMORY_PATH, JSON.stringify(DEFAULT_MEMORY, null, 2));
        return DEFAULT_MEMORY;
      }

      return JSON.parse(raw);
    } catch (err) {
      console.error("⚠️ Memory corrupted. Resetting memory...");
      fs.writeFileSync(MEMORY_PATH, JSON.stringify(DEFAULT_MEMORY, null, 2));
      return DEFAULT_MEMORY;
    }
  }

  static save(data: MemoryStoreSchema) {
    fs.writeFileSync(MEMORY_PATH, JSON.stringify(data, null, 2));
    console.log(
      `📝 Memory saved to ${MEMORY_PATH}. corrections count=${data.corrections.length}, resolutions=${data.resolutions.length}`
    );
  }
}
