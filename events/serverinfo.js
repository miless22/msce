import { EmbedBuilder } from 'discord.js';

export default {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isStringSelectMenu()) return;

        const { customId, values } = interaction;

        // Check for the correct customId for the select menu
        if (customId === 'server_information') { // Make sure this matches the customId from your select menu
            const selectedValue = values[0];
            let embed;

            // Create embed based on selected value
            if (selectedValue === 'rf') {
                embed = new EmbedBuilder()
                    .setDescription(`
1. **Stay in Character**  
   Roleplay interactions should remain in character at all times. Out-of-character discussions should be kept to designated channels or marked appropriately in text.

2. **No Metagaming**  
   Using out-of-character knowledge to influence in-character decisions is strictly prohibited. Your character should only act on information they have learned through roleplay.

3. **No Powergaming**  
   Forcing actions on other players without giving them a chance to respond is not allowed. All players must be given the opportunity to react and engage in roleplay scenarios.

4. **Respect Roleplay Boundaries**  
   Be considerate of other players’ limits. Avoid engaging in sensitive or controversial topics unless all parties consent to the direction of the roleplay.

5. **Keep Roleplay Realistic**  
   Your character's actions should be grounded in the reality of the roleplay setting. Unrealistic or exaggerated actions that break immersion should be avoided.

6. **No Godmodding**  
   Your character cannot be invincible or all-powerful. Every character has weaknesses, and part of roleplaying is experiencing the challenges that come with those vulnerabilities.

7. **Character Death**  
   Character death should only happen with the consent of the player unless it is part of an official event or storyline. All parties should agree on the consequences of such actions.

8. **Roleplay Conflicts**  
   If a conflict arises during roleplay, handle it in-character whenever possible. If out-of-character issues arise, resolve them respectfully and seek help from a moderator if needed.

9. **Respect the Storyline and Setting**  
   Ensure that your character and actions fit within the lore and setting of the roleplay world. Disruptive or inappropriate behavior that breaks the continuity of the story is not allowed.

10. **No Disruptive Behavior**  
   Avoid trolling, griefing, or intentionally derailing serious roleplay scenarios. This includes creating characters that serve only to disrupt the experience for others.

11. **Use Proper Grammar and Writing**  
   While perfect grammar isn't required, aim to communicate clearly. Text-speak or excessive abbreviations in roleplay text can disrupt immersion.

12. **Consent in Roleplay**  
   Any actions that directly affect another character must have the other player’s consent, especially in sensitive situations. Always communicate with your fellow roleplayers.

13. **Avoid Overpowered Characters**  
   Creating characters that dominate every situation or outshine others detracts from the roleplay experience. Balance your character’s strengths and weaknesses.

14. **Maintain Respect OOC (Out of Character)**  
   Keep interactions out of character respectful and kind. Even if characters conflict, real-life respect for fellow players is mandatory.

15. **Follow Server-Specific Rules**  
   Abide by any additional roleplay guidelines specific to certain channels, groups, or events. These may vary, but they must always be followed.
                    `)
                    .setColor(`#FFFFFF`);
            } else if (selectedValue === 'sf') {
                embed = new EmbedBuilder()
                    .setDescription(`
1. **No NSFW Content**  
   Posting content that is Not Safe For Work is strictly prohibited. If you are unsure whether your content is appropriate, refrain from sharing it.

2. **Respect All Members**  
   Treat every member with respect. This server is not the place for arguments or hostility.

3. **No Spamming**  
   Spamming in any form, whether in text or voice channels, is not permitted. Avoid excessive use of Discord mentions as well.

4. **Limit Swearing**  
   Excessive swearing is not tolerated. Please maintain a respectful level of language.

5. **No Derogatory or Offensive Language**  
   Discriminatory or inappropriate terms have no place here and will not be tolerated.

6. **Appropriate Usernames and Avatars**  
   Offensive or inappropriate avatars and usernames are not allowed. If it wouldn’t be allowed in the channels, it shouldn't be displayed on your profile.

7. **No Unrelated Advertising or Invites**  
   Advertising or sending invites to other servers without permission, including through direct messages to members, is strictly forbidden.

8. **No Doxxing**  
   Sharing personal information is a serious violation and may result in permanent bans from both the game and Discord.

9. **Use Common Sense**  
   These rules may not cover every possible scenario. Please use good judgment before posting or interacting with others.

10. **Moderation in English**  
   To ensure effective moderation, we require the use of English, as it is the language our staff can monitor.

11. **Have Fun**  
   Above all, enjoy your time in the server!

If you have any questions regarding the rules, please click the button below to open a support ticket. We hope you enjoy your stay here at MSCE!
                    `)
                    .setColor(`#FFFFFF`);
            } else if (selectedValue === 'sl') {
                embed = new EmbedBuilder()
                    .setDescription(`Please find below all the links affiliated with MSCE.`)
                    .addFields(
                        { name: 'Rapid', value: 'https://discord.gg/VcaHFRmk' },
                        { name: 'Roblox Group', value: 'https://www.roblox.com/groups/34350409/BCSE-SWFL#!/about' },
                        { name: 'X.com', value: 'https://x.com/_MCSE_' },
                        { name: 'Youtube', value: 'https://www.youtube.com/@MafiaCarShowEvents' },
                        { name: 'Tiktok', value: 'https://www.tiktok.com/@mafia_hollowfyi?is_from_webapp=1&sender_device=pc' },
                        { name: 'Twitter', value: 'https://twitter.com/MCSE' }
                    )
                    .setColor(`#FFFFFF`);
            } else if (selectedValue === 'ss') {
                embed = new EmbedBuilder()
                    .setDescription(`For further assistance, head over to <#1231857793309343785>`)
                    .setColor(`#FFFFFF`);
            }

            // Send the selected embed
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
};
