
module.exports = async (client, message) => {
  if (message.author.bot) return;


  const settings = message.settings = client.getGuildSettings(message.guild);

  //Mention to get the prefix
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.reply(`My prefix on this guild is \`${settings.prefix}\``);
  }

  //Nope, no prefix - no command
  if (message.content.indexOf(settings.prefix) !== 0) return;

  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // If the member on a guild is invisible or not cached, fetch them.
  if (message.guild && !message.member) await message.guild.fetchMember(message.author);

  const level = client.permlevel(message);

  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  // using this const varName = thing OR otherthign; is a pretty efficient
  // and clean way to grab one of 2 values!
  if (!cmd) return;

  // Some commands may not be useable in DMs. This check prevents those commands from running
  // and return a friendly error message.
  if (cmd && !message.guild && cmd.conf.guildOnly)
    return message.channel.send("This command is unavailable via private message. Please run this command in a guild.");

  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (settings.systemNotice === "true") {
      return message.channel.send(`You do not have permission to use this command.
  Your permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name})
  This command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
    } else {
      return;
    }
  }

  // To simplify message arguments, the author's level is now put on level (not member so it is supported in DMs)
  // The "level" command module argument will be deprecated in the future.
  message.author.permLevel = level;

  //Guild Alliance Checking (yay!)
  if (cmd.conf.gaOnly === true) {
    if (!client.gaCheck) {
      if (settings.systemNotice === "true") {
        return message.channel.send("Sorry, but only Guild Alliance Members have the ability to use this command!\nIf you have been wrongfully denied access to this command, please seek support in our server");
      } else {
        return;
      }
    }
  }


  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }
  // If the command exists, **AND** the user has permission, run it.
  client.logger.cmd(`[CMD] ${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`);
  cmd.run(client, message, args, level);
};