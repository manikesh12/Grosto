const fs = require("fs");
class NAMSESPACE {
  constructor() {
    this.GLOBAL_VARS = {};
    this.INDEX = {};
    this.RAWURLUTILS = {};
    this.FILELOCATIONS = fs.readFileSync(
      "./data_files/file_locations.json",
      "utf8",
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }
}

const NameSpace = new NAMSESPACE();
module.exports = { NameSpace };
