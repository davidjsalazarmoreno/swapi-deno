import { db } from "../database/db.ts";
import BaseModel from "./base.model.ts";

export interface Species {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string;
  language: string;
  people: string[] | null;
  films: string[] | null;
  created: string;
  edited: string;
  url: string;
}

export class Species extends BaseModel {
  // todo: consistent types
  static toViewModel(species: any): Species {
    // todo: defensive code for no existent ids
    if (species) {
      if (species.homeworld) {
        species.homeworld = `/api/planets/${species.homeworld}`;
      }

      species.people = Species.toArray(species.people, "films");
      species.films = Species.toArray(species.films, "residents");
      species.url = `/api/species/${species.url}`;
      return species as Species;
    } else {
      return {} as Species;
    }
  }

  // TODO: revisar joins que sea los correctos
  // TODO: rename to species
  private getBaseQuery(id = -1) {
    const byId = `/* SQL */WHERE sp.id = ${id}`;

    return `/* SQL */
      SELECT DISTINCT
        sp.name,
        sp.classification,
        sp.designation,
        sp.average_height,
        sp.skin_colors,
        sp.hair_colors,
        sp.eye_colors,
        sp.average_lifespan,
        sp.homeworld,
        sp.language,
        sp.created,
        sp.edited,
        sp.id AS url,
        GROUP_CONCAT(
          DISTINCT sppl.characterId
        ) people,
        GROUP_CONCAT(
          DISTINCT flsp.filmId
        ) films
      FROM 
        species sp
      LEFT JOIN
        speciesPeople sppl
      ON
        sppl.specieId = sp.id     
      LEFT JOIN
        filmSpecies flsp
      ON
        flsp.speciesId = sp.id
      ${id !== -1 ? byId : ""}
      GROUP BY
        sp.id
      ORDER BY
        sp.id
   `;
  }

  public getAll(): Species[] {
    const { getBaseQuery } = this;

    const people = [
      ...db.query(
        `/* SQL */
        ${getBaseQuery()}
        ;
      `,
      ).asObjects(),
    ];

    return people.map(Species.toViewModel);
  }

  public getById(id: number): Species {
    const { getBaseQuery } = this;

    const species = db.query(
      `/* SQL */
        ${getBaseQuery(id)}
        ;
      `,
    ).asObjects().next().value;

    return Species.toViewModel(species);
  }
}
