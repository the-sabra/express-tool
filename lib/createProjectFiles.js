import * as fs from "fs/promises";
import ora from "ora";
import path from "path";
import rootDir from "../utils/rootDir.js";
import { shellCommandExecuter } from "./commandsExecuter.js";

const TEMPLATE_DEFAULT_PATH_JS = (moduleType) => {
  return path.join(rootDir, "Templates", "Js", moduleType);
};
const TEMPLATE_DEFAULT_PATH_TS = path.join(rootDir, "Templates", "Ts");

export const createProjectFiles = async (
  projectName,
  packageManger,
  language,
  packageObject,
  moduleType,
  installDeps
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

    //create package.json file
    await packageJsonGenerator(projectName, packageObject);
    CreatingSpinner.succeed("files created");

    //  install dependencies
    if (installDeps) {
      installingSpinner.start();
      switch (packageManger) {
        case "npm":
          await shellCommandExecuter(
            "npm install",
            30000,
            "npm install timed out",
            projectName
          );
          break;
        case "yarn":
          await shellCommandExecuter(
            "yarn",
            30000,
            "yarn install timed out",
            projectName
          );
          break;
        case "pnpm":
          await shellCommandExecuter(
            "pnpm install",
            30000,
            "pnpm install timed out",
            projectName
          );
          break;
        default:
          throw new Error("wrong package 🤕");
      }
      installingSpinner.succeed("dependencies installed 🔥");
    }

    //  update dependencies
    if (installDeps) {
      updatingSpinner.start();
      switch (packageManger) {
        case "npm":
          await shellCommandExecuter(
            "npm update",
            30000,
            "npm update timed out",
            projectName
          );
          break;
        case "yarn":
          await shellCommandExecuter(
            "yarn up",
            30000,
            "yarn update timed out",
            projectName
          );
          break;
        case "pnpm":
          await shellCommandExecuter(
            "pnpm update",
            30000,
            "pnpm update timed out",
            projectName
          );
          break;
        default:
          throw new Error("wrong package 🤕");
      }
      updatingSpinner.succeed("dependencies updated 😎");
    }
  } catch (error) {
    CreatingSpinner.stop();
    installingSpinner.stop();
    updatingSpinner.stop();
    throw new Error(error);
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
