#! /usr/bin/env node
import { newAction } from "../actions/newAction.js";
import { Command } from "commander";
const program = new Command();
program.name("ex").version("0.0.1");

program
  .command("new [project-name]")
  .description("to create new express project")
  .alias("n")
  .option("-js, --javascript", "to create project in JavaScript")
  .option("-ts, --typescript", "to create project in TypeScript")
  .option(
    "-mjs, --ECMAScript",
    "to create project in JavaScript with ECMAScript Modules"
  )
  .action(newAction);

program.parse(process.argv);
