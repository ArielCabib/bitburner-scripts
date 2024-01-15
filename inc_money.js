const fs = require('fs');
const file = fs.readFileSync(process.argv[2]);
const BitburnerSaveObject = JSON.parse(atob(file));
const PlayerObject = JSON.parse(BitburnerSaveObject.data.PlayerSave)
PlayerObject.data.money = process.argv[3];
BitburnerSaveObject.data.PlayerSave = JSON.stringify(PlayerObject);
fs.writeFileSync(process.argv[2] + 'MOD', btoa(JSON.stringify(BitburnerSaveObject)));
