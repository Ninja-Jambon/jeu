const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getTopMoney } = require('../../libs/mysql.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('topmoney')
		.setDescription('Show the top 10 richest users'),
	async execute(interaction) {        
        let topmoney = await getTopMoney(interaction.guildId)

        reply = ""

        for (let i = 0; i < topmoney.length; i++) {
            if (i == 0) reply += `- :first_place: ${topmoney[i].username}: ${topmoney[i].money}\n`
            else if (i == 1) reply += `- :second_place: ${topmoney[i].username}: ${topmoney[i].money}\n`
            else if (i == 2) reply += `- :third_place: ${topmoney[i].username}: ${topmoney[i].money}\n`
            else reply += `- ${i+1}.  ${topmoney[i].username}: ${topmoney[i].money}\n`
        }

        const embed = new EmbedBuilder()
            .setTitle('Top 10 richest users')
            .setDescription(reply)
            .setColor('#00ff00')

        return await interaction.reply({embeds : [embed]});
	},
};