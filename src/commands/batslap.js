exports.run = async (client, message, args, level) => {
    await message.channel.send(new MessageAttachment(
        await client.idiotAPI.batSlap(message.author.displayAvatarURL(), message.mentions.users.first().displayAvatarURL()),
    "batslap.png"));
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "batslap",
    category: "Idiot",
    description: "Batslaps someone by mention.",
    usage: "batslap [mention]"
  };
  