const enmap = require("enmap");
const perms = new enmap({
    name: "perms",
    autoFetch: true,
    fetchAll: false
  });

const template = {
  default: "allow",
  mode: "u",
  users: [],
  roles: [],
  channels: []
};

let node;
let permArray;


exports.addToNode = async function(nodeName, mode, id) {
  switch (mode) {
    case "u":
      node = perms.get(nodeName);
      permArray = node.users;
      break;
  
    default:
      break;
  }
  permArray.append(id);
};
