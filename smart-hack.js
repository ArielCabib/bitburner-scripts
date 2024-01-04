/** @param {NS} ns */
export async function main(ns) {
  while (true) {
    const servers = JSON.parse(ns.read('hackables.txt'));
    if (servers.length === 0) {
      ns.tprint('nothing to hack');
      return;
    }
    const target = servers[Math.floor(Math.random() * servers.length)];
    
    const securityThresh = ns.getServerMinSecurityLevel(target);

    if (ns.getServerSecurityLevel(target) > securityThresh) {
      await ns.weaken(target);
      if (ns.getServerSecurityLevel(target) < securityThresh * 1.01) {
        await grow_or_hack(ns, target);
      }
    } else {
      await grow_or_hack(ns, target);
    }
  }
}

async function grow_or_hack(ns, target) {
  const moneyThresh = ns.getServerMaxMoney(target);
  if (ns.getServerMoneyAvailable(target) < moneyThresh) {
    await ns.grow(target);
    await ns.hack(target);
  } else {
    await ns.hack(target);
  }
}