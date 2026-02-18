// src/commands/character.ts
import { Command } from "commander";
import { getCharacterProfile } from "wow-api-sdk";
import { logger } from "../utils/logger.js";
import { printTable } from "../utils/table.js";

export const characterCommand = new Command()
  .name("character")
  .description("Fetch character profile")
  .argument("<name>", "Character name")
  .argument("<realm>", "Realm")
  .argument("<region>", "Region (eu/us)")
  .action(async (name: string, realm: string, region: string) => {
    const spinner = logger.spinner("Fetching character profile...");

    try {
      const profile = await getCharacterProfile(region, realm, name);

      spinner.succeed("Character profile fetched successfully!");

      // Format data as a table
      const tableData = [
        { Property: "Name", Value: profile.name },
        { Property: "Level", Value: profile.level },
        { Property: "Class", Value: profile.character_class.name },
        { Property: "Race", Value: profile.race.name },
        { Property: "Item Level", Value: profile.average_item_level },
      ];

      printTable(tableData);
    } catch (err: any) {
      spinner.fail("Failed to fetch character profile");
      logger.error(err.message || "Unknown error occurred");
    }
  });
