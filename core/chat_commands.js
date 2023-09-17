const fs = require('fs');
const path = require('path');

function init(client) {
  var startTime = performance.now();
  
  const directoryPath = path.join(__dirname, '../src/commands/chat');
  const commandFolders = fs.readdirSync(directoryPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(directoryPath, folder);
	  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      client.commands.set(command.name, command);
    }
  }

  client.on('messageCreate', message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!message.content.startsWith('$')) {
      if (!message.content.startsWith('/')) {
        return;    
      }
    }

    if (message.author.id != "231813177908789248") {
      if (message.guild.id != "538825725017325571" && message.guild.id != "1001614380875645069") return;
    }

    const args = message.content.slice(1).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    try {
      command.execute(client, message, args);
    } catch (error) {
      console.log(error);
    }
  });

  var endTime = performance.now();
  var tempo = endTime-startTime;
  console.log(`[Holo]`.red, `Registered chat commands successful.`.yellow);
}

module.exports = { init }
