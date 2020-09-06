import { DB } from "../deps.ts";
import { tableNames } from "./constants.ts";
import { fixtures } from "./fixtures/fixtures.ts";
import {
  getTableName,
  onlyRelations,
  prepareFields,
  prepareRelationValues,
  prepareValues,
} from "./utils.ts";

export async function populateTables(db: DB) {
  fixtures.forEach(async (fixture) => {
    const { model } = fixture;
    const fields = prepareFields(Object.entries(fixture.fields));
    const table = getTableName(model);
    const columns = Object.keys(fields);
    const values = Object.values(fields);

    const query = `/* SQL */
        INSERT INTO ${tableNames[table]} (
          id, ${columns.join(",")}
        ) 
        VALUES (
            ${fixture.pk}, ${prepareValues(values).join(",")}
        );
      `;

    await db.query(query);
  });
}

export async function populateRelations(db: DB) {
  const mapping: { [key: string]: string[] } = {
    species: ["people"],
    starship: ["pilots"],
    film: ["starships", "vehicles", "planets", "characters", "species"],
  };
  const queries = fixtures.filter(onlyRelations(mapping)).flatMap(
    prepareRelationValues(mapping),
  );

  queries.forEach(async (data) => {
    const [relationTable, pk, ...values] = data;
    if (values.length === 0) {
      return;
    }
    const relationsValue = values.map((value) => {
      return `
            (
              ${pk}, ${value}
            )
        `;
    });
    const query = `/* SQL */
        INSERT INTO ${relationTable} VALUES ${relationsValue};
      `;

    console.log(query);
    await db.query(query);
  });
}
