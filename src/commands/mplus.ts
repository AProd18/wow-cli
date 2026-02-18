import { Command } from "commander";
import { logger } from "../utils/logger.js";
import { printTable } from "../utils/table.js";

function calculateScaling(level: number) {
  const multiplier = 1 + level * 0.08;

  return {
    "Enemy Health Multiplier": `x${multiplier.toFixed(2)}`,
    "Enemy Damage Multiplier": `x${(multiplier * 0.95).toFixed(2)}`,
  };
}

export const mplusCommand = new Command()
  .name("mplus")
  .description("Calculate Mythic+ scaling for a given Keystone level")
  .argument("<level>", "Keystone level")
  .action((levelArg) => {
    const level = Number(levelArg);

    if (isNaN(level) || level <= 0) {
      logger.error("Invalid level provided. Please enter a positive number.");
      return;
    }

    const spinner = logger.spinner(
      `Calculating Mythic+ scaling for level ${level}...`,
    );

    try {
      const result = calculateScaling(level);

      spinner.succeed(`Mythic+ scaling calculated for level ${level}!`);

      printTable([
        { Property: "Mythic+ Level", Value: level },
        {
          Property: "Enemy Health Multiplier",
          Value: result["Enemy Health Multiplier"],
        },
        {
          Property: "Enemy Damage Multiplier",
          Value: result["Enemy Damage Multiplier"],
        },
      ]);
    } catch (err: any) {
      spinner.fail("Failed to calculate Mythic+ scaling");
      logger.error(err.message || "Unknown error occurred");
    }
  });
