import * as fs from "fs/promises";
import { existsSync } from "fs";
import ora from "ora";
import { installPackagesWithNpm } from "./executeCommands.js";

const data = "console.log('hello world')";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

export let projectFiles = async (
  projectName,
  packageManger,
  language,
  packageObject
) => {
  try {
    
    const spinner = ora("creating project...").start();
    const path = `${projectName}/app.${language}`;
  
    await fs.mkdir(projectName);
  
    await fs.writeFile(path, data);
  
    await packageJsonFile(projectName, packageObject);
    spinner.succeed("files created");
    const spinner2 = ora("installing dependencies...").start();
    await installPackagesWithNpm(projectName);
    await sleep();
    spinner2.succeed("dependencies installed 🔥");
  } catch (error) {
    throw new Error(error);
  }
};

const packageJsonFile = async (dir, packageObject) => {
  try {
    await fs.writeFile(
      dir + "/package.json",
      JSON.stringify(packageObject, null, 2)
    );
  } catch (e) {
    console.log(e);
  }
};
