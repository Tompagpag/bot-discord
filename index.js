import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits } from 'discord.js';

const guildId = "1077502203243274260";
const channelId = "1077502203922743339";

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] });
// console.log(client)
// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'help') {
    await interaction.reply('Pong!');
  }
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;
  const guild = client.guilds.cache.get(guildId);
  console.log(guild.channels.cache.find(c => c.id === channelId).messages.fetch(message.id).then(data => data.edit("New message Text")))
  const channel = guild.channels.cache.find(c => c.id === channelId && c.type === 'text');

  // console.log(channel)
  // channel.messages.fetch(`${message.id}`)
  //   .then(message => {
  //     message.edit("New message Text");
  //   }).catch(err => {
  //       console.error(err);
  //   });

  if (message.content.toLowerCase() === 'salut') {
    // message.content.replace(message.content, "lol")
    // message.content.send(message.content.replace('salut', 'lol'));
    message.channel.send('Bonjour,\nJe suis Zagreus le bot modérateur de ce salon.\nBienvenu !')
  } else {
    message.channel.send('Bonjour,\nPour plus d\'informations sur les interactions avec Zagreus, taper /help');
  }
});
// Log in to Discord with your client's token
client.login(process.env.TOKEN);
