import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, StringSelectMenuBuilder, ActionRowBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('serverinformation')
        .setDescription('Retrieve server information'),

    async execute(interaction) {
        const allowedUserId = '1114487029925937232'; // User ID with permission
        if (interaction.user.id !== allowedUserId) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        const targetChannelId = '1294885925351850034';
        const targetChannel = interaction.client.channels.cache.get(targetChannelId);

        if (!targetChannel) {
            return interaction.reply({ content: 'Channel not found!', ephemeral: true });
        }

        const rulesEmbed = new EmbedBuilder()
            .setThumbnail("https://cdn.discordapp.com/attachments/1261363760862330972/1294734045350985889/k1h18Cu.gif")
            .setDescription('Welcome to the MSCE server information channel, this is where you can get all the information provided in the roleplay server.')
            .setTitle('Server Information');

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('server_information')
            .setPlaceholder('Select an option')
            .addOptions([
                { label: 'Server Information', description: 'View the server information', value: 'sf' },
                { label: 'Server Support', description: 'Get server support info', value: 'ss' },
                { label: 'Roleplay Information', description: 'View roleplay information', value: 'rf' },
                { label: 'Server Links', description: 'View server links', value: 'sl' }
            ]);

        const row = new ActionRowBuilder().addComponents(selectMenu);

        await targetChannel.send({ embeds: [rulesEmbed], components: [row] });
        await interaction.reply({ content: 'Session rules sent to the channel.', ephemeral: true });
    },
};
