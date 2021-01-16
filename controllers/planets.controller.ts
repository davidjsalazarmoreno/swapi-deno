import { RouterContext } from "../deps.ts";
import { Planets } from "../models/planets.ts";

const model = new Planets();

export class PlanetsController {
  async all(ctx: RouterContext) {
    const planets = await model.getAll();
    if (planets.length) {
      ctx.response.body = planets;
    } else {
      ctx.response.body = "No planets found";
    }
  }

  async byId(ctx: RouterContext) {
    if (!ctx.params.id) {
      return;
    }

    const id = parseInt(ctx.params.id);
    if (Number.isNaN(id) || id <= 0) {
      ctx.response.body = "Invalid ID for planets";
      return;
    }

    const planets = await model.getById(id);

    if (Object.keys(planets).length) {
      ctx.response.body = planets;
    } else {
      ctx.response.body = "Planet not found";
    }
  }
}

export default new PlanetsController();
