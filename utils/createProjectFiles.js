import * as fs from "fs/promises";
import { existsSync } from "fs";
import ora, { spinners } from "ora";
import {
  npmInstaller,
  yarnInstaller,
  pnpmInstaller,
} from "./executeCommands.js";

const data = "console.log('hello world')";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

export let projectFiles = async (
  projectName,
  packageManger,
  language,
  packageObject
) => {
  const CreatingSpinner = ora("creating project...");
  const installingSpinner = ora("installing dependencies...");
  try {
    CreatingSpinner.start();
    const path = `${projectName}/app.${language}`;

    await fs.mkdir(projectName);

    await fs.writeFile(path, data);

    //to create a new package.json file
    await packageJsonFile(projectName, packageObject);
    CreatingSpinner.succeed("files created");

    installingSpinner.start();
    if (packageManger === "npm") {
      await npmInstaller(projectName);
    } else if (packageManger === "yarn") {
      await yarnInstaller(projectName);
    } else if (packageManger === "pnpm") {
      await pnpmInstaller(projectName);
    }
    installingSpinner.succeed("dependencies installed 🔥");
  } catch (error) {
    CreatingSpinner.stop();
    installingSpinner.stop();
    throw error;
  }
};

const packageJsonFile = async (dir, packageObject) => {
  try {
    await fs.writeFile(
      dir + "/package.json",
      JSON.stringify(packageObject, null, 2)
    );
  } catch (e) {
    new Error(e);
  }
};
