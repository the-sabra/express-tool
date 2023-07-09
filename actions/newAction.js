import { projectFiles } from "../utils/createProjectFiles.js";
import { existsSync } from "fs";
import {
  getProjectName,
  selectLanguage,
  selectPackage,
} from "../utils/questions.js";
import { program } from "commander";
let projectName;
let language;

let packageJs = {
  name: "",
  version: "0.0.1",
  private: true,
  scripts: {
    start: "node ./bin/www",
  },
  dependencies: {
    debug: "~2.6.9",
    express: "~4.17.1",
  },
  devDependencies: {
    nodemon: "^3.0.1",
  },
};
let packageTs = {
  name: "",
  version: "0.0.1",
  private: true,
  scripts: {
    start: "node ./bin/www",
  },
  dependencies: {
    debug: "~2.6.9",
    express: "~4.17.1",
  },
  devDependencies: {
    nodemon: "^3.0.1",
    typescript: "^4.7.4",
    "ts-node": "^10.0.0",
    "@types/node": "18.15.11",
  },
};
let packageUses;
export let newAction = async (name, options) => {
  if (!name) {
    projectName = await getProjectName();
  } else projectName = name;

  //adding name in packages
  packageJs.name = projectName;
  packageTs.name = projectName;
  //checking for name Directory
  if (existsSync(projectName)) {
    console.error(
      "sorry, you have a Directory with the same name as the project"
    );
    process.exit(1);
  }

  if (options.javascript) {
    language = "js";
    packageUses = packageJs;
  } else if (options.typescript) {
    language = "ts";
    packageUses = packageTs;
  } else {
    language = await selectLanguage();
  }

  const packageManger = await selectPackage();
  
  projectFiles(projectName, packageManger, language, packageUses);
};
