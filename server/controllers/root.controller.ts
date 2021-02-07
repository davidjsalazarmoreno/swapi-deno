import { RouterContext } from "../deps.ts";

export class RootController {
  async all(ctx: RouterContext) {
    ctx.response.body = {
      "people": "/api/people/",
      "planets": "/api/planets/",
      "films": "/api/films/",
      "species": "/api/species/",
      "vehicles": "/api/vehicles/",
      "starships": "/api/starships/",
    };
  }
}

export default new RootController();
