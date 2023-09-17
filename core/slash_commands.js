const fs = require('fs');
const path = require('path');
const config = require('../config.json');
require("dotenv").config()
const { REST, Routes } = require('discord.js');

function init(client) {
  const commands = [];

  const directoryPath = path.join(__dirname, '../src/commands/slash');
  const commandFolders = fs.readdirSync(directoryPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(directoryPath, folder);
	  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);

      if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
        client.commands2.set(command.data.name, command);
      } else {
        console.log(`The command at ${filePath} is missing a required "data" or "execute" property.`.bgRed);
      }
    }
  }

  const rest = new REST().setToken(process.env.TOKEN);
  (async () => {
    try {
      var startTime = performance.now();
      await rest.put(
        Routes.applicationCommands(config.clientId),
        { body: commands },
      );
      var endTime = performance.now();
      var tempo = endTime-startTime;
      console.log(`Registered`.yellow, `${client.commands2.size}`.magenta, `slash commands in`.yellow, `${tempo.toFixed(0)}ms`.magenta);
    } catch (error) {
      console.error(error);
    }
  })();

  client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands2.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Erro na execução', ephemeral: true });
    }
  });
}

module.exports = { init }