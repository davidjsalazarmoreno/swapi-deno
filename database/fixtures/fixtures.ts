import { people } from "./people.ts";
import { films } from "./films.ts";
import { planets } from "./planets.ts";
import { species } from "./species.ts";
import { starships } from "./starships.ts";
import { transports } from "./transports.ts";
import { vehicles } from "./vehicles.ts";

interface Fixtures {
  fields: { [key: string]: number[] | string | number | null };
  model: string;
  pk: number;
}

export const fixtures: Fixtures[] = [
  ...people,
  ...films,
  ...planets,
  ...species,
  ...starships,
  ...transports,
  ...vehicles,
];
