import {
  getTableName,
  escapeValues,
  getColumns,
  onlyRelations,
} from "./utils.ts";
import {
  assertEquals,
  assertStringContains,
  assertArrayContains,
} from "../deps.ts";
import { films } from "./fixtures/films.ts";
import { fixtures } from "./fixtures/fixtures.ts";
import { relationsMapping } from "./constants.ts";

Deno.test("should get the table name from model property", () => {
  assertEquals(getTableName("resources.people"), "people");
});

Deno.test("should get the columns names from fixture entry", () => {
  const columns = getColumns(Object.entries(films[0].fields));

  assertArrayContains([
    "edited",
    "producer",
    "title",
    "created",
    "episode_id",
    "director",
    "release_date",
    "opening_crawl",
  ], Object.keys(columns));
});

Deno.test("should escape string values and return null for invalid values", () => {
  const [nullish, number, string] = escapeValues([
    undefined,
    8283,
    "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
  ]);

  assertEquals(nullish, "null");
  assertEquals(number, 8283);
  assertStringContains(string, "<br>");
});

Deno.test("should filter the fixtures to get only those with relation properties ", () => {
  const filtered = fixtures.filter(onlyRelations(relationsMapping));

  assertEquals(79, filtered.length);
});
