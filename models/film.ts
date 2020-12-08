import { db } from "../database/db.ts";

export interface Film {
  id: string;
  director: string;
  episode_id: string;
  opening_crawl: string;
  producer: string;
  release_date: string;
  title: string;
  url: string;
  edited: string;
  created: string;
}

export class Films {
  // TODO: move to model utils
  // TODO: Pass prefix as parameter
  static toArray(field: string | null) {
    if (field == null || typeof field !== "string") {
      return [];
    }

    if (field.length === 0) {
      return [];
    }

    return field.split(",").map((id) => {
      return `/api/films/${id.trim()}`;
    });
  }

  static toViewModel(film: any): Film {
    // if (film.homeworld) {
    //   film.homeworld = `/api/planets/${film.homeworld}`;
    // }

    // film.films = Films.toArray(film.films);

    // film.species = Films.toArray(film.species);

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
        created
       FROM 
        films;
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
