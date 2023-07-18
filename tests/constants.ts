import path from "path";
import { fileURLToPath } from "url";

export const testDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "/temp"
);
