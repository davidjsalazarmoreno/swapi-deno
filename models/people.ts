import { db } from "../database/db.ts";

export class People {
  static table = "people";

  public getAll() {
    return db.query(`/* SQL */
     SELECT DISTINCT
        pl.id, 
        pl.birth_year,
        pl.eye_color,
        pl.gender,
        pl.hair_color,
        pl.height,
        pl.homeworld,
        pl.mass,
        pl.name,
        pl.skin_color,
        pl.url,
        pl.edited,
        pl.created,
        GROUP_CONCAT(
          DISTINCT fc.filmId 
        ) films,
        GROUP_CONCAT(
          DISTINCT sp.specieId 
        ) species,
        GROUP_CONCAT(
          DISTINCT stpl.starshipId 
        ) starthips
      FROM 
        people pl
      LEFT JOIN 
        filmCharacters fc
      ON 
        fc.characterId = pl.id
      LEFT JOIN 
        speciesPeople sp
      ON 
        sp.characterId = pl.id
      LEFT JOIN 
        vehicles
      ON
        sp.characterId = pl.id
      LEFT JOIN
        starshipPilots stpl
      ON
        pl.id = stpl.characterId
      GROUP BY
        pl.id
      ORDER BY
        pl.id
      ; 
    `);
  }
}
