exports.run = async (client, message, args, level) => {
    await message.channel.send(new MessageAttachment(
        await client.idiotAPI.wanted(message.author.displayAvatarURL(), "wanted.png")));
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "wanted",
    category: "Idiot",
    description: "Become wanted",
    usage: "wanted"
  };
  