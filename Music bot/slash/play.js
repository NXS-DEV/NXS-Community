const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Loads songs from YTB,and more soon.")
    .addSubcommand((subcommand) => 
        subcommand
            .setName("song")
            .setDescription("Loads a single song from an URL.")
            .addStringOption((option) => option.setName("url").setDescription("The songs URL").setRequired(true))
        
        )
    .addSubcommand((subcommand) =>
        subcommand
            .setName("playlist")
            .setDescription("Loads a playlist of songs from a URL")
            .addStringOption((option) => option.setName("url").setDescription("The playlist URL").setRequired(true))
        )
    .addSubcommand((subcommand) =>
    subcommand
    .setName("Search")
    .setDescription("Searches for song based on provided key word")
    .addStringOption((option) =>
    option.setName("searchterms").setDescription("the search keyword").setRequired(true))
    ),
    run: async ({ client, interaction}) => {
        if (!interaction.member.voice.channel)
        return interaction.editReply("Alert, You need to be in a VC channel for use it.")

        const queue = await client.player.createQueue(interaction.guild)
        if (!queue.connection) await queue.connection(interaction.member.voice.channel)

        let embed = new MessageEmbed()

        if (interaction.options.getSubcommand() === "song"){
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO
            })
            if (result.tracks.length === 0)
                return interaction.editReply("No results")

            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** has been added to the queue`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duration: ${song.duration}`})


        } else if (interaction.options.getSubcommand() === "playlist") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST
            })
            if (result.tracks.length === 0)
                return interaction.editReply("No results")

            const playlist = result.playlist
            await queue.addTrack(result.tracks)
            embed
                .setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the queue`)
                .setThumbnail(song.thumbnail)
        } else if (interaction.options.getSubcommand() === "search") {
            let url = interaction.options.getString("searchterms")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })
            if (result.tracks.length === 0)
                return interaction.editReply("No results")

            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** has been added to the queue`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duration: ${song.duration}`})
        }
        if (!queue.playing) await queue.play()
        await interaction.editReply({
            embeds: {embed}
        })
    }
}