import { Command } from "commander";
import { getCharacterProfile } from "wow-api-sdk";
import ora from "ora";

export const characterCommand = new Command()
  .name("character")
  .description("Fetch character profile")
  .argument("<name>", "Character name")
  .argument("<realm>", "Realm")
  .argument("<region>", "Region (eu/us)")
  .action(async (name, realm, region) => {
    const spinner = ora("Fetching character...").start();

    try {
      const profile = await getCharacterProfile(region, realm, name);

      spinner.stop();

      console.log(`
Name: ${profile.name}
Level: ${profile.level}
Class: ${profile.character_class.name}
Race: ${profile.race.name}
Item Level: ${profile.average_item_level}
      `);
    } catch (err: any) {
      spinner.fail("Failed to fetch character");
      console.error(err.message);
    }
  });
