const startTime = Date.now();
require("dotenv").config()
const fs = require('fs');
const Discord = require("discord.js")
const client = new Discord.Client({intents: [
    Discord.GatewayIntentBits.DirectMessages,
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildModeration,
    Discord.GatewayIntentBits.GuildInvites,
    Discord.GatewayIntentBits.GuildMessageReactions,
    Discord.GatewayIntentBits.GuildEmojisAndStickers,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.MessageContent,
  ],
  partials: [Discord.Partials.Channel],
});
const colors = require('colors');

const coreFileLoadTime = Date.now()
client.commands = new Discord.Collection();
client.commands2 = new Discord.Collection();

const dir = "./core"
const coreFiles = fs.readdirSync(dir).filter(file => file.endsWith('.js'));
for (const coreFile of coreFiles) {
  const module = require(`${dir}/${coreFile}`);
  if (module.init) {
    module.init(client)
  } else {
    console.log(`Error to load file: ${coreFile} does not have init.`.bgRed)
  }
}
const coreFileEndTime = Date.now() - coreFileLoadTime

client.on("ready", () => {
  const totalReadingTime = Date.now() - startTime;
  print(`Connected to Discord API in`.yellow, `${totalReadingTime}ms`.magenta)
  print(`${coreFiles.length}`.magenta, `Core files loaded in`.yellow, `${coreFileEndTime}ms`.magenta)
})

client.login(process.env.TOKEN)
