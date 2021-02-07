import { db } from "../database/db.ts";
import BaseModel from "./base.model.ts";

export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[] | null;
  films: string[] | null;
  created: string;
  edited: string;
  url: string;
}

export class Planets extends BaseModel {
  // todo: consistent types
  static toViewModel(planet: any): Planet {
    // todo: defensive code for no existent ids
    if (planet) {
      planet.films = Planets.toArray(planet.films, "films");
      planet.residents = Planets.toArray(planet.residents, "residents");
      planet.url = `/api/planets/${planet.url}`;
      return planet as Planet;
    } else {
      return {} as Planet;
    }
  }

  private getBaseQuery(id = -1) {
    const byId = `/* SQL */WHERE plt.id = ${id}`;

    return `/* SQL */
      SELECT DISTINCT
        plt.climate,
        plt.diameter,
        plt.gravity,
        plt.name,
        plt.orbital_period,
        plt.population,
        plt.rotation_period,
        plt.surface_water,
        plt.terrain,
        plt.url,
        plt.edited,
        plt.created,
        plt.id AS url,
        GROUP_CONCAT(
          DISTINCT fplt.filmId
        ) films,
        GROUP_CONCAT(
          DISTINCT pl.id
        ) residents
      FROM 
        planets plt
      LEFT JOIN
        filmPlanets fplt
      ON
        fplt.planetId = plt.id
      LEFT JOIN
        people pl
      ON
        pl.homeworld = plt.id
      ${id !== -1 ? byId : ""}
      GROUP BY
        plt.id
      ORDER BY
        plt.id
   `;
  }

  public getAll(): Planet[] {
    const { getBaseQuery } = this;

    const people = [
      ...db.query(
        `/* SQL */
        ${getBaseQuery()}
        ;
      `,
      ).asObjects(),
    ];

    return people.map(Planets.toViewModel);
  }

  public getById(id: number): Planet {
    const { getBaseQuery } = this;

    const planet = db.query(
      `/* SQL */
        ${getBaseQuery(id)}
        ;
      `,
    ).asObjects().next().value;

    return Planets.toViewModel(planet);
  }
}
