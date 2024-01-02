/** @param {NS} ns */
export async function main(ns) {
  const servers = JSON.parse(ns.read('hackables.txt'));
  
  while (true) {
    const target = servers[Math.floor(Math.random() * servers.length)];
    
    if (Math.random() < 0.33) {
      // ns.tprint(`hacking ${target}`);
      await ns.hack(target);
    } else if (Math.random() < 0.5) {
      // ns.tprint(`weakening ${target}`);
      await ns.weaken(target);
    } else {
      // ns.tprint(`growing ${target}`);
      await ns.grow(target);
    }
    
  }
}