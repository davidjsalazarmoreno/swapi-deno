import { escapeHtml } from "../utils/escape-html.ts";
import { DB, titleCase } from "./../deps.ts";
import { fixtures, Fixtures } from "./fixtures/fixtures.ts";
import { starships } from "./fixtures/starships.ts";

export interface Mapping {
  [key: string]: string[];
}

export const tableNames: { [key: string]: string } = {
  film: "films",
  people: "people",
  planet: "planets",
  species: "species",
  starship: "starships",
  transport: "transports",
  vehicle: "vehicles",
};

export const db = new DB("database.sqlite");

function getTableName(model: string) {
  return model.split("resources.").join("");
}

function prepareFields(entries: any) {
  const keyToIgnore = [
    "pilots",
    "characters",
    ...Object.values(tableNames),
  ];
  return Object.fromEntries(entries.filter((entry: string) => {
    return !keyToIgnore.includes(entry[0]);
  }));
}

function prepareValues(values: any[]) {
  return values.map((value) => {
    if (!value) {
      return "null";
    }

    if (typeof value === "string") {
      return `'${escapeHtml(value)}'`;
    } else {
      return value;
    }
  });
}

export async function createTables() {
  await db.query(`/* SQL */
    CREATE TABLE IF NOT EXISTS films (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      director TEXT,
      episode_id INTEGER,
      opening_crawl TEXT,
      producer TEXT,
      release_date DATE,
      title TEXT,
      url TEXT,
      edited TIMESTAMP,
      created TIMESTAMP
    );
  `);

  await db.query(`/* SQL */
    CREATE TABLE IF NOT EXISTS people (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      birth_year TEXT,
      eye_color TEXT,
      gender TEXT,
      hair_color TEXT,
      height TEXT,
      homeworld TEXT,
      mass TEXT,
      name TEXT,
      skin_color TEXT,
      url TEXT,
      edited TIMESTAMP,
      created TIMESTAMP,
      film_id INTEGER,
      FOREIGN KEY (film_id) REFERENCES films(id)
    );
  `);

  await db.query(`/* SQL */
    CREATE TABLE IF NOT EXISTS planets (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      climate TEXT,
      diameter TEXT,
      gravity TEXT,
      name TEXT,
      orbital_period TEXT,
      population TEXT,
      rotation_period TEXT,
      surface_water TEXT,
      terrain TEXT,
      url TEXT,
      edited TIMESTAMP,
      created TIMESTAMP,
      film_id INTEGER,
      FOREIGN KEY (film_id) REFERENCES films(id)
    );
  `);

  await db.query(`/* SQL */
    CREATE TABLE IF NOT EXISTS species (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      average_height TEXT,
      average_lifespan TEXT,
      classification TEXT,
      designation TEXT,
      eye_colors TEXT,
      hair_colors TEXT,
      homeworld TEXT,
      language TEXT,
      name TEXT,
      skin_colors TEXT,
      url TEXT,
      edited TIMESTAMP,
      created TIMESTAMP,
      film_id INTEGER,
      FOREIGN KEY (film_id) REFERENCES films(id)
    );
  `);

  await db.query(`/* SQL */
    CREATE TABLE IF NOT EXISTS starships (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      MGLT TEXT,
      cargo_capacity TEXT,
      consumables TEXT,
      cost_in_credits TEXT,
      created TEXT,
      crew TEXT,
      edited TEXT,
      hyperdrive_rating TEXT,
      length TEXT,
      manufacturer TEXT,
      max_atmosphering_speed TEXT,
      model TEXT,
      name TEXT,
      passengers TEXT,
      starship_class TEXT,
      url TEXT,
      film_id INTEGER, 
      FOREIGN KEY (film_id) REFERENCES films(id)
    );
  `);

  await db.query(`/* SQL */
    CREATE TABLE IF NOT EXISTS transports (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      cargo_capacity TEXT, 
      consumables TEXT, 
      cost_in_credits TEXT, 
      created TEXT, 
      crew TEXT, 
      edited TEXT, 
      length TEXT, 
      manufacturer TEXT, 
      max_atmosphering_speed TEXT, 
      model TEXT, 
      name TEXT, 
      passengers TEXT, 
      url TEXT, 
      vehicle_class TEXT,
      film_id INTEGER, 
      FOREIGN KEY (film_id) REFERENCES films(id)
    );
  `);

  await db.query(`/* SQL */
    CREATE TABLE IF NOT EXISTS vehicles (
      id INTEGER,
      vehicle_class TEXT
    );
  `);
}

export async function createRelationsTables() {
  /**
   * Films relations
   */
  await db.query(`/* SQL */
    CREATE TABLE IF NOT EXISTS filmStarships (
      filmId INTEGER,
      starshipId INTEGER
    );
  `);

  await db.query(`/* SQL */
    CREATE TABLE IF NOT EXISTS filmVehicles (
      filmId INTEGER,
      vehicleId INTEGER
    );
  `);

  await db.query(`/* SQL */
    CREATE TABLE IF NOT EXISTS filmPlanets (
      filmId INTEGER,
      planetId INTEGER
    );
  `);

  await db.query(`/* SQL */
    CREATE TABLE IF NOT EXISTS filmCharacters (
      filmId INTEGER,
      characterId INTEGER
    );
  `);

  await db.query(`/* SQL */
    CREATE TABLE IF NOT EXISTS filmSpecies (
      filmId INTEGER,
      speciesId INTEGER
    );
  `);

  /**
   * species people
   */
  await db.query(`/* SQL */
    CREATE TABLE IF NOT EXISTS speciesPeople (
      characterId INTEGER, 
      specieId INTEGER
    );
  `);

  /**
   * starship pilots
   */
  await db.query(`/* SQL */
    CREATE TABLE IF NOT EXISTS starshipPilots (
      starshipId INTEGER, 
      characterId INTEGER
    );
  `);
}

export async function populateTables() {
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

function onlyRelations(mapping: Mapping) {
  return (fixture: Fixtures) => {
    const { model } = fixture;
    const relationName = mapping[getTableName(model)];
    const relations = Object.keys(fixture.fields).filter((relation) =>
      relationName && relationName.includes(relation)
    );

    return Array.isArray(relations) && relations.length;
  };
}

function prepareRelationValues(mapping: Mapping) {
  return (fixture: Fixtures) => {
    const { model } = fixture;
    const tableName = getTableName(model);
    const relationName = mapping[tableName];
    const { pk, fields } = fixture;
    const values = relationName.map((relation) => {
      const relationTable = tableName + titleCase(relation);
      return [
        relationTable,
        pk,
        ...fields[relation] as any,
      ];
    });

    return values;
  };
}

export async function populateRelations() {
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
