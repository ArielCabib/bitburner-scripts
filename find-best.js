

/** @param {NS} ns */
export async function main(ns) {
  let servers = JSON.parse(ns.read('servers.txt'));
  servers = servers.filter(s => ns.serverExists(s) && ns.hasRootAccess(s));
  
  servers.sort((s1, s2) => ns.getServerMaxMoney(s1) - ns.getServerMaxMoney(s2)).forEach(s => {
    ns.tprintf(`${s}: ${ns.getServerMaxMoney(s)}`);
  })
}
