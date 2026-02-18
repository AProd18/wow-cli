import { Command } from "commander";

function calculateScaling(level: number) {
  const multiplier = 1 + level * 0.08;

  return {
    health: multiplier.toFixed(2),
    damage: (multiplier * 0.95).toFixed(2),
  };
}

export const mplusCommand = new Command()
  .name("mplus")
  .description("Calculate Mythic+ scaling")
  .argument("<level>", "Keystone level")
  .action((level) => {
    const result = calculateScaling(Number(level));

    console.log(`
Mythic+ Level: ${level}
Enemy Health Multiplier: x${result.health}
Enemy Damage Multiplier: x${result.damage}
    `);
  });
