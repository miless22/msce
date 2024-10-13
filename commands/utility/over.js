import { SlashCommandBuilder } from '@discordjs/builders';
import { EmbedBuilder, PermissionFlagsBits } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('over')
        .setDescription('Purges messages from today between specified start and end times.')
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
        .addStringOption(option =>
            option.setName('start-time')
                .setDescription('Start time in HH:MM format')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('end-time')
                .setDescription('End time in HH:MM format')
                .setRequired(true)),
    
    async execute(interaction) {
        const allowedRoleIds = ['1231857587394318357', '1265879755744608368']; // Add the role IDs here
        
        // Check if the user has one of the allowed roles
        const hasRole = interaction.member.roles.cache.some(role => allowedRoleIds.includes(role.id));
        if (!hasRole) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        const startTime = interaction.options.getString('start-time');
        const endTime = interaction.options.getString('end-time');
        
        // Get today's date and set the time for start and end
        const now = new Date();
        const start = new Date(now);
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        start.setHours(startHours, startMinutes, 0, 0);
        
        const end = new Date(now);
        const [endHours, endMinutes] = endTime.split(':').map(Number);
        end.setHours(endHours, endMinutes, 0, 0);

        // Ensure start time is before end time
        if (start >= end) {
            return interaction.reply({ content: 'Start time must be earlier than end time.', ephemeral: true });
        }

        // Fetch messages from the channel
        const messages = await interaction.channel.messages.fetch({ limit: 100 });

        // Filter messages from today between the specified times
        const messagesToDelete = messages.filter(msg => {
            const msgDate = new Date(msg.createdTimestamp);
            return msgDate >= start && msgDate <= end;
        });

        if (messagesToDelete.size === 0) {
            return interaction.reply({ content: 'No messages found to delete in the specified time range.', ephemeral: true });
        }

        // Delete the filtered messages
        const deletedMessages = await interaction.channel.bulkDelete(messagesToDelete, true).catch(err => {
            console.error('Failed to delete messages:', err);
            return interaction.reply({ content: 'There was an error deleting messages.', ephemeral: true });
        });

        // Create an embed with the details
        const embed = new EmbedBuilder()
            .setTitle('MSCE | Concluded Announcement.')
            .setDescription(`Thank you for joining the MSCE session hosted by <@${interaction.user.id}>. Your participation is valued, and we're excited to have you with us. We hope you had an enjoyable experience throughout the event.

__**Session Details:**__

Host: <@${interaction.user.id}>
Start Time: ${startTime}
End Time: ${endTime}

Your presence contributes to making this session a success. Let's make it a memorable event together!`)
            .setFooter({
                text: 'MSCE',
                iconURL: 'https://cdn.discordapp.com/attachments/1261363760862330972/1294734045350985889/k1h18Cu.gif?ex=670c168b&is=670ac50b&hm=13a64ed3d9c6b46300bf64af850e7e060216e6d3c341dd61092f94167deba4c1&'
            });

        // Send the embed to the channel
        await interaction.channel.send({ embeds: [embed] });

        // Send an ephemeral confirmation message
        await interaction.reply({ content: 'Command sent below.', ephemeral: true });
    },
};
