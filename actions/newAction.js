import { projectFiles } from "../utils/createProjectFiles.js";
import { existsSync } from "fs";
import chalk from "chalk";
import {
  getProjectName,
  selectLanguage,
  selectPackage,
  selectModuleType,
} from "../utils/questions.js";
import {
  packageCjs,
  packageTs,
  packageEjs,
} from "../Templates/packagesTemp.js";
let projectName;
let language;
// Get the module type, which is either CommonJS or ECMAScript, from the options.
let moduleType;
//This variable stores the package manager that the user uses
let packageManger;
//This variable stores the object create file function.
let packageUse;
export let newAction = async (name, options) => {
  try {
    if (!name) {
      projectName = await getProjectName();
    } else projectName = name;

    //checking for name Directory
    if (existsSync(projectName)) {
      console.error(
        "sorry, you have a Directory with the same name as the project"
      );
      process.exit(1);
    }
    //check options are uses or not
    if (Object.keys(options).length === 0) {
      language = await selectLanguage();
      if (language === "js") {
        moduleType = await selectModuleType();
        if (moduleType === "cjs") {
          language = "js";
          packageCjs.name = projectName; // set package.json name project as same as project name
          packageUse = packageCjs;
        } else {
          language = "js"; //set language to js
          packageEjs.name = projectName;
          packageUse = packageEjs;
        }
      } else if (language === "ts") {
        language = "ts"; //set language to ts
        packageTs.name = projectName;
        packageUse = packageTs;
      }
    }

    // Check which options the user uses.
    if (options.javascript && options.ECMAScript) {
      language = "js"; //set language to js
      packageEjs.name = projectName;
      packageUse = packageEjs;
      moduleType = "mjs";
    } else if (options.javascript && options.ECMAScript === undefined) {
      language = "js";
      packageCjs.name = projectName; // set package.json name project as same as project name
      packageUse = packageCjs;
      moduleType = "cjs";
    } else if (options.typescript && options.ECMAScript === undefined) {
      language = "ts"; //set language to ts
      packageTs.name = projectName;
      packageUse = packageTs;
    } else if (options.typescript && options.ECMAScript) {
      console.error("this option only for js lang");
      process.exit(1);
    }

    if (options.package === undefined) {
      packageManger = await selectPackage();
    } else {
      packageManger = options.package;
    }
    // check the user options
    if (
      packageManger !== "npm" &&
      packageManger !== "yarn" &&
      packageManger !== "pnpm"
    ) {
      console.error("package manger is incorrect 🤕");
      process.exit(1);
    }

    await projectFiles(
      projectName,
      packageManger,
      language,
      packageUse,
      moduleType
    );

    console.log(
      ` run this command ${chalk.yellow(
        `cd ${projectName}`
      )}\n you can run project in dev mode by ${chalk.yellow(
        `${packageManger} run dev`
      )}`
    );
  } catch (error) {
    // console.error(`some thing wrong 🤕 ${error}`);
    // process.exit(1);
    throw error
  }
};
