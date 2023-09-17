const fs = require('fs');
const path = require('path');

function init(client) {
  const directoryPath = path.join(__dirname, '../src/events');
  const commandFolders = fs.readdirSync(directoryPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(directoryPath, folder);
	  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const event = require(filePath);

      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client));
      }
    }
  }
}

module.exports = { init }