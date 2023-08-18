const { SlashCommandBuilder } = require('discord.js');
const { getGuild, getUser, addLevel } = require('../../libs/mysql.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('givelevel')
		.setDescription('Gives levels to a user')
        .addUserOption(option => option.setName('user').setDescription('The user to give levels to').setRequired(true))
        .addIntegerOption(option => option.setName('amount').setDescription('The amount of levels to give').setRequired(true)),
	async execute(interaction) {
        const guild = await getGuild(interaction.member.guild.id);

        if (!guild[0]) {
            return await interaction.reply({content : 'This guild is not initialized!', ephemeral : true});
        }

        if (!interaction.member.roles.cache.has(guild[0].adminrole)) {
            return await interaction.reply({content : 'You are not an admin!', ephemeral : true});
        }

        const user = await getUser(interaction.options.getUser('user').id, interaction.guildId);

        if (!user[0]) {
            return await interaction.reply({content : 'This user is not registered!', ephemeral : true});
        }

        await addLevel(interaction.options.getUser('user').id, interaction.options.getInteger('amount'));
        return await interaction.reply({content : 'Levels given!', ephemeral : true});
	},
};