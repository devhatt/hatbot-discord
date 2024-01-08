import {
  CommandInteraction,
  SlashCommandBuilder,
  Client,
  ChannelType,
  Chann
} from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('change')
  .setDescription('fechar um Tópico sobre pr')

  // async function fetchAllMessages(client: Client) {
  //   const channel = client.channels.cache.get("<my-channel-id>");
  //   let messages = [];
  
  //   // Create message pointer
  //   let message = await channel.messages
  //     .fetch({ limit: 1 })
  //     .then(messagePage => (messagePage.size === 1 ? messagePage.at(0) : null));
  
  //   while (message) {
  //     await channel.messages
  //       .fetch({ limit: 100, before: message.id })
  //       .then(messagePage => {
  //         messagePage.forEach(msg => messages.push(msg));
  
  //         // Update our message pointer to be the last message on the page of messages
  //         message = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
  //       });
  //   }
  
  //   console.log(messages);  // Print all messages
  // }

export async function execute(interaction: CommandInteraction, client: Client) {
  const channel = client.channels.cache.get(interaction.channelId)


  if (channel) {
    channel.messages.fetch({ limit: 100 }).then(messages => {
      console.log(`Received ${messages.size} messages`);
      //Iterate through the messages here with the variable "messages".
      messages.forEach(message => console.log(message.content))
    })
    
  }

  console.log("🚀 ~ file: change.ts:37 ~ execute ~ channel:", channel)
  

  if (!channel || channel.type !== ChannelType.PublicThread) {
    return
  }

  const members = await channel.members.fetch()

  const [pullOwner] = members.map((member) => member)

  await interaction.reply(
    `❌ Necessário realizar mudanças no código, ${pullOwner.user}`
  )
}
