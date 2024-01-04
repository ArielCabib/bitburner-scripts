

/** @param {NS} ns */
export async function main(ns) {
  let servers = JSON.parse(ns.read('servers.txt'));
  servers = servers.filter(s => !ns.hasRootAccess(s));
  const hackLevel = ns.getHackingLevel();
  servers = servers.filter(s => ns.getServerRequiredHackingLevel(s) <= hackLevel);

  ns.printf(`trying to nuke: ${servers}`);
  servers.forEach(s => {
    if (ns.fileExists('BruteSSH.exe', 'home')) ns.brutessh(s);
    if (ns.fileExists('FTPCrack.exe', 'home')) ns.ftpcrack(s);
    if (ns.fileExists('relaySMTP.exe', 'home')) ns.relaysmtp(s);
    if (ns.fileExists('HTTPWorm.exe', 'home')) ns.httpworm(s);
    if (ns.fileExists('SQLInject.exe', 'home')) ns.sqlinject(s);
    try {
      ns.nuke(s);
      ns.tprintf(`success nuking ${s}`);
    } catch (e) {
      ns.printf(`failure nuking ${s}`);
    }
    
  })
}
