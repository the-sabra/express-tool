import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globalSetup: ["./tests/globalSetupFiles.ts"],
    globals: true,
  },
});
