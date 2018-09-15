exports.run = async (client, message, args, level) => { //eslint-disable-line no-unused-vars
    const database = client.asteroids;
    const exist = database.has(args[0]);
    if (!exist) return message.channel.send("Hmm");
};