import { db } from "../database/db.ts";
import { people } from "../database/fixtures/people.ts";

export interface Person {
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  films: string | null;
  species: string | null;
  vehicles: string | null;
  starships: string | null;
  mass: string;
  name: string;
  skin_color: string;
  url: number;
  edited: string;
  created: string;
}

export class People {
  // TODO: move to model utils
  // TODO: Pass prefix as parameter
  static toArray(field: string | null) {
    console.log(field);
    if (field == null || typeof field !== "string") {
      return [];
    }

    if (field.length === 0) {
      return [];
    }

    return field.split(",").map((id) => {
      return `/api/people/${id.trim()}`;
    });
  }

  static toViewModel(person: any): Person {
    if (person.homeworld) {
      person.homeworld = `/api/planets/${person.homeworld}`;
    }

    person.films = People.toArray(person.films);

    person.species = People.toArray(person.species);

    person.vehicles = People.toArray(person.vehicles);

    person.starships = People.toArray(person.starships);

    person.url = `/api/people/${person.url}`;

    return person as Person;
  }

  private getBaseQuery(id = -1) {
    const byId = `WHERE pl.id = ${id}`;

    return `/* SQL */
      SELECT DISTINCT
        pl.birth_year,
        pl.eye_color,
        pl.gender,
        pl.hair_color,
        pl.height,
        pl.homeworld,
        GROUP_CONCAT(
          DISTINCT fc.filmId 
        ) films,
        GROUP_CONCAT(
          DISTINCT sp.specieId 
        ) species,
        GROUP_CONCAT(
          DISTINCT vhpls.vehicleId
        ) vehicles,
        GROUP_CONCAT(
          DISTINCT stpl.starshipId 
        ) starships,
        pl.mass,
        pl.name,
        pl.skin_color,
        pl.url,
        pl.edited,
        pl.created,
        pl.id AS url
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
      LEFT JOIN 
        vehiclePilots vhpls
      ON
        vhpls.characterId = pl.id
      ${id !== -1 ? byId : ""}
      GROUP BY
        pl.id
      ORDER BY
        pl.id
   `;
  }

  public getAll(): Person[] {
    const { getBaseQuery } = this;

    const people = [
      ...db.query(
        `/* SQL */
        ${getBaseQuery()}
        ;
      `,
      ).asObjects(),
    ];

    return people.map(People.toViewModel);
  }

  public getById(id: number): Person {
    const { getBaseQuery } = this;

    const person = db.query(
      `/* SQL */
        ${getBaseQuery(id)}
        ;
      `,
    ).asObjects().next().value;

    return People.toViewModel(person);
  }
}
