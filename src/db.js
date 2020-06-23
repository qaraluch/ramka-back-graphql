const PouchDB = require("pouchdb");

function initDB(name) {
  let db = new PouchDB(name);
  return db;
}

async function pullDataDB(dbName, reducerFn) {
  let db = initDB(dbName);
  const allDocs = await db.allDocs({ include_docs: true });
  const allDocsReduced = allDocs.rows.reduce(reducerFn, []);
  return allDocsReduced;
}

async function pullAllInfoDB(dbName) {
  try {
    const allInfo = await pullDataDB(dbName, (acc, next) => [...acc, next.doc]);
    return allInfo;
  } catch (error) {
    throw new Error(
      `talkDB - pullAllInfoDB() - Sth. went wrong: ...\n ${error}`
    );
  }
}

module.exports = {
  initDB,
  pullAllInfoDB,
};
