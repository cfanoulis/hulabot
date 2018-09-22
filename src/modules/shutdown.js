const utils = require("util");
const delet = require("fs").unlink;
const unlinkFiles = utils.promisify(delet);

module.exports = async function() {
    console.log("Initializing shutdown process...");
    unlinkFiles("../../configs/tokens.json").then(
        console.log("Tokens Cleared")
    ).catch((err) => {
        console.error("Error while clearing tokens. Please delete the file configs/tokens.json\nTrace: " + err);
        process.exit(1);
    });
    console.log("I guess this is where we say goodbye...");
    setTimeout(() => {
        console.log("Goodbye :)");
        process.exit(0);
    }, 2000);
};
