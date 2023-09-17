const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription("ass"),
    async execute(interaction) {
        console.log("testing w.")
    }
}
