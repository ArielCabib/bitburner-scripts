/** @param {NS} ns */
export async function main(ns) {

  const minimalRam = parseInt(ns.args[0]) || 16;

  auto_and_dist(ns);

  while (true) {
    let skipHack = false;
    if (ns.getPurchasedServers().length < ns.getPurchasedServerLimit()) {
      let ram = minimalRam;
      ns.print(`trying to buy at min cost: ${ns.getPurchasedServerCost(ram)}`);
      while (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
        ram *= 2;
      }
      ram /= 2;
      if (ram >= minimalRam) {
        ns.purchaseServer(`pserv-${ram}GB`, ram);
        if (ns.getPurchasedServers().length < ns.getPurchasedServerLimit()) {
          auto_and_dist(ns);
        } else {
          // we are at max servers. deploy smart scripts.
          deploy_smart(ns);
        }
        
      }
    } else {
      ns.print('max servers reached');
      const lowest = ns.getPurchasedServers().sort((s1, s2) => ns.getServerMaxRam(s1) - ns.getServerMaxRam(s2))[0];
      if (ns.getServerMaxRam(lowest) === ns.getPurchasedServerMaxRam()) {
        // nothing to do any more
        deploy_smart(ns);
      } else if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ns.getServerMaxRam(lowest) * 2)) {
        ns.killall(lowest);
        ns.deleteServer(lowest);
        skipHack = true;
      }
    }
    if (!skipHack) {
      await ns.sleep(10000);
      // const hackables = JSON.parse(ns.read('hackables.txt'));
      // await ns.hack(hackables[Math.floor(Math.random() * hackables.length)]);
    }
  }
}

function auto_and_dist(ns) {
  ns.exec('scan.js', 'home');
  ns.exec('autohack.js', 'home');
  ns.exec('dist.js', 'home');
}

function deploy_smart(ns) {
  ns.exec('scan.js', 'home');
  ns.exec('autohack.js', 'home');
  ns.exec('dist.js', 'home', 1, 'smart-hack.js');
}