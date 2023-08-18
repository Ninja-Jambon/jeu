const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { setAdminRole, getGuild } = require('../../libs/mysql.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setadminrole')
		.setDescription('Set the admin role for the guild')
        .addRoleOption(option => option.setName('adminrole').setDescription('The admin role to use').setRequired(true)),
	async execute(interaction) {
        console.log(interaction.member.permissions)

        /*if (!interaction.member.permissions.has(PermissionsBitField.FLAGS.ADMINISTRATOR)) {
            return await interaction.reply({content : 'You are not an admin!', ephemeral : true});
        }*/

        const guild = await getGuild(interaction.member.guild.id);

        if (!guild[0]) {
            return await interaction.reply({content : 'This guild is not initialized!', ephemeral : true});
        }

        if (guild[0].adminrole == interaction.options.getRole('adminrole').id) {
            return await interaction.reply({content : 'This guild already has this admin role!', ephemeral : true});
        }

        await setAdminRole(interaction.guildId, interaction.options.getRole('adminrole').id);
        return await interaction.reply({content : 'This guild\'s admin role has been set!', ephemeral : true});
	},
};