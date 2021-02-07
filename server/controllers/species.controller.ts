import { RouterContext } from "../deps.ts";
import { Species } from "../models/species.ts";

const model = new Species();

export class SpeciesController {
  async all(ctx: RouterContext) {
    const species = await model.getAll();
    if (species.length) {
      ctx.response.body = species;
    } else {
      ctx.response.body = "No species found";
    }
  }

  async byId(ctx: RouterContext) {
    if (!ctx.params.id) {
      return;
    }

    const id = parseInt(ctx.params.id);
    if (Number.isNaN(id) || id <= 0) {
      ctx.response.body = "Invalid ID for species";
      return;
    }

    const species = await model.getById(id);

    if (Object.keys(species).length) {
      ctx.response.body = species;
    } else {
      ctx.response.body = "Species not found";
    }
  }
}

export default new SpeciesController();
