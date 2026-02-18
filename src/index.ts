import { Command } from "commander";
import { characterCommand } from "./commands/character.js";
import { mplusCommand } from "./commands/mplus.js";

const program = new Command();

program.name("wow").description("World of Warcraft CLI tool").version("1.0.0");

program.addCommand(characterCommand);
program.addCommand(mplusCommand);

program.parse();
