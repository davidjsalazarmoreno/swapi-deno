import { RouterContext } from "../deps.ts";
import { Films } from "../models/film.ts";

const model = new Films();

export class FilmsController {
  async all(ctx: RouterContext) {
    const films = await model.getAll();
    if (films.length) {
      ctx.response.body = films;
    } else {
      ctx.response.body = "No films found";
    }
  }

  async byId(ctx: RouterContext) {
    if (!ctx.params.id) {
      return;
    }

    const id = parseInt(ctx.params.id);
    if (Number.isNaN(id) || id <= 0) {
      ctx.response.body = "Invalid ID for film";
      return;
    }

    const films = await model.getById(id);

    if (Object.keys(films).length) {
      ctx.response.body = films;
    } else {
      ctx.response.body = "Film not found";
    }
  }
}

export default new FilmsController();
