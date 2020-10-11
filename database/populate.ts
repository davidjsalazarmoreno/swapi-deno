import { DB } from "../deps.ts";
import { fixtures } from "./fixtures/fixtures.ts";
import {
  getTableName,
  onlyRelations,
  getColumns,
  prepareRelationValues,
  escapeValues,
} from "./utils.ts";
import { Mapping } from "./db.ts";

/**
 * Populate tables, except for the column names
 * specified in the keyToIgnore
 * 
 */
export async function populateTables(
  db: DB,
  tableNames: { [key: string]: string },
) {
  fixtures.forEach(async (fixture) => {
    const { model } = fixture;
    const fields = getColumns(Object.entries(fixture.fields));
    const table = getTableName(model);
    const columns = Object.keys(fields);
    const values = Object.values(fields);

    const query = `/* SQL */
        INSERT INTO ${tableNames[table]} (
          id, ${columns.join(",")}
        ) 
        VALUES (
            ${fixture.pk}, ${escapeValues(values).join(",")}
        );
      `;

    await db.query(query);
  });
}

export async function populateRelations(db: DB, mapping: Mapping) {
  const queries = fixtures.filter(onlyRelations(mapping)).flatMap(
    prepareRelationValues(mapping),
  );

  queries.forEach(async (data) => {
    const [relationTable, pk, ...rawValues] = data;
    if (rawValues.length === 0) {
      return;
    }

    const values = rawValues.map((value) => {
      return `
            (
              ${pk}, ${value}
            )
        `;
    });
    const query = `/* SQL */
        INSERT INTO ${relationTable} VALUES ${values};
      `;

    await db.query(query);
  });
}
