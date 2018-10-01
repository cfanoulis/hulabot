console.log("HulaBot is starting");

//Allocate variables
let tokens;
//Load dependencies
const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const fs = require("fs");
const Idiot = require("idiotic-api");

//Load the secure element (nope, this is not on github :wink_wink:)
const secureElement = require("./modules/secure"); //eslint-disable-line

//Initialize the client and attach the enmaps (evie may god bless you with theese) and config
const client = new Discord.Client();
if (!process.env.TESTING) { client.config = require("./configs/config.js"); }
client.commands = new Enmap();
client.aliases = new Enmap();
client.settings = new Enmap({name: "settings", fetchAll: false, autoFetch: true});
client.asteroids = new Enmap({name: "asteroids"});
client.allianceMembers = new Enmap({name: "GuildAllianceMembers"});
client.idiotAPI = Idiot.Client(tokens.idiot)

//Gimme them keys
if (!process.argv[5]) {
const contents = fs.readFileSync("./configs/tokens-and-secrets.json");
tokens = JSON.parse(contents);
}

//Custom logger (York this is amazing)
client.logger = require("./modules/Logger");

//Another useful thong York has in Guidebot
require("./modules/functions.js")(client);

//his is where perm nodes should go, but I am busy

const init = async () => {

  // Load commands
  const cmdFiles = await readdir("./commands/");
  client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });

  // Load events
  const evtFiles = await readdir("./events/");
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    client.logger.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`);
    // Bind the client to any event, before the existing arguments
    // provided by the discord.js event. 
    // This line is awesome by the way. Just sayin'.
    client.on(eventName, event.bind(null, client));
  });

  // Generate a cache of client permissions for pretty perm names in commands.
  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  // Here we login the client.
  if (process.env.TESTING) return process.exit(0);
  client.login(tokens.dithcord);

// End top-level async/await function.
};

init();

//But because we are cool, we have a shutdown command :smart:
process.on("SIGTERM", () => {
  require("./modules/shtudown").run();
});