import { DB } from "../deps.ts";

export async function createTables(db: DB) {
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
        created TIMESTAMP
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
        created TIMESTAMP
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
        created TIMESTAMP
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
        url TEXT 
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
        vehicle_class TEXT 
      );
    `);

  await db.query(`/* SQL */
      CREATE TABLE IF NOT EXISTS vehicles (
        id INTEGER,
        vehicle_class TEXT
      );
    `);
}

export async function createRelationsTables(db: DB) {
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
        specieId INTEGER,
        characterId INTEGER 
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
