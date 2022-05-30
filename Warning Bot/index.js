
const Discord = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');
const { emit } = require('process');
const { emitKeypressEvents } = require('readline');
const client = new Discord.Client({disableMentions:"none"});
const { MessageEmbed } = require('discord.js');


client.on('ready', () => {

	console.log(`${client.user.tag} is ready to operate.`);
  client.user.setPresence({
    status: 'dnd',
    activity: {
        name: '',
        type: 'PLAYING',
        
    }
});

/*Greeting function */
client.on('guildMemberAdd', member => {

  const channel = member.guild.channels.cache.find(channel => channel.name === "welcome");
  if(!channel) return message.channel.send('couldnt find the channel');

  channel.send(`Welcome to our server, ${member}, you are the ${member.guild.memberCount} please read the rules in the rules channel!`)

});
/*when a user leave function */
client.on('guildMemberRemove', member => {

  const channel = member.guild.channels.cache.find(channel => channel.name === "welcome");
  if(!channel) return console.log('couldnt find the channel');

  channel.send(`The user: ${member} has leave the server`)

});
});

const prefix = '#'

client.on('message', message => {
    // do not handle messages from bots
    if (message.author.bot) return

    // do ignore messages without the prefix
    if (!message.content.startsWith(prefix)) return

    const content = message.content.slice(prefix.length).trim()
    if (content.startsWith('repeat')) {
        message.channel.send(content.slice('repeat'.length))
        console.log(message.content);
		message.delete();
    }
     
    
    });

client.login(token);

