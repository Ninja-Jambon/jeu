const { SlashCommandBuilder } = require('discord.js');
const { registerUser, getUser } = require('../../libs/mysql.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Registers a user to the database'),
	async execute(interaction) {
        const user = await getUser(interaction.user.id, interaction.guildId);

        if (!user[0]) {
            await registerUser(interaction.user.username, interaction.user.id, interaction.guildId);
            return await interaction.reply({content : 'You have been registered!', ephemeral : true});
        }

        return await interaction.reply({content : 'You are already registered!', ephemeral : true});
	},
};