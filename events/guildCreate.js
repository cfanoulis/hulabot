/**
 * @author AnIdiotsGuide
 * @license MIT
 */

module.exports = (client, guild) => {
  client.logger.cmd(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);
  guild.owner.user.send("Hello. I am HulaBot, the dancing bot, made to help you with DeepTiwn. I am glad to meet you <@" + guild.owner.user.id + ">\nTo set me up and get ~~dancin~~ cracking asteroids, run `-wizard` in your guild **${guild.name}**\n**Keep dancing!**\n~HulaBot ");
};
