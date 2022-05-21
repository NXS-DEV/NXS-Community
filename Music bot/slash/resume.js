const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("resume the current song"),
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue)
            return await interaction.editReply("There are no songs in the queue")

            queue.setPaused(false)
            await interaction.editReply("Music has been unpaused ! Use `/pause` to paused the current song")
            
    }
}