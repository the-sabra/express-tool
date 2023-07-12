import chalk from "chalk";
import inquirer from "inquirer";

export let getProjectName = async () => {
  const answer = await inquirer.prompt({
    name: "projectName",
    type: "input",
    message: "What name would you like to use for the new project?",
  });

  return answer.projectName;
};

export let selectLanguage = async () => {
  const answer = await inquirer.prompt({
    name: "language",
    type: "list",
    message: `what is the language you need to use 🤔`,
    choices: [chalk.yellow("JavaScript"), chalk.blueBright("TypeScript")],
  });

  if (answer.language === chalk.yellow("JavaScript")) {
    return "js";
  }
  return "ts";
};

export let selectPackage = async () => {
  const answer = await inquirer.prompt({
    name: "package",
    type: "list",
    message: "Which package manager would you love" + "❤️ " + " to use?",
    choices: ["npm", "yarn", "pnpm"],
  });
  return answer.package;
};

export let selectModuleType = async () => {
  const answer = await inquirer.prompt({
    name: "module",
    type: "list",
    message: "which Module type you love" + "❤️ " + " to use?",
    choices: ["ECMAScript", "CommonJS"],
  });
  if (answer.module === "ECMAScript") {
    return "mjs";
  }
  return "cjs";
};
