const { DataSource } = require("apollo-datasource");
const { pullAllInfoDB } = require("../db.js");

class dbSource extends DataSource {
  constructor({ dbName }) {
    super();
    this.dbName = dbName;
  }

  // transform each returned media record
  // into the format expected by our schema
  // in schema.js
  mediaReducer(mediaItm) {
    return {
      id: mediaItm._id,
      cursor: mediaItm._id,
      importedPath: mediaItm.importedPath,
      source: mediaItm.source,
      fileName: mediaItm.fileMetadata.name,
    };
  }

  async getAllMedia() {
    const response = await pullAllInfoDB(this.dbName);
    return Array.isArray(response)
      ? response.map((mediaItm) => this.mediaReducer(mediaItm))
      : [];
  }

  //TODO: implement this
  // async getLaunchById({ id }) {
  //   const response = await pullRecordDb(this.dbName);
  //   return this.launchReducer(response[0]);
  // }
}

module.exports = dbSource;
