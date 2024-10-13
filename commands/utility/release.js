import { SlashCommandBuilder } from '@discordjs/builders';
import { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle, ComponentType, PermissionFlagsBits } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('release')
        .setDescription('Releases the session for everyone to join.')
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
        .addStringOption(option =>
            option.setName('session-link')
                .setDescription('Link for the session so that civilians may join.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('peacetime-status')
                .setDescription('Current peacetime status.')
                .addChoices(
                    { name: 'Peacetime On', value: 'On' },
                    { name: 'Peacetime Normal', value: 'Normal' },
                    { name: 'Peacetime Off', value: 'Off' }
                )
                .setRequired(true))
        .addStringOption(option =>
            option.setName('frp-speed')
                .setDescription('FRP speeds.')
                .addChoices(
                    { name: '75', value: '75' },
                    { name: '80', value: '80' },
                    { name: '85 (should not be used frequently)', value: '85' }
                )
                .setRequired(true))
        .addStringOption(option =>
            option.setName('drifting-status')
                .setDescription('Current drifting status.')
                .addChoices(
                    { name: 'On', value: 'On' },
                    { name: 'Corners Only', value: 'Corners Only' },
                    { name: 'Off', value: 'Off' }
                )
                .setRequired(true)),

    async execute(interaction) {
        try {
            const sessionLink = interaction.options.getString('session-link');
            const peacetimeStatus = interaction.options.getString('peacetime-status');
            const frpSpeed = interaction.options.getString('frp-speed');
            const driftingStatus = interaction.options.getString('drifting-status');

            // Role IDs that are allowed to use this command
            const allowedRoleIds = ['1231857587394318357', '1265879755744608368'];

            // Check if the user has one of the allowed roles
            const hasRole = interaction.member.roles.cache.some(role => allowedRoleIds.includes(role.id));

            if (!hasRole) {
                return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
            }

            const embed = new EmbedBuilder()
                .setTitle('MSCE | Release Announcement')
                .setDescription(`The session host has distributed the link to all participants. Click the button below to view and join the session. Should you encounter any issues or have questions, our support team is available to assist you promptly.

**__Session Information:__**

Session Host: <@${interaction.user.id}>
Peacetime Status: ${peacetimeStatus}
FRP Speeds: ${frpSpeed} MPH
Drifting Status: ${driftingStatus}

Your participation is valued, and we wish you a smooth and enjoyable experience during the session.`)
                .setFooter({
                    text: 'MSCE',
                    iconURL: 'https://cdn.discordapp.com/attachments/1261363760862330972/1294734045350985889/k1h18Cu.gif?ex=670c168b&is=670ac50b&hm=13a64ed3d9c6b46300bf64af850e7e060216e6d3c341dd61092f94167deba4c1&'
                });

            const button = new ButtonBuilder()
                .setLabel('Session Link')
                .setStyle(ButtonStyle.Secondary)
                .setCustomId('ls');

            const row = new ActionRowBuilder()
                .addComponents(button);

            // Send the embed message with the button to the channel
            await interaction.channel.send({ content: '@everyone', embeds: [embed], components: [row] });

            // Send an ephemeral confirmation message
            await interaction.reply({ content: 'Command sent below.', ephemeral: true });

            // Create a collector to handle the button interaction
            const filter = i => i.customId === 'ls';
            const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: ComponentType.Button, time: 9999999 });

            collector.on('collect', async i => {
                try {
                    await i.deferUpdate(); // Defer the button update

                    await i.followUp({ content: `**Link:** ${sessionLink}`, ephemeral: true });
                } catch (error) {
                    console.error('Error responding to interaction:', error);
                }
            });

            collector.on('end', collected => {
                console.log(`Collected ${collected.size} interactions.`);
            });
        } catch (error) {
            console.error('Error executing command:', error);
            await interaction.reply({ content: 'There was an error while executing this command.', ephemeral: true });
        }
    },
};
