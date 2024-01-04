/** @param {NS} ns */
export async function main(ns) {
  const targetIncome = ns.args[0];
  while (true) {
    const player = ns.getPlayer();
    const dollarsPerSec = player.money / player.playtimeSinceLastAug * 1000;
    ns.print(`$ per sec: ${dollarsPerSec}`);
    if (dollarsPerSec > targetIncome) {
      ns.scriptKill('init.js');
    }
    await ns.sleep(10000);
  }
}