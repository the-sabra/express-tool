import * as fs from "fs/promises";
import ora, { spinners } from "ora";
import path from "path";
import rootDir from "../rootDir.js";
import {
  npmInstaller,
  yarnInstaller,
  pnpmInstaller,
  pnpmUpdater,
  npmUpdater,
  yarnUpdater,
} from "./executeCommands.js";

const TEMPLATE_DEFAULT_PATH_JS = (moduleType) => {
  return path.join(rootDir, "Templates", "Js", moduleType);
};
const TEMPLATE_DEFAULT_PATH_TS = path.join(rootDir, "Templates", "Ts");


export let projectFiles = async (
  projectName,
  packageManger,
  language,
  packageObject,
  moduleType
) => {
  const CreatingSpinner = ora("creating project...");
  const installingSpinner = ora("installing dependencies...");
  const updatingSpinner = ora("updating dependencies...");
  try {
    //create project directories and files
    CreatingSpinner.start();
    if (language == "js") {
      await createTemplate(TEMPLATE_DEFAULT_PATH_JS(moduleType), projectName);
    } else if (language == "ts") {
      await createTemplate(TEMPLATE_DEFAULT_PATH_TS, projectName);
    }

    //to create a new package.json file
    await packageJsonGenerator(projectName, packageObject);
    CreatingSpinner.succeed("files created");

    //  install and updating dependencies
    installingSpinner.start();
    switch (packageManger) {
      case "npm":
        await npmInstaller(projectName);
        break;
      case "yarn":
        await yarnInstaller(projectName);
        break;
      case "pnpm":
        await pnpmInstaller(projectName);
        break;
      default:
        throw new Error("wrong package 🤕");
    }
    installingSpinner.succeed("dependencies installed 🔥");

    updatingSpinner.start();
    switch (packageManger) {
      case "npm":
        await npmUpdater(projectName);
        break;
      case "yarn":
        await yarnUpdater(projectName);
        break;
      case "pnpm":
        await pnpmUpdater(projectName);
        break;
      default:
        throw new Error("wrong package 🤕");
    }
    updatingSpinner.succeed("dependencies updated 😎");
  } catch (error) {
    CreatingSpinner.stop();
    installingSpinner.stop();
    updatingSpinner.stop();
    throw error;
  }
};

async function packageJsonGenerator(dir, packageObject) {
  try {
    await fs.writeFile(
      dir + "/package.json",
      JSON.stringify(packageObject, null, 2)
    );
  } catch (error) {
    throw new Error(error);
  }
}

// ** [TODO] ** make this function to read dir and  write data from template to project file
async function createTemplate(templatePath, projectPath) {
  try {
    const files = await fs.readdir(templatePath);
    await fs.mkdir(projectPath);
    for (const file of files) {
      const filePath = path.join(templatePath, file);
      const stats = await fs.stat(filePath);

      if (stats.isDirectory()) {
        await createTemplate(filePath, path.join(projectPath, file));
      } else {
        const data = await fs.readFile(filePath);
        await fs.writeFile(path.join(projectPath, file), data);
      }
    }
  } catch (error) {
    throw new Error(error);
  }
}
