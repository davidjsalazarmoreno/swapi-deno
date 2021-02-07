import { DB } from "./../deps.ts";

export { createRelationsTables, createTables } from "./create.ts";
export { populateRelations, populateTables } from "./populate.ts";

export interface Mapping {
  [key: string]: string[];
}

export const db = new DB("database.sqlite");
