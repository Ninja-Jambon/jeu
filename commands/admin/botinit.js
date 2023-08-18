const { SlashCommandBuilder } = require('discord.js');
const { registerGuild, getGuild } = require('../../libs/mysql.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('botinit')
		.setDescription('Initializes the bot')
        .addRoleOption(option => option.setName('adminrole').setDescription('The admin role to use').setRequired(true)),
	async execute(interaction) {
        const guild = await getGuild(interaction.member.guild.id);

        if (guild[0]) {
            return await interaction.reply({content : 'This guild is already initialized!', ephemeral : true});
        }

        await registerGuild(interaction.member.guild.name, interaction.member.guild.id, interaction.options.getRole('adminrole').id);
        return await interaction.reply({content : 'This guild has been initialized!', ephemeral : true});
	},
};