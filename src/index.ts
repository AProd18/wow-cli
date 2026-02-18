

import { Command } from "commander";
import { characterCommand } from "./commands/character.ts";
import { mplusCommand } from "./commands/mplus.ts";

const program = new Command();

program
  .name("wow")
  .description("World of Warcraft CLI tool")
  .version("1.0.0");

program.addCommand(characterCommand);
program.addCommand(mplusCommand);

program.parse();
