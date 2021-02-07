import { relationsMapping, tableNames } from "./database/constants.ts";
import {
  createRelationsTables,
  createTables,
  db,
  populateRelations,
  populateTables,
} from "./database/db.ts";

await createTables(db);
await createRelationsTables(db);
await populateTables(db, tableNames);
await populateRelations(db, relationsMapping);
console.log("A fresh database was created and populated.\n");
