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
}

export class Films extends BaseModel {
  static toViewModel(film: any): Film {
    // if (film.homeworld) {
    //   film.homeworld = `/api/planets/${film.homeworld}`;
    // }

    film.characters = Films.toArray(film.characters, "people");

    film.planets = Films.toArray(film.planets, "planets");

    // film.vehicles = Films.toArray(film.vehicles);

    // film.starships = Films.toArray(film.starships);

    film.url = `/api/films/${film.url}`;

    return film as Film;
  }

  private getBaseQuery(id = -1) {
    const byId = `WHERE pl.id = ${id}`;

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
        ) planets
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
