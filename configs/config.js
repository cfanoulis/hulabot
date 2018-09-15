
const config = {
"ownerID": "457073894554206209",
"admins": ["326362244860346371"],
"support": [],
"GA": [],
"locales": ["en"],

/* Default per-server settings. New guilds have these settings. 
 DO NOT LEAVE ANY OF THESE BLANK, AS YOU WILL NOT BE ABLE TO UPDATE THEM
VIA COMMANDS IN THE GUILD. */
  
  "defaultSettings" : {
    //Some basic things. NEVER LEAVE THIS EMPTY.
    "prefix": "-",
    //Module Availability
    "applicationEnabled": "false",
    "musicEnabled": "false",
    "starboardEnabled": "false",
    "systemNotice": "true",
    //Channel IDs
    "applicationChannelID": "0123401234",
    "starboardChannelId": "0123401234",
    //Identities
    "GuildModRoleId": "Moderator",
    "GuildAdminRoleId": "Administrator"
  },

  // PERMISSION LEVEL DEFINITIONS.

  permLevels: [
    { level: 0,
      name: "User", 
      check: () => true
    },

    { level: 2,
      name: "Guild Moderator",
      check: (message) => {
        try {
          if (message.member.roles.has(message.settings.GuildModRoleId)) return true;
        } catch (e) {
          return false;
        }
      }
    },

    { level: 3,
      name: "Guild Administrator", 
      check: (message) => {
        try {
          return (message.member.roles.has(message.settings.GuildAdminRoleId));
        } catch (e) {
          return false;
        }
      }
    },

    { level: 8,
      name: "Bot Support",
      check: (message) => config.support.includes(message.author.id)
    },

    { level: 9,
      name: "Bot Admin",
      check: (message) => config.admins.includes(message.author.id)
    },


    { level: 10,
      name: "Bot Owner", 
      check: (message) => message.client.config.ownerID === message.author.id
    }
  ]
};

module.exports = config;
