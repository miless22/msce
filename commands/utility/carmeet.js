import { SlashCommandBuilder } from '@discordjs/builders';
import { EmbedBuilder, PermissionFlagsBits } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('carmeet')
        .setDescription('Sends a carmeet embed')
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
        .addIntegerOption(option =>
            option.setName('reactions')
                .setDescription('Amount of reactions for the session to occur')
                .setRequired(true)),
    
    async execute(interaction) {
        const reactions = interaction.options.getInteger('reactions');
        const user = interaction.user;

        const embed = new EmbedBuilder()
            .setTitle('MSCE | CarMeet Announcement')
            .setDescription(`Welcome, ${user}! is starting a carmeet. Before the carmeet commences, you must follow all of the rules provided below.
                
                **__Startup Information__**
                > Read the information provided at <#1241193853613113375>. Not following the rules will result in a server ban.
                > Leaking the carmeet will result in a permanent server ban from MSCE.
                
                For the session to commence, this message needs **__${reactions}__**.`)
            .setFooter({
                text: 'MSCE',
                iconURL: 'https://cdn.discordapp.com/attachments/1261363760862330972/1294734045350985889/k1h18Cu.gif?ex=670c168b&is=670ac50b&hm=13a64ed3d9c6b46300bf64af850e7e060216e6d3c341dd61092f94167deba4c1&'
            });

        // Send the embed message to the channel
        const message = await interaction.channel.send({ content: '@everyone', embeds: [embed] });

        // Add reaction to the embed message
        await message.react('✅');

        // Send an ephemeral confirmation message
        await interaction.reply({ content: 'Command Sent Below.', ephemeral: true });
    },
};
