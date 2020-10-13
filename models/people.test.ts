import {
  assertArrayContains,
  assertEquals,
} from "../deps.ts";
import { People } from "./people.ts";

Deno.test("should transform an comma separated string into an array", () => {
  assertArrayContains(
    ["/api/people/1", "/api/people/2", "/api/people/3", "/api/people/4"],
    People.toArray("1,2,3,4"),
  );
});

Deno.test("should return an empty array for null values", () => {
  assertArrayContains(
    [],
    People.toArray(null),
  );
});

Deno.test("should return person view model", () => {
  assertEquals(
    {
      "birth_year": "19BBY",
      "eye_color": "blue",
      "gender": "male",
      "hair_color": "blond",
      "height": "172",
      "homeworld": "/api/planets/1",
      "films": [
        "/api/people/1",
        "/api/people/2",
        "/api/people/3",
        "/api/people/6",
      ],
      "species": [],
      "vehicles": [
        "/api/people/14",
        "/api/people/30",
      ],
      "starships": [
        "/api/people/12",
        "/api/people/22",
      ],
      "mass": "77",
      "name": "Luke Skywalker",
      "skin_color": "fair",
      "url": "/api/people/1",
      "edited": "2014-12-20T21:17:56.891Z",
      "created": "2014-12-09T13:50:51.644Z",
    },
    People.toViewModel({
      "birth_year": "19BBY",
      "eye_color": "blue",
      "gender": "male",
      "hair_color": "blond",
      "height": "172",
      "homeworld": "1",
      "films": "1,2,3,6",
      "species": null,
      "vehicles": "14,30",
      "starships": "12, 22",
      "mass": "77",
      "name": "Luke Skywalker",
      "skin_color": "fair",
      "url": 1,
      "edited": "2014-12-20T21:17:56.891Z",
      "created": "2014-12-09T13:50:51.644Z",
    }),
  );
});
