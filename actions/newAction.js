import chalk from "chalk";
import { existsSync } from "fs";
import {
  packageCjs,
  packageEjs,
  packageTs,
} from "../Templates/packagesTemp.js";
import { createProjectFiles } from "../lib/createProjectFiles.js";
import {
  getProjectName,
  installDeps,
  selectLanguage,
  selectModuleType,
  selectPackage,
} from "../lib/questions.js";
let projectName;
let language;
// Get the module type, which is either CommonJS or ECMAScript, from the options.
let moduleType;
//This variable stores the package manager that the user uses
let packageManger;
//This variable stores the object create file function.
let packageUse;
// whether the user wishes to install the dependencies
let installDepsBool;
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

    installDepsBool = await installDeps();

    await createProjectFiles(
      projectName,
      packageManger,
      language,
      packageUse,
      moduleType,
      installDepsBool
    );

    console.log(
      ` run this command ${chalk.yellow(
        `cd ${projectName}`
      )}\n you can run project in dev mode by ${chalk.yellow(
        `${packageManger} run dev`
      )}`
    );
  } catch (error) {
    console.error(`some thing wrong 🤕 ${error}`);
    process.exit(1);
  }
};
