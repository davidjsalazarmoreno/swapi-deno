import { db } from "../database/db.ts";

export class People {
  static table = "people";

  public getAll() {
    return db.query(`/* SQL */
      SELECT 
        id, 
        birth_year,
        eye_color,
        gender,
        hair_color,
        height,
        homeworld,
        mass,
        name,
        skin_color,
        url,
        edited,
        created,
        film_id
      FROM 
        people
      ;
    `);
  }
}
