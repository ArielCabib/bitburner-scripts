/** @param {NS} ns */
export async function main(ns) {
  const target = ns.args[0];

  let seen_servers = [];

  its_here(ns, ns.getHostname(), target, seen_servers);
}

function its_here(ns, root, target, seen_servers) {
  seen_servers.push(root);
  if (root === target) return true;
  const iter = ns.scan(root).filter(s => !seen_servers.includes(s));
  for(const s of iter) {
    if (its_here(ns, s, target, seen_servers)) {
      ns.tprint(s);
      return true;
    }
  }
}