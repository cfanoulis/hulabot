exports.run = async (client, message, args, level) => { //eslint-disable-line
const template = {
    subID: "",
    baseResource: "",
    basePercentage: "",
    salt: "",
    lutenium: "",
    notes: "",
    user: {
        tag: "",
        displayUrl: ""
    },
    date: ""
};

async function aWizard(client, message) {
    template.baseResource = await client.awaitReply(message, "What is the base resource of that asteroid?", 10000);
    template.basePercentage = await client.awaitReply(message, "In what percentage is that ", 10000);
    template.salt = await client.awaitReply(message, "How much salt does this asteroid have?", 10000);
    template.lutenium = await client.awaitReply(message, "How much Lutenium does this asteroid has?", 10000);
    const hasNotes = await client.awaitReply(message,"Do you have any notes to add? Reply with **Y**es or **N**o.", 10000);
    if (!hasNotes) return message.channel.send("Oοps! An error occured. Please report this on our server!");
    if (["Yes", "Y"].includes(hasNotes)) { return template.notes = await client.awaitReply(message, "Please type your notes. You have 60 seconds.", 60000);} else { return; }
}

    if (args.length < 1) return message.channel.send("Uhm, I need you to provide an asteroid code. Duh.");
    if (client.asteroids.has(args[0])) return message.channel.send(`Excuse me <@${message.author.id}>, but this asteroid already exists in our databases. Maybe try searching it`);
    if (args.length < 2) { aWizard(client, message); } else {
    template.baseResource = args[1];
    template.basePercentage = args[2];
    template.lutenium = args[4];
    template.notes = args[5];
    template.salt = args[3];
    }
    template.user.tag = message.author.tag;
    template.user.displayUrl = 
    template.date = new Date();
    //Push the object to the DATABASE
    client.asteroids.set(args[0], template);
};

export const conf = {
    enabled: true,
    guildOnly: false,
    gaOnly: true,
    aliases: ["addA"],
    permLevel: "Guild Alliance Member"
};

export const help = {
    name: "addAsteroid",
    category: "Asteroids!",
    description: "Adds an asteroid to our database",
    usage: "addAsteroid"
};