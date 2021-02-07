import { RouterContext } from "../deps.ts";
import { Starships } from "../models/starship.ts";

const model = new Starships();

export class StartshipsController {
  async all(ctx: RouterContext) {
    const startships = await model.getAll();
    if (startships.length) {
      ctx.response.body = startships;
    } else {
      ctx.response.body = "No startships found";
    }
  }

  async byId(ctx: RouterContext) {
    if (!ctx.params.id) {
      return;
    }

    const id = parseInt(ctx.params.id);
    if (Number.isNaN(id) || id <= 0) {
      ctx.response.body = "Invalid ID for startships";
      return;
    }

    const startships = await model.getById(id);

    if (Object.keys(startships).length) {
      ctx.response.body = startships;
    } else {
      ctx.response.body = "Startship not found";
    }
  }
}

export default new StartshipsController();
