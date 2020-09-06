import {
  createRelationsTables,
  createTables,
  populateRelations,
  populateTables,
  db,
} from "./database/db.ts";

await createTables(db);
await createRelationsTables(db);
await populateTables(db);
await populateRelations(db);
console.log("A fresh database was created and populated.\n");
