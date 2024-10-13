import { SlashCommandBuilder } from '@discordjs/builders';
import { EmbedBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('roleinfo')
        .setDescription('Displays information about a specified role')
        .addRoleOption(option => 
            option.setName('role')
                .setDescription('Select a role to get information')
                .setRequired(true)),
    async execute(interaction) {
        const role = interaction.options.getRole('role');

        const embed = new EmbedBuilder()
            .setTitle(`Role Information: ${role.name}`)
            .setColor(role.color || '#FFFFFF')
            .addFields(
                { name: 'Role ID', value: role.id, inline: true },
                { name: 'Members with Role', value: `${role.members.size}`, inline: true },
                { name: 'Role Created At', value: role.createdAt.toDateString(), inline: true },
                { name: 'Position', value: `${role.position}`, inline: true },
                { name: 'Permissions', value: `${role.permissions.toArray().join(', ') || 'None'}` },
            )
            .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
