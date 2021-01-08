import { db } from "../database/db.ts";
import BaseModel from "./base.model.ts";

export interface Film {
  id: string | null;
  director: string | null;
  episode_id: string | null;
  opening_crawl: string | null;
  producer: string | null;
  release_date: string | null;
  title: string | null;
  url: string | null;
  edited: string | null;
  created: string | null;
  characters: string | null;
  planets: string | null;
  startships: string | null;
  vehicles: string | null;
  // TODO:set right type
  species: string | null;
}

export class Films extends BaseModel {
  static toViewModel(film: any): Film {
    film.characters = Films.toArray(film.characters, "people");
    film.planets = Films.toArray(film.planets, "planets");
    film.starships = Films.toArray(film.starships, "starships");
    film.vehicles = Films.toArray(film.vehicles, "vehicles");
    film.species = Films.toArray(film.species, "species");
    film.url = `/api/films/${film.url}`;

    return film as Film;
  }

  private getBaseQuery(id = -1) {
    const byId = `/* SQL */WHERE f.id = ${id}`;

    return `/* SQL */
      SELECT 
        id AS url,
        director,
        episode_id,
        opening_crawl,
        producer,
        release_date,
        title,
        edited,
        created,
        GROUP_CONCAT(
          DISTINCT fc.characterId
        ) characters,
        GROUP_CONCAT(
          DISTINCT fp.planetId
        ) planets,
        GROUP_CONCAT(
          DISTINCT fs.starshipId
        ) starships,
        GROUP_CONCAT(
          DISTINCT fv.vehicleId
        ) vehicles,
        /**TODO: Rename to fss.specieId */
        GROUP_CONCAT(
          DISTINCT fss.speciesId
        ) species
      FROM 
        films f
      LEFT JOIN
        filmCharacters fc
      ON
        f.id = fc.filmId
      LEFT JOIN
        filmPlanets fp
      ON
        f.id = fp.filmId
      LEFT JOIN
        filmStarships fs
      ON
        f.id = fs.filmId
      LEFT JOIN
        filmVehicles fv
      ON
        f.id = fv.filmId      
      LEFT JOIN
        filmSpecies fss
      ON
        f.id = fss.filmId
     ${id !== -1 ? byId : ""}
      GROUP BY
        f.id
      ORDER BY
        f.id
      ;
    `;
  }

  public getAll(): Film[] {
    const { getBaseQuery } = this;

    const people = [
      ...db.query(
        `/* SQL */
        ${getBaseQuery()}
        ;
      `,
      ).asObjects(),
    ];

    return people.map(Films.toViewModel);
  }

  public getById(id: number): Film {
    const { getBaseQuery } = this;

    const film = db.query(
      `/* SQL */
        ${getBaseQuery(id)}
        ;
      `,
    ).asObjects().next().value;

    return Films.toViewModel(film);
  }
}
