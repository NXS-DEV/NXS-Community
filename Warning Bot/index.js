
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


client.on('message', message => {
  if (message.content === `Starting NXS SYS`) {
     if (!message.mentions.users.size) {
         return message.reply('Starting NXS SYS . . .');

     }else {
       return message.reply('Command not found !');
     }
 }
 
});

client.on('message', message => {
  if (message.content === `Shutting down NXS SYS`) {
     if (!message.mentions.users.size) {
         return message.reply('NXS SYS is now shutting down . . .');

     }else {
      return message.reply('Command not found !');
    }
 }
 
});

client.on('message', message => {
  if(message.content === `${prefix}` + "Eventlist") {
    message.channel.send("Please go to #Events channel, That's were all the event will be announced.");
  }

})


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

    client.on('message', (message) => {
      if (!message.content.startsWith(prefix) || message.author.bot) return;
    
      const args = message.content
        .toLowerCase()
        .slice(prefix.length)
        .trim()
        .split(/\s+/);
      const [command, input] = args;
    
      if (command === 'clear' || command === 'c') {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
          return message.channel
            .send(
              "You cant use this command since you're missing `manage_messages` perm",
            );
        }
    
        if (isNaN(input)) {
          return message.channel
            .send('Enter the amount of messages that you would like to clear')
            .then((sent) => {
              setTimeout(() => {
                sent.delete();
              }, 5000); /*2500 */
            });
        }
    
        if (Number(input) < 0) {
          return message.channel
            .send('Enter a positive number')
            .then((sent) => {
              setTimeout(() => {
                sent.delete();
              }, 5000); /*2500 */
            });
        }
    
        // add an extra to delete the current message too
        const amount = Number(input) > 100
          ? 101
          : Number(input) + 1;
    
        message.channel.bulkDelete(amount, true)
        .then((_message) => {
          message.channel
            // do you want to include the current message here?
            // if not it should be ${_message.size - 1}
            .send(`Done ! \`${_message.size}\` messages has been deleted. :broom:`)
            .then((sent) => {
              setTimeout(() => {
                sent.delete();
              }, 5000); /*2500 */
            });
        });
      }
    
     
    
    });
})

client.login(token);
