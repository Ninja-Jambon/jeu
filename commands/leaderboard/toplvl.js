const { SlashCommandBuilder } = require('discord.js');
const { getGuild, getUser, getTopLevel } = require('../../libs/mysql.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('toplevel')
		.setDescription('Show the top 10 higher users'),
	async execute(interaction) {
        guild = await getGuild(interaction.guild.id);
        
        let toplevel = await getTopLevel(guild.id);

        reply = "Top 10 higher users:\n";

        for (let i = 0; i < toplevel.length; i++) {
            if (i == 0) reply += `:first_place:. ${toplevel[i].username}: ${toplevel[i].money}\n`;
            else if (i == 1) reply += `🥈. ${toplevel[i].username}: ${toplevel[i].money}\n`;
            else if (i == 2) reply += `:third_place:. ${toplevel[i].username}: ${toplevel[i].money}\n`;
            else reply += `${i+1}. ${toplevel[i].username}: ${toplevel[i].money}\n`;
        }

        return await interaction.reply(reply);
	},
};