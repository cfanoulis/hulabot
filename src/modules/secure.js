const crypto = require("crypto");
const { promisify } = require("util");
const readFile = promisify(require("fs").readFile);
const key = readFile("../../key.encrypt");


exports.encrypt = async function(phrase, passphrase) { 
    var cipher = crypto.createCipheriv("aes-256-gcm", key, passphrase);
    var encrypted = cipher.update(phrase, "utf8", "hex");
    encrypted += cipher.final("base64");
    var tag = cipher.getAuthTag();
    return {
      content: encrypted,
      tag: tag
    };
  };
exports.decrypt = async function(encryptedPhrase, passphrase, tag) { //eslint-disable-line
    var decipher = crypto.createDecipheriv("aes-256-gcm", key, passphrase);
  decipher.setAuthTag(tag);
  var dec = decipher.update(encryptedPhrase, "hex", "utf8");
  dec += decipher.final("utf-8");
  return dec;
};