#! /usr/bin/env node
import { newAction } from "../actions/newAction.js";
import { Command } from "commander";
const program = new Command();
program.name("et").version("1.0.3");

program
  .command("new [project-name]")
  .description("to create new express project")
  .alias("n")
  .option("-js, --javascript", "to create a project using JavaScript")
  .option("-ts, --typescript", "to create a project using TypeScript")
  .option(
    "-mjs, --ECMAScript",
    "to create project in JavaScript with ECMAScript Modules"
  )
  .option("-p, --package <type>", "to choose package manger you use")
  .action(newAction);

//If users make mistakes, he suggests them.
program.showSuggestionAfterError(true);

//Add the option for a 'new' command to the 'help' command.
program.addHelpText(
  "afterAll",
  `
  new|n [options]

     -p <type>  --package <type> to choose package manager you use
     -js        --javascript  to create a project using JavaScript (CommonJs Module)
     -ts        --typescript  to create a project using TypeScript

  NOTE: The -js -mjs [project-name] options make js with ECMAScript Module.
  `
);
program.parse(process.argv);
