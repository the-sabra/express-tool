import * as fs from "fs";
import path from "path";
import { afterAll, describe, expect, it } from "vitest";
import { packageEjs } from "../Templates/packagesTemp";
import {
  createTemplate,
  packageJsonGenerator,
  templateDefaultPathJs,
  templateDefaultPathTs,
} from "../lib/createProjectFiles";
import { testDir } from "./constants";

const mjsProjectPath = path.join(testDir, "/test_mjs");
const cjsProjectPath = path.join(testDir, "/test_ejs");
const tsProjectPath = path.join(testDir, "/test_ts");

describe("test creating project files", () => {
  it.concurrent("should generate package json", async () => {
    await packageJsonGenerator(testDir, packageEjs);
    expect(fs.existsSync(path.join(testDir, "/package.json"))).toBeTruthy();
  });

  it.concurrent("should create mjs template", async () => {
    await createTemplate(templateDefaultPathJs("mjs"), mjsProjectPath);
    expect(fs.existsSync(mjsProjectPath)).toBeTruthy();
  });

  it.concurrent("should create cjs template", async () => {
    await createTemplate(templateDefaultPathJs("cjs"), cjsProjectPath);
    expect(fs.existsSync(cjsProjectPath)).toBeTruthy();
  });

  it.concurrent("should create ts template", async () => {
    await createTemplate(templateDefaultPathTs, tsProjectPath);
    expect(fs.existsSync(tsProjectPath)).toBeTruthy();
  });

  it.concurrent("should fail folder already exists", async () => {
    await expect(() =>
      createTemplate(templateDefaultPathTs, tsProjectPath)
    ).rejects.toThrowError();
  });
});

afterAll(() => {
  fs.unlinkSync(path.join(testDir, "/package.json"));
  fs.rmSync(mjsProjectPath, { recursive: true, force: true });
  fs.rmSync(cjsProjectPath, { recursive: true, force: true });
  fs.rmSync(tsProjectPath, { recursive: true, force: true });
});
