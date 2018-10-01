exports.run = async (client, message, args, level) => {
    await message.channel.send(new MessageAttachment(
        await client.idiotAPI.achievement(message.author.displayAvatarURL(), args.join(" ")),
    "achievement.png"));
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};
  
exports.help = {
    name: "achievement",
    category: "Idiot",
    description: "Get an achievement.",
    usage: "achievement [text]"
};