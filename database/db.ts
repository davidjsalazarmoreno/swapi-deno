import { escapeHtml } from "../utils/escape-html.ts";
import { DB } from "./../deps.ts";
import { fixtures } from "./fixtures/fixtures.ts";
import { starships } from "./fixtures/starships.ts";

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
    CREATE TABLE IF NOT EXISTS filmsRelations (
      starshipId INTEGER,
      vehicleId INTEGER,
      planetId INTEGER,
      characterId INTEGER,
      speciesId INTEGER
    );
  `);

  /**
   * Characters/Species
   */
  await db.query(`/* SQL */
    CREATE TABLE IF NOT EXISTS charactersSpecies (
      characterId INTEGER, 
      specieId INTEGER
    );
  `);

  /**
   * Starships/Characters
   */
  await db.query(`/* SQL */
    CREATE TABLE IF NOT EXISTS pilots (
      starshipId INTEGER, 
      characterId INTEGER
    );
  `);
}

export async function populateTables() {
  fixtures.forEach(async (fixture) => {
    const { model } = fixture;
    const fields = prepareFields(Object.entries(fixture.fields));
    const table = model.split("resources.").join("");
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

export async function populateRelations() {
  const queries = starships.filter((startship) =>
    startship.fields.pilots.length
  ).flatMap((startship) => {
    const { pk, fields: { pilots } } = startship;

    return pilots.map((pilot) => [pk, pilot]);
  });

  console.log(queries);

  queries.forEach(async (values) => {
    const query = `/* SQL */
      INSERT INTO pilots VALUES
        (
          ${prepareValues(values).join(",")}
        )
      ;
    `;

    console.log(query);
    await db.query(query);
  });
}
