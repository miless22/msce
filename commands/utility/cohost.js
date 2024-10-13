import { SlashCommandBuilder } from '@discordjs/builders';
import { EmbedBuilder, PermissionFlagsBits } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('cohost')
        .setDescription('Sends the cohost command'),

    async execute(interaction) {
        const allowedRoleIds = ['1231857587394318357', '1265879755744608368']; // Add the role IDs here
        
        // Check if the user has one of the allowed roles
        const hasRole = interaction.member.roles.cache.some(role => allowedRoleIds.includes(role.id));
        if (!hasRole) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        const user = interaction.user;

        const embed = new EmbedBuilder()
            .setTitle('MSCE | Cohost Announcement')
            .setDescription(`${user} is cohosting the session being hosted.`)
            .setFooter({
                text: 'MSCE',
                iconURL: 'https://cdn.discordapp.com/attachments/1261363760862330972/1294734045350985889/k1h18Cu.gif?ex=670c168b&is=670ac50b&hm=13a64ed3d9c6b46300bf64af850e7e060216e6d3c341dd61092f94167deba4c1&'
            });

        // Send the embed message to the channel
        await interaction.channel.send({ embeds: [embed] });

        // Send an ephemeral confirmation message
        await interaction.reply({ content: 'Command sent below.', ephemeral: true });
    },
};
