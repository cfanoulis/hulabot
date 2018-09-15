exports.run = async (client, message, args, level) => { //eslint-disable-line
const fs = require("fs");
const content = fs.readFileSync("./i18n/prompts_${message.language.settings}.json");
const prompts = JSON.parse(content);
var template = {
    subID: "",
    baseResource: "",
    basePercentage: "",
    salt: "",
    lutenium: "",
    notes: "",
    user: "",
    date: ""
};

async function aWizard(client, message, prompts) {

    template.baseResource = await client.awaitReply(message, "What is the base resource of that asteroid?", 10000);
    template.basePercentage = await client.awaitReply(message, "In what percentage is that ", 10000);
    template.salt = await client.awaitReply(message, prompts.add.q3, 10000);
    template.lutenium = await client.awaitReply(message, prompts.add.q4, 10000);
     hasNotes = await client.awaitReply(message, prompts.add.q5, 10000);
    if (!hasNotes) return message.channel.send("Oοps! An error occured. Please report")
}

    if (args.length < 1) return message.channel.send("Uhm, I need you to provide an asteroid code. Duuh.");
    if (client.asteroids.has(args[0])) return message.channel.send("Excuse me <@${message.author.id}, but this asteroid already exists in our databases. Maybe try searching it?");
    if (args.length < 1) return aWizard(client, message, prompts);
    template.baseResource = args[1];
    template.basePercentage = args[2];
    template.salt = args[3];
    template.lutenium = args[4];
    template.notes = args[5];
    template.user = message.author.tag;
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