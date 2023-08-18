const { SlashCommandBuilder } = require('discord.js');
const { getGuild, getUser, addLevel } = require('../../libs/mysql.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('showlevel')
		.setDescription('Show player level')
        .addUserOption(option => option.setName('user').setDescription('The user to show level')),
	async execute(interaction) {
        var user = interaction.options.getUser('user');

        if (!user) {
            user = interaction.user;
        }

        const player = await getUser(user.id, interaction.guildId);

        if (!player[0]) {
            return await interaction.reply('This user is not registered!');
        }

        await interaction.reply(`${user.username} is level ${player[0].level} with ${player[0].xp} xp`);
    }
};