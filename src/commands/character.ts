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
  .argument("[mode]", "profile | gear (default: profile)")
  .action(async (name: string, realm: string, region: string, mode?: string) => {
    const spinner = logger.spinner("Fetching character profile...");

    try {
      const profile = await getCharacterProfile(region, realm, name);

      spinner.succeed("Character profile fetched successfully!");

      // =========================
      // MODE: GEAR
      // =========================
      if (mode === "gear") {
        const gear = profile.equipped_items || [];

        if (!gear.length) {
          logger.warn("No gear data found for this character.");
          return;
        }

        const tableData = gear.map((item: any) => ({
          Slot: item.slot?.name || "Unknown",
          Item: item.item?.name || item.name || "Unknown",
          ItemLevel: item.level?.value || "N/A",
        }));

        printTable(tableData);
        return;
      }

      // =========================
      // DEFAULT: PROFILE
      // =========================
      const tableData = [
        { Property: "Name", Value: profile.name },
        { Property: "Level", Value: profile.level },
        { Property: "Class", Value: profile.character_class?.name },
        { Property: "Race", Value: profile.race?.name },
        { Property: "Item Level", Value: profile.average_item_level },
      ];

      printTable(tableData);
    } catch (err: any) {
      spinner.fail("Failed to fetch character profile");
      logger.error(err.message || "Unknown error occurred");
    }
  });
