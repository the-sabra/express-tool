#! /usr/bin/env node
import { newAction } from "../actions/newAction.js";
import { Command } from "commander";
const program = new Command();
program.name("et").version("1.0.1");

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

program.parse(process.argv);
