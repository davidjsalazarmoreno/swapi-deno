import { db } from "../database/db.ts";
import BaseModel from "./base.model.ts";

const Nothing: { tag: "Nothing" } = { tag: "Nothing" };
type Nothing = typeof Nothing;
type Maybe<T> = T | Nothing;

export interface Starship {
  MGLT: string | null;
  cargo_capacity: string | null;
  consumables: string | null;
  cost_in_credits: string | null;
  created: string | null;
  crew: number | null;
  edited: string | null;
  hyperdrive_rating: string | null;
  length: string | null;
  manufacturer: string | null;
  max_atmosphering_speed: string | null;
  model: string | null;
  name: string | null;
  passengers: string | null;
  films: string[] | null;
  pilots: string[] | null;
  starship_class: string | null;
  url: string | null;
}

export class Starships extends BaseModel {
  static toViewModel(starship: Starship | any): Starship {
    if (starship) {
      starship.films = Starships.toArray(starship.films, "films");
      starship.pilots = Starships.toArray(starship.pilots, "pilots");
      starship.url = `/api/starships/${starship.url}`;

      return starship as Starship;
    } else {
      return {} as Starship;
    }
  }

  private getBaseQuery(id = -1) {
    const byId = `/* SQL */WHERE ss.id = ${id}`;

    return `/* SQL */
      SELECT DISTINCT
        MGLT,
        starship_class,
        hyperdrive_rating,
        tp.consumables,
        tp.name,
        tp.created,
        tp.cargo_capacity,
        tp.passengers,
        tp.max_atmosphering_speed,
        tp.crew,
        tp.length,
        tp.model,
        tp.cost_in_credits,
        tp.manufacturer,
        GROUP_CONCAT(
          DISTINCT sp.characterId
        ) pilots,
        GROUP_CONCAT(
          DISTINCT fs.filmId
        ) films,
        ss.id AS url
      FROM 
        starships ss
      LEFT JOIN 
        transports tp
      ON
        tp.id =  ss.id
      LEFT JOIN
        starshipPilots sp
      ON
        sp.starshipId = ss.id
      LEFT JOIN
        filmStarships fs
      ON
        ss.id = fs.starshipId
      ${id !== -1 ? byId : ""}
      GROUP BY
        ss.id
      ORDER BY
        ss.id
      ;
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
