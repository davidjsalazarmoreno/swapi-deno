import { db } from "../database/db.ts";
import BaseModel from "./base.model.ts";

export interface Starship {
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

export class Starships extends BaseModel {
  static toViewModel(starship: any): Starship {
    if (starship.homeworld) {
      starship.homeworld = `/api/planets/${starship.homeworld}`;
    }

    starship.films = Starships.toArray(starship.films, "films");
    starship.species = Starships.toArray(starship.species, "species");
    starship.vehicles = Starships.toArray(starship.vehicles, "vehicles");
    starship.starships = Starships.toArray(starship.starships, "starships");
    starship.url = `/api/Starships/${starship.url}`;

    return starship as Starship;
  }

  private getBaseQuery(id = -1) {
    const byId = `/* SQL */WHERE pl.id = ${id}`;

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
        Starships pl
      LEFT JOIN 
        filmCharacters fc
      ON 
        fc.characterId = pl.id
      LEFT JOIN 
        speciesStarships sp
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

  public getAll(): Starship[] {
    const { getBaseQuery } = this;

    const starships = [
      ...db.query(
        `/* SQL */
        ${getBaseQuery()}
        ;
      `,
      ).asObjects(),
    ];

    return starships.map(Starships.toViewModel);
  }

  public getById(id: number): Starship {
    const { getBaseQuery } = this;

    const starship = db.query(
      `/* SQL */
        ${getBaseQuery(id)}
        ;
      `,
    ).asObjects().next().value;

    return Starships.toViewModel(starship);
  }
}
