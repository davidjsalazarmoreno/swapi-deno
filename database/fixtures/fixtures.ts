import { characters } from "./characters.ts";
import { films } from "./films.ts";
import { planets } from "./planets.ts";
import { species } from "./species.ts";
import { starships } from "./starships.ts";
import { vehicles } from "./vehicles.ts";

export const fixtures = [
  ...characters,
  ...films,
  ...planets,
  ...species,
  ...starships,
  ...vehicles,
];
