/** @param {NS} ns */
export async function main(ns) {
  let servers = ns.scan();

  for (let i = 0; i < servers.length; ++i) {
    let servers2 = ns.scan(servers[i]);
    servers2.forEach(s => {
      if (!servers.includes(s)) servers.push(s);
    })
  }

  // ns.tprintf(JSON.stringify(servers));
  ns.write('servers.txt', JSON.stringify(servers), 'w');
}

