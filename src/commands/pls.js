exports.run = async (client, message, args, level) => {
    await message.channel.send(new MessageAttachment(
        await client.API.pls((message.mentions.members.first() || message.member).displayName),
    "pls.png"));
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "pls",
    category: "Idiot",
    description: "User, pls.",
    usage: "pls [mention (optional)]"
  };
  