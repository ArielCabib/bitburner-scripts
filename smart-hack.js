/** @param {NS} ns */
export async function main(ns) {
  while (true) {
    const servers = JSON.parse(ns.read('hackables.txt'));
    if (servers.length === 0) {
      ns.tprint('nothing to hack');
      return;
    }
    const target = servers[Math.floor(Math.random() * servers.length)];
    const moneyThresh = ns.getServerMaxMoney(target);
    const securityThresh = ns.getServerMinSecurityLevel(target);
    
    if (ns.getServerSecurityLevel(target) > securityThresh) {
      await ns.weaken(target);
    } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
      await ns.grow(target);
      await ns.hack(target);
    } else {
      await ns.hack(target);
    }
    
  }
}