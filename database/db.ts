import {
  DB,
} from "./../deps.ts";
import { films } from "./fixtures/films.ts";

export const db = new DB("database.sqlite");

function prepareValues(values: any[]) {
  return values.map((value) => {
    if (typeof value === "string") {
      return `'${
        value.replace(/(\r\n|\n|\r)/gm, "<br>").replace(/'/g, "&quot;")
      }'`;
    } else {
      return "'null'";
    }
  });
}

export async function createTables() {
  await db.query(`/* SQL */
    CREATE TABLE IF NOT EXISTS films (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      director STRING,
      episode_id INTEGER,
      opening_crawl STRING,
      producer STRING,
      release_date DATE,
      title STRING,
      url STRING
    );
  `);

  await db.query(`/* SQL */
    CREATE TABLE IF NOT EXISTS characters (
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
      film_id INTEGER, 
      FOREIGN KEY (film_id) REFERENCES films(id)
    );
  `);

  await db.query(`/* SQL */
    CREATE TABLE IF NOT EXISTS planet (
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
    CREATE TABLE IF NOT EXISTS vehicles (
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
}

export async function populateTables() {
  films.forEach(async (fixture) => {
    const { table, fields } = fixture;
    const columns = Object.keys(fields);
    const values = Object.values(fields);
    const query = `/* SQL */
      INSERT INTO ${table} (
        ${columns.join(",")}
      ) 
      VALUES (
          ${prepareValues(values).join(",")}
      );
    `;

    await db.query(query);
  });
}
