import * as fs from "fs";
import { testDir } from "./constants";

export async function setup() {
  fs.mkdirSync(testDir);
}

export async function teardown() {
  fs.rmSync(testDir, { recursive: true, force: true });
}
