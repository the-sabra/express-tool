import { projectFiles } from "../utils/createProjectFiles.js";
import { existsSync } from "fs";
import {
  getProjectName,
  selectLanguage,
  selectPackage,
} from "../utils/questions.js";
import {
  packageCjs,
  packageTs,
  packageEjs,
} from "../Templates/packagesTemp.js";
let projectName;
let language;
// to get module type if CommonJs or ECMA in options
let moduleType;

//This variable stores the object to use in creating the file function
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
    //check options get or not
    if (Object.keys(options).length === 0) {
      language = await selectLanguage();
    }
    if (options.javascript && options.ECMAScript) {
      language = "js"; //set language to js
      packageEjs.name = projectName;
      packageUse = packageEjs;
      moduleType = "mjs";
    } else if (options.javascript && options.ECMAScript == undefined) {
      language = "js";
      packageCjs.name = projectName; // set package.json name project as same as project name
      packageUse = packageCjs;
      moduleType = "cjs";
    } else if (options.typescript && options.ECMAScript == undefined) {
      language = "ts"; //set language to ts
      packageTs.name = projectName;
      packageUse = packageTs;
    } else if (options.typescript && options.ECMAScript) {
      throw new Error("this option only for js lang");
    }

    // TODO make Package options
    const packageManger = await selectPackage();

    projectFiles(projectName, packageManger, language, packageUse, moduleType);
  } catch (error) {
    throw error;
  }
};
