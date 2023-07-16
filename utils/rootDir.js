import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

export default path.resolve(path.dirname(__filename), "..");
