/** @param {NS} ns */
export async function main(ns) {
  const script = ns.args[0] || 'random-hack.js';
  let servers = JSON.parse(ns.read('servers.txt'));
  servers = servers.filter(s => ns.serverExists(s) && ns.hasRootAccess(s) && s !== 'home');
  ns.write('hackables.txt', JSON.stringify(servers.filter(s => ns.getServerMaxMoney(s) > 0)), 'w');
  servers.forEach(s => {
    ns.scp('hackables.txt', s);
    const t = Math.floor(ns.getServerMaxRam(s) / ns.getScriptRam(script));
    if (!ns.isRunning(script, s) && t > 0) {
      ns.scp(script, s);
      ns.killall(s);
      ns.exec(script, s, t);
    }
  })
}