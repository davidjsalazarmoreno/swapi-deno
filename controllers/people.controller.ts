import { RouterContext } from "../deps.ts";
import { People } from "../models/people.ts";

export class PeopleController {
  async all(ctx: RouterContext) {
    ctx.response.body = [...await new People().getAll().asObjects()];
  }
}

export default new PeopleController();
