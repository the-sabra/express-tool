import path from "path";
import { fileURLToPath } from "url";
import { describe, expect, it } from "vitest";
import rootDir from "../utils/rootDir";

describe("test utility functions", () => {
  it.concurrent("should return root dirt", async () => {
    const __filename = fileURLToPath(import.meta.url);
    expect(rootDir).toBe(path.resolve(path.dirname(__filename), ".."));
  });
});
